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

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

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
  const { backendurl, token, getDoctorsData, logoutUser, currencySymbol } =
    useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [serviceBookings, setServiceBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [payingId, setPayingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("appointments");
  const [reviewingAppointmentId, setReviewingAppointmentId] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

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
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Thanks! Your review has been submitted.");
        closeReviewModal();
        await Promise.all([fetchAppointments(), getDoctorsData()]);
      } else {
        toast.error(data.message || "Could not submit review.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not submit review."
      );
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
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab("appointments")}
          className={`pb-2 px-1 text-sm font-medium transition-all border-b-2 ${
            activeTab === "appointments"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Doctor Appointments
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`pb-2 px-1 text-sm font-medium transition-all border-b-2 ${
            activeTab === "services"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Service Bookings{" "}
          {serviceBookings.length > 0 && `(${serviceBookings.length})`}
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
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:items-end sm:justify-end">
                      {!booking.cancelled && !booking.isCompleted && (
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
