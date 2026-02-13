import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { loadStripe } from "@stripe/stripe-js";
import { FaRegStar, FaStar } from "react-icons/fa";
import { addDays, addMinutes, format, setHours, setMinutes } from "date-fns";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BOOKING_WINDOW_DAYS = 7;
const SLOT_CONFIG = {
  appointments: { startHour: 10, endHour: 21, intervalMinutes: 30 },
  services: { startHour: 9, endHour: 21, intervalMinutes: 30 },
};

const SummaryCard = ({ label, value, tone }) => {
  const tones = {
    primary: "bg-primary/10 text-primary",
    emerald: "bg-emerald-100 text-emerald-700",
    red: "bg-red-100 text-red-700",
  };
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center justify-between">
      <p className="text-sm text-gray-500">{label}</p>
      <span
        className={`text-lg font-semibold px-3 py-1 rounded-full ${tones[tone]}`}
      >
        {value}
      </span>
    </div>
  );
};

const RatingStars = ({ value = 0, onChange, readOnly = false }) => {
  return (
    <div className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= Number(value || 0);
        const Icon = isFilled ? FaStar : FaRegStar;

        if (readOnly) {
          return (
            <Icon
              key={starValue}
              className={`h-4 w-4 ${
                isFilled ? "text-amber-400" : "text-gray-300"
              }`}
            />
          );
        }

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange?.(starValue)}
            className="transition hover:scale-105"
          >
            <Icon
              className={`h-6 w-6 ${
                isFilled ? "text-amber-400" : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

const MyAppointments = () => {
  const {
    backendurl,
    token,
    doctors,
    getDoctorsData,
    logoutUser,
    currencySymbol,
  } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [serviceBookings, setServiceBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [payingId, setPayingId] = useState(null);
  const [reschedulingId, setReschedulingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("appointments");
  const [reviewingAppointmentId, setReviewingAppointmentId] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState({
    open: false,
    type: null,
    item: null,
  });
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [rescheduleDays, setRescheduleDays] = useState([]);
  const [loadingRescheduleSlots, setLoadingRescheduleSlots] = useState(false);
  const [prescriptionModal, setPrescriptionModal] = useState({
    open: false,
    appointment: null,
  });
  const [reportModal, setReportModal] = useState({
    open: false,
    booking: null,
    reportUrl: "",
  });
  const [openingReportId, setOpeningReportId] = useState(null);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatAppointmentDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    } catch (error) {
      return "Invalid date";
    }
  };

  const fetchAppointments = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendurl}/api/user/appointment`, {
        headers: { token },
      });
      if (data.success && Array.isArray(data.appointment)) {
        const sortedAppointments = data.appointment.sort(
          (a, b) => new Date(b.slotDate) - new Date(a.slotDate),
        );
        setAppointments(sortedAppointments);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      const message =
        error.response?.status === 401
          ? "Your session expired. Please sign in again."
          : "We couldn't load your appointments. Please try again.";

      toast.error(message);

      if (error.response?.status === 401 && logoutUser) {
        logoutUser();
      }
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  }, [backendurl, token, logoutUser]);

  const isExpired = (slotDate, slotTime) => {
    const appointmentDateTime = new Date(`${slotDate} ${slotTime}`);
    return appointmentDateTime < new Date();
  };

  const buildSlotsForNextDays = useCallback((slotsBooked = {}, slotType) => {
    const config = SLOT_CONFIG[slotType];
    const now = new Date();

    return Array.from({ length: BOOKING_WINDOW_DAYS }, (_, index) => {
      const date = addDays(now, index);
      const isoDate = format(date, "yyyy-MM-dd");

      let startTime = setHours(setMinutes(date, 0), config.startHour);
      const endTime = setHours(setMinutes(date, 0), config.endHour);

      if (isoDate === format(now, "yyyy-MM-dd")) {
        if (now >= endTime) {
          return { isoDate, date, slots: [] };
        }

        if (now > startTime) {
          const roundedMinutes = now.getMinutes() < 30 ? 30 : 60;
          startTime = setMinutes(now, roundedMinutes);
        }
      }

      const slots = [];

      while (startTime <= endTime) {
        const slot = format(startTime, "hh:mm a");
        const isBooked = slotsBooked?.[isoDate]?.includes(slot) ?? false;

        if (!isBooked) {
          slots.push(slot);
        }

        startTime = addMinutes(startTime, config.intervalMinutes);
      }

      return { isoDate, date, slots };
    });
  }, []);

  const selectedRescheduleDay = useMemo(
    () => rescheduleDays.find((day) => day.isoDate === rescheduleDate),
    [rescheduleDays, rescheduleDate],
  );

  const closeRescheduleModal = () => {
    setRescheduleModal({ open: false, type: null, item: null });
    setRescheduleDate("");
    setRescheduleTime("");
    setRescheduleDays([]);
    setLoadingRescheduleSlots(false);
  };

  const summary = useMemo(() => {
    let upcoming = 0,
      completed = 0,
      cancelled = 0;
    appointments.forEach((app) => {
      if (app.cancelled) cancelled += 1;
      else if (app.isCompleted) completed += 1;
      else upcoming += 1;
    });
    return { upcoming, completed, cancelled };
  }, [appointments]);

  const getStatusPill = (appointment) => {
    if (appointment.cancelled)
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          Cancelled
        </span>
      );
    if (appointment.isCompleted)
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
          Completed
        </span>
      );
    if (isExpired(appointment.slotDate, appointment.slotTime))
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
          Expired
        </span>
      );
    if (appointment.payment)
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
          Paid
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
        Pending
      </span>
    );
  };

  const hasPrescriptionData = (appointment) => {
    const prescription = appointment?.prescription;
    if (!prescription) return false;

    const hasMedicines = Array.isArray(prescription.medicines)
      ? prescription.medicines.some((medicine) => medicine?.name)
      : false;

    return Boolean(
      prescription.diagnosis?.trim() ||
      prescription.notes?.trim() ||
      hasMedicines,
    );
  };

  const openPrescriptionDetails = (appointment) => {
    setPrescriptionModal({ open: true, appointment });
  };

  const closePrescriptionDetails = () => {
    setPrescriptionModal({ open: false, appointment: null });
  };

  const closeReportModal = () => {
    setReportModal({ open: false, booking: null, reportUrl: "" });
  };

  const openServiceReport = async (booking) => {
    if (!booking?._id) return;

    setOpeningReportId(booking._id);

    try {
      const { data } = await axios.post(
        `${backendurl}/api/services/user/report-url`,
        { bookingId: booking._id },
        { headers: { token } },
      );

      if (!data.success || !data.reportUrl) {
        toast.error(data.message || "Could not open report.");
        return;
      }

      // const proxyUrl = `${backendurl}/api/services/report-file/${booking._id}?token=${encodeURIComponent(token)}`;

      // setReportModal({
      //   open: true,
      //   booking: {
      //     ...booking,
      //     labReportName: data.reportName || booking.labReportName,
      //     labReportMimeType: data.reportMimeType || booking.labReportMimeType,
      //   },
      //   reportUrl: proxyUrl,
      // });
      const proxyUrl = `${backendurl}/api/services/report-file/${booking._id}?token=${encodeURIComponent(
        token,
      )}`;

      setReportModal({
        open: true,
        booking: {
          ...booking,
          labReportName: data.reportName || booking.labReportName,
          labReportMimeType: data.reportMimeType || booking.labReportMimeType,
        },
        reportUrl: proxyUrl,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not open report.");
    } finally {
      setOpeningReportId(null);
    }
  };

  const isPdfReport = (reportUrl, mimeType) => {
    const normalizedMime = String(mimeType || "").toLowerCase();
    if (normalizedMime.includes("pdf")) return true;
    return /\.pdf($|\?)/i.test(String(reportUrl || ""));
  };

  const isImageReport = (mimeType) =>
    String(mimeType || "")
      .toLowerCase()
      .startsWith("image/");

  const prescriptionsList = useMemo(
    () =>
      appointments
        .filter((appointment) => {
          if (!appointment.isCompleted) return false;
          const prescription = appointment?.prescription;
          if (!prescription) return false;
          const hasMedicines = Array.isArray(prescription.medicines)
            ? prescription.medicines.some((medicine) => medicine?.name)
            : false;
          return Boolean(
            prescription.diagnosis?.trim() ||
            prescription.notes?.trim() ||
            hasMedicines,
          );
        })
        .sort((a, b) => {
          const aTime = a.prescribedAt || a.reviewedAt || a.date || 0;
          const bTime = b.prescribedAt || b.reviewedAt || b.date || 0;
          return bTime - aTime;
        }),
    [appointments],
  );

  const labReportsList = useMemo(
    () =>
      serviceBookings
        .filter((booking) => booking.labReportUrl || booking.labReportPublicId)
        .sort((a, b) => {
          const aTime =
            a.labReportUploadedAt ||
            new Date(a.updatedAt || a.createdAt || a.date || 0).getTime();
          const bTime =
            b.labReportUploadedAt ||
            new Date(b.updatedAt || b.createdAt || b.date || 0).getTime();
          return bTime - aTime;
        }),
    [serviceBookings],
  );

  const openAppointmentReschedule = async (appointment) => {
    if (isExpired(appointment.slotDate, appointment.slotTime)) {
      toast.error("Past appointments cannot be rescheduled.");
      return;
    }

    setLoadingRescheduleSlots(true);
    setRescheduleModal({ open: true, type: "appointment", item: appointment });

    try {
      let doctor = doctors.find((item) => item._id === appointment.docId);

      if (!doctor) {
        const { data } = await axios.get(`${backendurl}/api/doctor/list`);
        if (data.success && Array.isArray(data.doctors)) {
          doctor = data.doctors.find((item) => item._id === appointment.docId);
        }
      }

      if (!doctor) {
        toast.error("Doctor availability data could not be loaded.");
        closeRescheduleModal();
        return;
      }

      const days = buildSlotsForNextDays(
        doctor.slots_booked || {},
        "appointments",
      );
      const firstAvailableDay = days.find((day) => day.slots.length > 0);

      setRescheduleDays(days);
      setRescheduleDate(firstAvailableDay?.isoDate || "");
      setRescheduleTime("");
    } catch (error) {
      toast.error("Could not load available slots.");
      closeRescheduleModal();
    } finally {
      setLoadingRescheduleSlots(false);
    }
  };

  const openServiceReschedule = async (booking) => {
    if (isExpired(booking.slotDate, booking.slotTime)) {
      toast.error("Past service bookings cannot be rescheduled.");
      return;
    }

    const serviceId =
      typeof booking.serviceId === "string"
        ? booking.serviceId
        : booking.serviceId?._id;

    if (!serviceId) {
      toast.error("Service ID is missing for this booking.");
      return;
    }

    setLoadingRescheduleSlots(true);
    setRescheduleModal({ open: true, type: "service", item: booking });

    try {
      const { data } = await axios.get(
        `${backendurl}/api/services/${serviceId}`,
      );

      if (!data.success || !data.service) {
        toast.error("Service details could not be loaded.");
        closeRescheduleModal();
        return;
      }

      const days = buildSlotsForNextDays(
        data.service.slots_booked || {},
        "services",
      );
      const firstAvailableDay = days.find((day) => day.slots.length > 0);

      setRescheduleDays(days);
      setRescheduleDate(firstAvailableDay?.isoDate || "");
      setRescheduleTime("");
    } catch (error) {
      toast.error("Could not load available slots.");
      closeRescheduleModal();
    } finally {
      setLoadingRescheduleSlots(false);
    }
  };

  const submitReschedule = async () => {
    if (!rescheduleModal?.item) return;

    if (!rescheduleDate || !rescheduleTime) {
      toast.error("Please select a date and time slot.");
      return;
    }

    const isSameSlot =
      rescheduleModal.item.slotDate === rescheduleDate &&
      rescheduleModal.item.slotTime === rescheduleTime;

    if (isSameSlot) {
      toast.error("Please choose a different date or time.");
      return;
    }

    setReschedulingId(rescheduleModal.item._id);

    try {
      if (rescheduleModal.type === "appointment") {
        const { data } = await axios.post(
          `${backendurl}/api/user/reschedule-appointment`,
          {
            appointmentId: rescheduleModal.item._id,
            slotDate: rescheduleDate,
            slotTime: rescheduleTime,
          },
          { headers: { token } },
        );

        if (!data.success) {
          toast.error(data.message || "Could not reschedule appointment.");
          return;
        }

        toast.success("Appointment rescheduled successfully.");
        await Promise.all([fetchAppointments(), getDoctorsData()]);
      } else {
        const { data } = await axios.post(
          `${backendurl}/api/services/reschedule-booking`,
          {
            bookingId: rescheduleModal.item._id,
            slotDate: rescheduleDate,
            slotTime: rescheduleTime,
          },
          { headers: { token } },
        );

        if (!data.success) {
          toast.error(data.message || "Could not reschedule booking.");
          return;
        }

        toast.success("Service booking rescheduled successfully.");
        await fetchServiceBookings();
      }

      closeRescheduleModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Could not reschedule. Please try again.",
      );
    } finally {
      setReschedulingId(null);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    setCancelingId(appointmentId);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        setAppointments((prev) =>
          prev.filter((app) => app._id !== appointmentId),
        );
        toast.success("Your appointment was canceled.");
        fetchAppointments();
        getDoctorsData();
      } else {
        toast.error(
          data.message ||
            "We couldn't cancel that appointment. Please try again.",
        );
      }
    } catch (error) {
      toast.error(
        `Cancel failed: ${
          error.response?.data?.message || "We couldn't cancel the appointment."
        }`,
      );
    } finally {
      setCancelingId(null);
    }
  };

  const appoinmentStripepay = async (appointmentId) => {
    setPayingId(appointmentId);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/create-checkout-session`,
        { appointmentId },
        { headers: { token } },
      );

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      toast.error("Payment couldn't start. Please try again.");
    } finally {
      setPayingId(null);
    }
  };

  const openReviewModal = (appointment) => {
    setReviewingAppointmentId(appointment._id);
    setRatingValue(appointment.doctorRating || 0);
    setReviewText(appointment.doctorReview || "");
  };

  const closeReviewModal = () => {
    setReviewingAppointmentId(null);
    setRatingValue(0);
    setReviewText("");
  };

  const submitDoctorReview = async () => {
    if (!reviewingAppointmentId) return;

    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      toast.error("Please select a rating between 1 and 5.");
      return;
    }

    setSubmittingReview(true);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/submit-review`,
        {
          appointmentId: reviewingAppointmentId,
          rating: ratingValue,
          review: reviewText.trim(),
        },
        { headers: { token } },
      );

      if (data.success) {
        toast.success("Thanks! Your review has been submitted.");
        closeReviewModal();
        await Promise.all([fetchAppointments(), getDoctorsData()]);
      } else {
        toast.error(data.message || "Could not submit review.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not submit review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchServiceBookings();
  }, [fetchAppointments]);

  const fetchServiceBookings = async () => {
    if (!token) return;
    try {
      const { data } = await axios.post(
        `${backendurl}/api/services/user/bookings`,
        {},
        { headers: { token } },
      );
      if (data.success && Array.isArray(data.bookings)) {
        setServiceBookings(data.bookings);
      }
    } catch (error) {
      // Silently fail for service bookings
    }
  };

  const cancelServiceBooking = async (bookingId) => {
    setCancelingId(bookingId);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/services/cancel-booking`,
        { bookingId },
        { headers: { token } },
      );
      if (data.success) {
        toast.success("Service booking cancelled.");
        fetchServiceBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Could not cancel the booking.");
    } finally {
      setCancelingId(null);
    }
  };

  const payServiceBooking = async (bookingId) => {
    setPayingId(bookingId);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/services/create-checkout-session`,
        { bookingId },
        { headers: { token } },
      );
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      toast.error("Payment couldn't start. Please try again.");
    } finally {
      setPayingId(null);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto p-4 pt-6">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-3">
        My Appointments
      </h2>

      {/* Tabs */}
      <div className="mb-6 flex gap-4 overflow-x-auto border-b">
        <button
          onClick={() => setActiveTab("appointments")}
          className={`whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium transition-all ${
            activeTab === "appointments"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Doctor Appointments
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium transition-all ${
            activeTab === "services"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Service Bookings{" "}
          {serviceBookings.length > 0 && `(${serviceBookings.length})`}
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium transition-all ${
            activeTab === "reports"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Lab Reports{" "}
          {labReportsList.length > 0 && `(${labReportsList.length})`}
        </button>
        <button
          onClick={() => setActiveTab("prescriptions")}
          className={`whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium transition-all ${
            activeTab === "prescriptions"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Prescriptions{" "}
          {prescriptionsList.length > 0 && `(${prescriptionsList.length})`}
        </button>
      </div>

      {activeTab === "appointments" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <SummaryCard
              label="Upcoming"
              value={summary.upcoming}
              tone="primary"
            />
            <SummaryCard
              label="Completed"
              value={summary.completed}
              tone="emerald"
            />
            <SummaryCard
              label="Cancelled"
              value={summary.cancelled}
              tone="red"
            />
          </div>

          {/* Filter controls */}
          <div className="flex flex-wrap gap-2 mb-4">
            {["all", "upcoming", "completed", "cancelled"].map((filter) => {
              const labels = {
                all: "All",
                upcoming: "Upcoming",
                completed: "Completed",
                cancelled: "Cancelled",
              };
              const active = statusFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-primary/50"
                  }`}
                >
                  {labels[filter]}
                </button>
              );
            })}
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No appointments found
            </div>
          ) : (
            <div className="space-y-4">
              {appointments
                .filter((appointment) => {
                  if (statusFilter === "all") return true;
                  if (statusFilter === "upcoming")
                    return (
                      !appointment.cancelled &&
                      !appointment.isCompleted &&
                      !isExpired(appointment.slotDate, appointment.slotTime)
                    );
                  if (statusFilter === "completed")
                    return appointment.isCompleted;
                  if (statusFilter === "cancelled")
                    return appointment.cancelled;
                  return true;
                })
                .map((appointment) => (
                  <div
                    key={appointment._id}
                    className="bg-white rounded-lg shadow-sm p-4 border transition-all hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Doctor's Image */}
                      <div className="flex-shrink-0">
                        <img
                          className="w-32 h-32 object-cover rounded-lg bg-gray-100"
                          src={appointment.docData.image}
                          alt={`Dr. ${appointment.docData.name}`}
                          onError={(e) =>
                            (e.target.src = "/default-doctor.jpg")
                          }
                        />
                      </div>

                      <div className="flex-grow space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {appointment.docData.name}
                          </h3>
                          {getStatusPill(appointment)}
                        </div>
                        <p className="text-sm text-gray-600">
                          {appointment.docData.speciality}
                        </p>

                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium">Address:</span>{" "}
                            {appointment.docData.address?.line1},{" "}
                            {appointment.docData.address?.line2}
                          </p>
                          <p>
                            <span className="font-medium">Date & Time:</span>{" "}
                            {formatAppointmentDate(appointment.slotDate)} |{" "}
                            {appointment.slotTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:items-end sm:justify-end">
                        {appointment.cancelled ? (
                          <button className="w-full sm:w-full px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed">
                            Appointment Cancelled
                          </button>
                        ) : appointment.isCompleted ? (
                          <div className="w-full space-y-2">
                            <button className="w-full sm:w-full px-4 py-2 bg-teal-600 text-white rounded-md cursor-not-allowed">
                              Appointment Completed
                            </button>
                            {appointment.doctorRating ? (
                              <div className="rounded-md border border-amber-100 bg-amber-50 px-3 py-2">
                                <p className="text-xs font-medium text-amber-700">
                                  Your Rating
                                </p>
                                <div className="mt-1 flex items-center gap-2">
                                  <RatingStars
                                    value={appointment.doctorRating}
                                    readOnly
                                  />
                                  <span className="text-xs font-semibold text-amber-700">
                                    {appointment.doctorRating}/5
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <button
                                className="w-full sm:w-full px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                                onClick={() => openReviewModal(appointment)}
                              >
                                Rate Doctor
                              </button>
                            )}

                            {hasPrescriptionData(appointment) ? (
                              <button
                                type="button"
                                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
                                onClick={() =>
                                  openPrescriptionDetails(appointment)
                                }
                              >
                                Show Prescription
                              </button>
                            ) : (
                              <p className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500">
                                Prescription not added yet.
                              </p>
                            )}
                          </div>
                        ) : isExpired(
                            appointment.slotDate,
                            appointment.slotTime,
                          ) ? (
                          <button className="w-full sm:w-full px-4 py-2 bg-gray-600 text-white rounded-md cursor-not-allowed">
                            Appointment Expired
                          </button>
                        ) : (
                          <>
                            {appointment.payment ? (
                              <button className="w-full sm:w-full px-4 py-2 bg-green-700 text-white rounded-md">
                                Paid
                              </button>
                            ) : (
                              <button
                                className="w-full sm:w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-teal-600 transition-colors disabled:opacity-50"
                                onClick={() =>
                                  appoinmentStripepay(appointment._id)
                                }
                                disabled={payingId === appointment._id}
                              >
                                {payingId === appointment._id
                                  ? "Processing"
                                  : "Pay Online"}
                              </button>
                            )}

                            <button
                              className="w-full sm:w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                              onClick={() =>
                                openAppointmentReschedule(appointment)
                              }
                              disabled={reschedulingId === appointment._id}
                            >
                              {reschedulingId === appointment._id
                                ? "Updating..."
                                : "Reschedule"}
                            </button>

                            <button
                              className="w-full sm:w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                              onClick={() =>
                                handleCancelAppointment(appointment._id)
                              }
                              disabled={cancelingId === appointment._id}
                            >
                              {cancelingId === appointment._id
                                ? "Canceling..."
                                : "Cancel Appointment"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}

      {/* Service Bookings Tab */}
      {activeTab === "services" && (
        <>
          {serviceBookings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No service bookings yet.</p>
              <p className="text-sm mt-1">
                Book a diagnostic service from our Services page.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {serviceBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-lg shadow-sm p-4 border transition-all hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      {booking.serviceImage ? (
                        <img
                          className="w-32 h-32 object-cover rounded-lg bg-gray-100"
                          src={booking.serviceImage}
                          alt={booking.serviceName}
                        />
                      ) : (
                        <div className="w-32 h-32 bg-teal-50 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-10 h-10 text-teal-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="flex-grow space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {booking.serviceName}
                        </h3>
                        {booking.cancelled ? (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                            Cancelled
                          </span>
                        ) : booking.isCompleted ? (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                            Completed
                          </span>
                        ) : isExpired(booking.slotDate, booking.slotTime) ? (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                            Expired
                          </span>
                        ) : booking.payment ? (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                            Paid
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                            Pending
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {booking.slotDate}
                        </p>
                        <p>
                          <span className="font-medium">Time:</span>{" "}
                          {booking.slotTime}
                        </p>
                        <p>
                          <span className="font-medium">Amount:</span>{" "}
                          {currencySymbol}
                          {booking.amount}
                        </p>
                        <p>
                          <span className="font-medium">Payment:</span>{" "}
                          <span className="capitalize">
                            {booking.paymentMethod}
                          </span>
                        </p>
                        {booking.labReportUrl || booking.labReportPublicId ? (
                          <p>
                            <span className="font-medium">Lab Report:</span>{" "}
                            <button
                              type="button"
                              className="text-primary hover:underline disabled:opacity-50"
                              onClick={() => openServiceReport(booking)}
                              disabled={openingReportId === booking._id}
                            >
                              {openingReportId === booking._id
                                ? "Opening..."
                                : "Show Report"}
                            </button>
                          </p>
                        ) : booking.isCompleted ? (
                          <p className="text-amber-700">
                            <span className="font-medium">Lab Report:</span>{" "}
                            Pending upload
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:items-end sm:justify-end">
                      {!booking.cancelled &&
                        !booking.isCompleted &&
                        !isExpired(booking.slotDate, booking.slotTime) && (
                          <>
                            {!booking.payment &&
                              booking.paymentMethod === "online" && (
                                <button
                                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-teal-600 transition-colors disabled:opacity-50 text-sm"
                                  onClick={() => payServiceBooking(booking._id)}
                                  disabled={payingId === booking._id}
                                >
                                  {payingId === booking._id
                                    ? "Processing"
                                    : "Pay Online"}
                                </button>
                              )}
                            <button
                              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 text-sm"
                              onClick={() => openServiceReschedule(booking)}
                              disabled={reschedulingId === booking._id}
                            >
                              {reschedulingId === booking._id
                                ? "Updating..."
                                : "Reschedule"}
                            </button>
                            <button
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 text-sm"
                              onClick={() => cancelServiceBooking(booking._id)}
                              disabled={cancelingId === booking._id}
                            >
                              {cancelingId === booking._id
                                ? "Canceling..."
                                : "Cancel"}
                            </button>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "reports" && (
        <>
          {labReportsList.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
              No lab reports uploaded yet.
            </div>
          ) : (
            <div className="space-y-4">
              {labReportsList.map((booking) => (
                <div
                  key={`report-${booking._id}`}
                  className="rounded-lg border bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {booking.serviceName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {booking.slotDate} | {booking.slotTime}
                      </p>
                      {booking.labReportUploadedAt ? (
                        <p className="text-xs text-gray-500">
                          Uploaded:{" "}
                          {new Date(
                            booking.labReportUploadedAt,
                          ).toLocaleString()}
                        </p>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      onClick={() => openServiceReport(booking)}
                      disabled={openingReportId === booking._id}
                      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {openingReportId === booking._id
                        ? "Opening..."
                        : "Show Report"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "prescriptions" && (
        <>
          {prescriptionsList.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
              No prescriptions available yet.
            </div>
          ) : (
            <div className="space-y-4">
              {prescriptionsList.map((appointment) => (
                <div
                  key={`prescription-${appointment._id}`}
                  className="rounded-lg border bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {appointment.docData?.name || "Doctor"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {appointment.docData?.speciality || "Specialist"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatAppointmentDate(appointment.slotDate)} |{" "}
                        {appointment.slotTime}
                      </p>
                      {appointment.prescription?.diagnosis ? (
                        <p className="text-xs text-gray-500">
                          Diagnosis: {appointment.prescription.diagnosis}
                        </p>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      onClick={() => openPrescriptionDetails(appointment)}
                      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                    >
                      Show Prescription
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {prescriptionModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl sm:p-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Prescription Details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {prescriptionModal.appointment?.docData?.name} |{" "}
              {formatAppointmentDate(prescriptionModal.appointment?.slotDate)} |{" "}
              {prescriptionModal.appointment?.slotTime}
            </p>

            {hasPrescriptionData(prescriptionModal.appointment) ? (
              <div className="mt-5 space-y-4 text-sm text-gray-700">
                {prescriptionModal.appointment?.prescription?.diagnosis ? (
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Diagnosis
                    </p>
                    <p className="mt-1 text-gray-800">
                      {prescriptionModal.appointment.prescription.diagnosis}
                    </p>
                  </div>
                ) : null}

                {prescriptionModal.appointment?.prescription?.notes ? (
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Notes
                    </p>
                    <p className="mt-1 text-gray-800">
                      {prescriptionModal.appointment.prescription.notes}
                    </p>
                  </div>
                ) : null}

                {Array.isArray(
                  prescriptionModal.appointment?.prescription?.medicines,
                ) &&
                prescriptionModal.appointment.prescription.medicines.length >
                  0 ? (
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                      Medicines
                    </p>
                    <div className="mt-2 space-y-2">
                      {prescriptionModal.appointment.prescription.medicines.map(
                        (medicine, index) => (
                          <div
                            key={`${prescriptionModal.appointment._id}-rx-${index}`}
                            className="rounded-lg border border-indigo-100 bg-white px-3 py-2 text-xs text-indigo-900"
                          >
                            <p className="font-semibold">
                              {index + 1}. {medicine.name}
                            </p>
                            <p className="mt-1">
                              {medicine.dosage
                                ? `Dosage: ${medicine.dosage}`
                                : ""}
                              {medicine.frequency
                                ? ` | ${medicine.frequency}`
                                : ""}
                              {medicine.duration
                                ? ` | ${medicine.duration}`
                                : ""}
                            </p>
                            {medicine.instructions ? (
                              <p className="mt-1">
                                Instructions: {medicine.instructions}
                              </p>
                            ) : null}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                Prescription not available.
              </p>
            )}

            <div className="mt-5">
              <button
                type="button"
                onClick={closePrescriptionDetails}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {reportModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-4xl rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl sm:p-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Service Report
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {reportModal.booking?.serviceName} |{" "}
              {reportModal.booking?.slotDate} | {reportModal.booking?.slotTime}
            </p>

            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
              {isImageReport(reportModal.booking?.labReportMimeType) ? (
                <img
                  src={reportModal.reportUrl}
                  alt={reportModal.booking?.labReportName || "Lab report"}
                  className="max-h-[60vh] w-full rounded-lg object-contain"
                />
              ) : isPdfReport(
                  reportModal.reportUrl,
                  reportModal.booking?.labReportMimeType,
                ) ? (
                <iframe
                  title="Lab Report Preview"
                  src={reportModal.reportUrl}
                  className="h-[60vh] w-full rounded-lg border border-gray-200 bg-white"
                />
              ) : (
                <div className="flex h-[40vh] items-center justify-center text-sm text-gray-600">
                  Preview not available for this file type.
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={closeReportModal}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>
              <a
                href={reportModal.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                Open In New Tab
              </a>
            </div>
          </div>
        </div>
      )}

      {rescheduleModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl sm:p-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {rescheduleModal.type === "appointment"
                ? "Reschedule Appointment"
                : "Reschedule Service Booking"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Current slot:{" "}
              <span className="font-medium text-gray-700">
                {formatAppointmentDate(rescheduleModal.item?.slotDate)} |{" "}
                {rescheduleModal.item?.slotTime}
              </span>
            </p>

            {loadingRescheduleSlots ? (
              <div className="mt-6 flex h-32 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : rescheduleDays.every((day) => day.slots.length === 0) ? (
              <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                No slots are available in the next 7 days.
              </div>
            ) : (
              <>
                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Select Date
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {rescheduleDays.map((day) => {
                      const isSelected = day.isoDate === rescheduleDate;

                      return (
                        <button
                          key={day.isoDate}
                          type="button"
                          onClick={() => {
                            setRescheduleDate(day.isoDate);
                            setRescheduleTime("");
                          }}
                          className={`min-w-[92px] rounded-xl border px-3 py-2 text-center transition ${
                            isSelected
                              ? "border-primary bg-teal-50 text-primary"
                              : "border-gray-200 bg-white text-gray-600 hover:border-teal-200"
                          } ${day.slots.length === 0 ? "opacity-60" : ""}`}
                        >
                          <p className="text-[11px] uppercase tracking-wide">
                            {format(day.date, "EEE")}
                          </p>
                          <p className="text-lg font-semibold leading-5">
                            {format(day.date, "dd")}
                          </p>
                          <p className="text-[11px] uppercase tracking-wide">
                            {format(day.date, "MMM")}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Select Time Slot
                  </p>
                  {selectedRescheduleDay?.slots?.length ? (
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                      {selectedRescheduleDay.slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setRescheduleTime(slot)}
                          className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                            rescheduleTime === slot
                              ? "border-primary bg-primary text-white"
                              : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                          }`}
                        >
                          {slot.toLowerCase()}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
                      No slots available for this date.
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={closeRescheduleModal}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                disabled={reschedulingId === rescheduleModal.item?._id}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitReschedule}
                disabled={
                  loadingRescheduleSlots ||
                  !rescheduleDate ||
                  !rescheduleTime ||
                  reschedulingId === rescheduleModal.item?._id
                }
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${
                  loadingRescheduleSlots ||
                  !rescheduleDate ||
                  !rescheduleTime ||
                  reschedulingId === rescheduleModal.item?._id
                    ? "cursor-not-allowed bg-gray-300"
                    : "bg-primary hover:bg-teal-600"
                }`}
              >
                {reschedulingId === rescheduleModal.item?._id
                  ? "Updating..."
                  : "Confirm Reschedule"}
              </button>
            </div>
          </div>
        </div>
      )}

      {reviewingAppointmentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl sm:p-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Rate Your Doctor
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Rating is required. Review is optional.
            </p>

            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-gray-700">
                Your Rating
              </p>
              <RatingStars value={ratingValue} onChange={setRatingValue} />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Your Review (optional)
              </label>
              <textarea
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                maxLength={500}
                rows={4}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
                placeholder="Share your experience with this doctor..."
              />
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={closeReviewModal}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                disabled={submittingReview}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitDoctorReview}
                disabled={submittingReview || !ratingValue}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${
                  submittingReview || !ratingValue
                    ? "cursor-not-allowed bg-gray-300"
                    : "bg-primary hover:bg-teal-600"
                }`}
              >
                {submittingReview ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
