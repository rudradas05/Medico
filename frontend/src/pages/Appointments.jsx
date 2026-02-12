import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import { format, addDays, setHours, setMinutes, addMinutes } from "date-fns";
import { resolveImageUrl } from "../utils/imageUrl";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendurl, token, getDoctorsData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(-1);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [todayMessage, setTodayMessage] = useState("");

  const selectedSlot =
    selectedDayIndex !== -1 && selectedTime
      ? availableSlots[selectedDayIndex]?.find((slot) => slot.time === selectedTime)
      : null;

  const selectedDaySlots =
    selectedDayIndex !== -1 ? availableSlots[selectedDayIndex] || [] : [];

  const SLOT_CONFIG = {
    START_HOUR: 10,
    END_HOUR: 21,
    INTERVAL: 30,
  };

  const currentDoctor = useMemo(
    () => doctors.find((doc) => doc._id === docId),
    [doctors, docId]
  );

  const generateSlotsForDate = useCallback(
    (date) => {
      if (!doctor) return [];

      const slots = [];
      const now = new Date();

      let startTime = setHours(setMinutes(date, 0), SLOT_CONFIG.START_HOUR);
      const endTime = setHours(setMinutes(date, 0), SLOT_CONFIG.END_HOUR);

      if (format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd")) {
        if (now.getHours() >= SLOT_CONFIG.END_HOUR) return [];

        if (now.getHours() >= SLOT_CONFIG.START_HOUR) {
          const currentMinutes = now.getMinutes();
          const roundedMinutes = currentMinutes < 30 ? 30 : 60;
          startTime = setMinutes(now, roundedMinutes);
        }
      }

      while (startTime <= endTime) {
        const formattedTime = format(startTime, "hh:mm a");
        const slotDate = format(startTime, "yyyy-MM-dd");

        const isBooked =
          doctor.slots_booked?.[slotDate]?.includes(formattedTime) ?? false;

        if (!isBooked) {
          slots.push({
            time: formattedTime,
            isoDate: slotDate,
          });
        }

        startTime = addMinutes(startTime, SLOT_CONFIG.INTERVAL);
      }

      return slots;
    },
    [doctor]
  );

  useEffect(() => {
    if (doctor) {
      const today = new Date();
      const slots = [];

      for (let i = 0; i < 7; i++) {
        const date = addDays(today, i);
        let dailySlots = generateSlotsForDate(date);

        if (i === 0) {
          const now = new Date();

          if (now.getHours() >= 21) {
            setTodayMessage("Today there are no available slots.");
          } else {
            dailySlots = dailySlots.filter((slot) => {
              const slotTime = new Date(`${slot.isoDate} ${slot.time}`);
              return slotTime > now;
            });

            if (dailySlots.length === 0) {
              setTodayMessage("No available slots remaining for today.");
            }
          }
        }

        slots.push(dailySlots);
      }

      setAvailableSlots(slots);
    }
  }, [doctor, generateSlotsForDate]);

  const handleBooking = async () => {
    if (!token) {
      toast.info("Please sign in to book an appointment");
      return navigate("/login");
    }

    if (selectedDayIndex === -1 || !selectedTime) {
      toast.error("Select a date and time before booking.");
      return;
    }

    const pickedSlot = availableSlots[selectedDayIndex].find(
      (slot) => slot.time === selectedTime
    );

    if (!pickedSlot) {
      toast.error("That time was just taken. Please pick another slot.");
      return;
    }

    setLoading(true);
    try {
      const slotDate = availableSlots[selectedDayIndex][0].isoDate;

      const { data } = await axios.post(
        `${backendurl}/api/user/book-appointment`,
        { docId, slotDate, slotTime: selectedTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(
          "Your appointment is booked. You can see it in My Appointments."
        );
        await getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "We couldn't book that appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!doctors.length) return;

    if (!currentDoctor) {
      toast.error("We couldn't find that doctor. Redirecting to the doctor list.");
      navigate("/doctors");
    } else if (!doctor) {
      setDoctor(currentDoctor);
    }
  }, [currentDoctor, navigate, doctors.length]);

  if (!doctor) {
    return (
      <div className="flex min-h-[62vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-14 pt-4">
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-500 text-white shadow-lg">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 -left-12 h-52 w-52 rounded-full bg-emerald-200/20 blur-2xl" />

        <div className="relative grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(220px,300px)] lg:items-center lg:px-10">
          <div>
            <button
              onClick={() => navigate("/doctors")}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back to Doctors
            </button>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-teal-50">
                <FiShield className="h-3.5 w-3.5" />
                Verified Specialist
              </span>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                  doctor.available
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doctor.available ? "Available" : "Unavailable"}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              {doctor.name}
            </h1>
            <p className="mt-2 text-sm font-medium text-teal-50 sm:text-base">
              {doctor.degree} - {doctor.speciality}
            </p>
            <p className="mt-3 max-w-2xl text-sm text-teal-50/95 sm:text-base">
              {doctor.about}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wide text-teal-100">Consultation</p>
                <p className="mt-1 text-xl font-semibold">
                  {currencySymbol}
                  {doctor.fees}
                </p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wide text-teal-100">Experience</p>
                <p className="mt-1 text-xl font-semibold">{doctor.experience || "5 Years"}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wide text-teal-100">Window</p>
                <p className="mt-1 text-xl font-semibold">Next 7 Days</p>
              </div>
            </div>
          </div>

          <div className="mx-auto h-64 w-full max-w-[300px] overflow-hidden rounded-2xl border border-white/25 bg-white/15 p-2 shadow-xl backdrop-blur-sm">
            <img
              src={resolveImageUrl(doctor.image, backendurl)}
              alt={doctor.name}
              className="h-full w-full rounded-xl object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <FiCalendar className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">Select Appointment Time</h2>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {availableSlots.map((daySlots, index) => {
                const dayDate = addDays(new Date(), index);
                const isActive = selectedDayIndex === index;

                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedDayIndex(index);
                      setSelectedTime("");
                    }}
                    className={`min-w-[96px] rounded-xl border px-3 py-2 text-center transition ${
                      isActive
                        ? "border-primary bg-teal-50 text-primary"
                        : "border-gray-200 bg-white text-gray-600 hover:border-teal-200"
                    } ${daySlots.length === 0 ? "opacity-70" : ""}`}
                  >
                    <p className="text-[11px] uppercase tracking-wide">
                      {format(dayDate, "EEE")}
                    </p>
                    <p className="text-xl font-semibold leading-6">
                      {format(dayDate, "dd")}
                    </p>
                    <p className="text-[11px] uppercase tracking-wide">
                      {format(dayDate, "MMM")}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <p className="mb-3 text-sm font-medium text-gray-700">Available Slots</p>
              {selectedDayIndex !== -1 && selectedDaySlots.length > 0 ? (
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                  {selectedDaySlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                        selectedTime === slot.time
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {slot.time.toLowerCase()}
                    </button>
                  ))}
                </div>
              ) : selectedDayIndex === -1 ? (
                <p className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500">
                  Please select a date to view available slots.
                </p>
              ) : selectedDayIndex === 0 && todayMessage ? (
                <p className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500">
                  {todayMessage}
                </p>
              ) : (
                <p className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500">
                  No available slots.
                </p>
              )}
            </div>
          </div>

          {!doctor.available && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              This doctor is currently unavailable for booking.
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">Appointment Summary</h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="inline-flex items-center gap-1.5 text-gray-500">
                  <FiUser className="h-4 w-4" />
                  Doctor
                </span>
                <span className="font-medium text-gray-800">{doctor.name}</span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="inline-flex items-center gap-1.5 text-gray-500">
                  <FiBriefcase className="h-4 w-4" />
                  Speciality
                </span>
                <span className="font-medium text-gray-800">{doctor.speciality}</span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
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

              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="inline-flex items-center gap-1.5 text-gray-500">
                  <FiClock className="h-4 w-4" />
                  Time
                </span>
                <span className="font-medium text-gray-800">
                  {selectedSlot ? selectedSlot.time.toLowerCase() : "Not selected"}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-teal-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-teal-900">Consultation Fee</span>
                <span className="text-xl font-bold text-teal-900">
                  {currencySymbol}
                  {doctor.fees}
                </span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading || !selectedTime || !doctor.available}
              className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
                doctor.available
                  ? loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-primary hover:bg-teal-600"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <FiCheckCircle className="h-4 w-4" />
                  {doctor.available ? "Confirm Appointment" : "Doctor not available for booking"}
                </>
              )}
            </button>

            {!selectedTime && (
              <p className="mt-3 text-center text-xs text-gray-500">
                Select date and time to continue.
              </p>
            )}
          </div>
        </aside>
      </section>

      <RelatedDoctors currentDocId={docId} speciality={doctor.speciality} />
    </div>
  );
};

export default Appointment;
