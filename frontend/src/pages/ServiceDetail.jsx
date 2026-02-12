import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiActivity,
  FiAperture,
  FiAlertCircle,
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCpu,
  FiCreditCard,
  FiHeart,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSearch,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { format, addDays, setHours, setMinutes, addMinutes } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { resolveImageUrl } from "../utils/imageUrl";

const SLOT_CONFIG = {
  START_HOUR: 9,
  END_HOUR: 21,
  INTERVAL_MINUTES: 30,
};

const BOOKING_WINDOW_DAYS = 7;

const CATEGORY_META = {
  "imaging-radiology": {
    label: "Imaging & Radiology",
    Icon: FiAperture,
  },
  laboratory: {
    label: "Laboratory Tests",
    Icon: FiActivity,
  },
  "cardiovascular-pulmonary": {
    label: "Heart & Lungs",
    Icon: FiHeart,
  },
  endoscopy: {
    label: "Endoscopy",
    Icon: FiSearch,
  },
  "neurological-functional": {
    label: "Neuro & Functional",
    Icon: FiCpu,
  },
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendurl, token, userData, currencySymbol, isLoggedin } =
    useContext(AppContext);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailySlots, setDailySlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(-1);
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [booking, setBooking] = useState(false);

  const categoryMeta = useMemo(() => {
    if (!service?.category) {
      return { label: "Diagnostic Service", Icon: FiActivity };
    }
    return (
      CATEGORY_META[service.category] || {
        label: service.category,
        Icon: FiActivity,
      }
    );
  }, [service]);

  const selectedDay =
    selectedDayIndex >= 0 && selectedDayIndex < dailySlots.length
      ? dailySlots[selectedDayIndex]
      : null;

  const selectedSlot = selectedDay?.slots?.find(
    (slot) => slot.time === selectedTime,
  );

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(`${backendurl}/api/services/${id}`);
        if (data.success) {
          setService(data.service);
        } else {
          toast.error("Service not found");
          navigate("/services");
        }
      } catch {
        toast.error("Could not load service details");
        navigate("/services");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id, backendurl, navigate]);

  const generateSlotsForDate = useCallback(
    (date) => {
      if (!service) return [];

      const slots = [];
      const now = new Date();

      let startTime = setHours(setMinutes(date, 0), SLOT_CONFIG.START_HOUR);
      const endTime = setHours(setMinutes(date, 0), SLOT_CONFIG.END_HOUR);

      if (format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd")) {
        if (now >= endTime) return [];

        if (now > startTime) {
          const roundedMinutes = now.getMinutes() < 30 ? 30 : 60;
          startTime = setMinutes(now, roundedMinutes);
        }
      }

      while (startTime <= endTime) {
        const formattedTime = format(startTime, "hh:mm a");
        const slotDate = format(startTime, "yyyy-MM-dd");

        const isBooked =
          service.slots_booked?.[slotDate]?.includes(formattedTime) ?? false;

        if (!isBooked) {
          slots.push({
            time: formattedTime,
            isoDate: slotDate,
          });
        }

        startTime = addMinutes(startTime, SLOT_CONFIG.INTERVAL_MINUTES);
      }

      return slots;
    },
    [service],
  );

  useEffect(() => {
    if (!service) return;

    const currentDate = new Date();
    const nextDays = Array.from({ length: BOOKING_WINDOW_DAYS }, (_, index) => {
      const date = addDays(currentDate, index);

      return {
        date,
        isoDate: format(date, "yyyy-MM-dd"),
        slots: generateSlotsForDate(date),
      };
    });

    setDailySlots(nextDays);

    const firstAvailableIndex = nextDays.findIndex((day) => day.slots.length > 0);
    setSelectedDayIndex(firstAvailableIndex);
    setSelectedTime("");
  }, [service, generateSlotsForDate]);

  const handleBooking = async () => {
    if (!isLoggedin || !token) {
      toast.info("Please sign in to book a service");
      navigate("/login");
      return;
    }

    if (!selectedSlot) {
      toast.error("Please select a date and time slot");
      return;
    }

    setBooking(true);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/services/book`,
        {
          serviceId: id,
          slotDate: selectedSlot.isoDate,
          slotTime: selectedSlot.time,
          paymentMethod,
        },
        { headers: { token } },
      );

      if (data.success) {
        toast.success("Service booked successfully");
        navigate("/my-appointments");
      } else {
        toast.error(data.message || "Could not book the service");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not book the service",
      );
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[62vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!service) return null;

  const CategoryIcon = categoryMeta.Icon;

  return (
    <div className="min-h-screen pb-12">
      <section className="mt-4 overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-5">
          <div className="relative lg:col-span-2">
            <div className="h-full min-h-[260px] bg-gradient-to-br from-teal-50 to-emerald-50">
              {service.image ? (
                <img
                  src={resolveImageUrl(service.image, backendurl)}
                  alt={service.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="rounded-2xl border border-teal-200 bg-white/90 p-6 text-primary">
                    <CategoryIcon className="h-12 w-12" />
                  </span>
                </div>
              )}
            </div>
            <div className="absolute right-4 top-4 rounded-xl bg-gray-900/85 px-4 py-2 text-white shadow-lg">
              <p className="text-[11px] uppercase tracking-wide text-gray-200">Price</p>
              <p className="text-xl font-bold">
                {currencySymbol}
                {service.price}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 p-6 sm:p-8">
            <button
              onClick={() => navigate("/services")}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-primary hover:text-primary"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back to Services
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-700">
                <CategoryIcon className="h-3.5 w-3.5" />
                {categoryMeta.label}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-700">
                <FiShield className="h-3.5 w-3.5" />
                Trusted Service
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              {service.name}
            </h1>
            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
              {service.description}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Duration</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">30 Minutes</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Results</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">24-48 Hours</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Booking Window</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">Next 7 Days</p>
              </div>
            </div>

            {service.preTestInstructions?.length > 0 && (
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <FiAlertCircle className="h-4 w-4 text-amber-700" />
                  <h2 className="text-sm font-semibold text-amber-800">
                    Pre-Test Instructions
                  </h2>
                </div>
                <ul className="space-y-1.5">
                  {service.preTestInstructions.map((instruction, index) => (
                    <li
                      key={`${instruction}-${index}`}
                      className="flex items-start gap-2 text-sm text-amber-700"
                    >
                      <FiCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <FiCalendar className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">Choose Date and Time</h2>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {dailySlots.map((day, index) => {
                const isActive = selectedDayIndex === index;
                const isUnavailable = day.slots.length === 0;

                return (
                  <button
                    key={day.isoDate}
                    onClick={() => {
                      setSelectedDayIndex(index);
                      setSelectedTime("");
                    }}
                    className={`min-w-[86px] rounded-xl border px-3 py-2 text-center transition ${
                      isActive
                        ? "border-primary bg-teal-50 text-primary"
                        : "border-gray-200 bg-white text-gray-600 hover:border-teal-200"
                    } ${isUnavailable ? "opacity-60" : ""}`}
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

            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-gray-700">Available Slots</p>
              {selectedDayIndex === -1 ? (
                <p className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500">
                  No slots are currently available for the next 7 days.
                </p>
              ) : selectedDay?.slots?.length > 0 ? (
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                  {selectedDay.slots.map((slot) => {
                    const isSelected = selectedTime === slot.time;

                    return (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                          isSelected
                            ? "border-primary bg-primary text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                        }`}
                      >
                        {slot.time.toLowerCase()}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500">
                  No slots available for this day. Please try another date.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <FiCreditCard className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setPaymentMethod("online")}
                className={`rounded-xl border p-4 text-left transition ${
                  paymentMethod === "online"
                    ? "border-primary bg-teal-50"
                    : "border-gray-200 hover:border-teal-200"
                }`}
              >
                <div className="mb-1 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                  <FiCreditCard className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-gray-800">Pay Online</p>
                <p className="text-xs text-gray-500">Secure checkout</p>
              </button>

              <button
                onClick={() => setPaymentMethod("cash")}
                className={`rounded-xl border p-4 text-left transition ${
                  paymentMethod === "cash"
                    ? "border-primary bg-teal-50"
                    : "border-gray-200 hover:border-teal-200"
                }`}
              >
                <div className="mb-1 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                  <FiMapPin className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-gray-800">Pay at Center</p>
                <p className="text-xs text-gray-500">Cash or card on visit</p>
              </button>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">Booking Summary</h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-2">
                <span className="text-gray-500">Service</span>
                <span className="max-w-[65%] text-right font-medium text-gray-800">
                  {service.name}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-2">
                <span className="inline-flex items-center gap-1.5 text-gray-500">
                  <FiUser className="h-4 w-4" />
                  Patient
                </span>
                <span className="font-medium text-gray-800">{userData?.name || "-"}</span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-2">
                <span className="inline-flex items-center gap-1.5 text-gray-500">
                  <FiMail className="h-4 w-4" />
                  Email
                </span>
                <span className="max-w-[65%] truncate text-right font-medium text-gray-800">
                  {userData?.email || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-2">
                <span className="inline-flex items-center gap-1.5 text-gray-500">
                  <FiPhone className="h-4 w-4" />
                  Phone
                </span>
                <span className="font-medium text-gray-800">{userData?.phone || "-"}</span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-2">
                <span className="inline-flex items-center gap-1.5 text-gray-500">
                  <FiCalendar className="h-4 w-4" />
                  Date
                </span>
                <span className="font-medium text-gray-800">
                  {selectedSlot
                    ? format(new Date(selectedSlot.isoDate), "EEE, dd MMM yyyy")
                    : "Not selected"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-2">
                <span className="inline-flex items-center gap-1.5 text-gray-500">
                  <FiClock className="h-4 w-4" />
                  Time
                </span>
                <span className="font-medium text-gray-800">
                  {selectedTime || "Not selected"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-2">
                <span className="text-gray-500">Payment</span>
                <span className="font-medium text-gray-800 capitalize">
                  {paymentMethod === "online" ? "Online" : "At Center"}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-teal-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-teal-900">Total Amount</span>
                <span className="text-xl font-bold text-teal-900">
                  {currencySymbol}
                  {service.price}
                </span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={booking || !selectedSlot}
              className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
                booking || !selectedSlot
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-primary hover:bg-teal-600"
              }`}
            >
              {booking ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <FiCheckCircle className="h-4 w-4" />
                  Confirm Booking
                </>
              )}
            </button>

            {!selectedSlot && (
              <p className="mt-3 text-center text-xs text-gray-500">
                Select date and time to continue.
              </p>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default ServiceDetail;
