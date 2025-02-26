import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import { format, addDays, setHours, setMinutes, addMinutes } from "date-fns";

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
      let endTime = setHours(setMinutes(date, 0), SLOT_CONFIG.END_HOUR);

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
      let isTodayAvailable = true;
      for (let i = 0; i < 7; i++) {
        const date = addDays(today, i);
        let dailySlots = generateSlotsForDate(date);

        if (i === 0) {
          const now = new Date();

          if (now.getHours() >= 21) {
            setTodayMessage("Today there are no available slots.");
            isTodayAvailable = false;
          } else {
            dailySlots = dailySlots.filter((slot) => {
              const slotTime = new Date(`${slot.isoDate} ${slot.time}`);
              return slotTime > now;
            });

            if (dailySlots.length === 0) {
              setTodayMessage("No available slots remaining for today.");
              isTodayAvailable = false;
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
      toast.info("Please login to book an appointment");
      return navigate("/login");
    }

    if (selectedDayIndex === -1 || !selectedTime) {
      toast.error("Please select a time slot");
      return;
    }

    const selectedSlot = availableSlots[selectedDayIndex].find(
      (slot) => slot.time === selectedTime
    );

    if (!selectedSlot) {
      toast.error("This slot is already booked. Please choose another.");
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
        toast.success("Appointment booked successfully!");
        await getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!doctors.length) return;

    if (!currentDoctor) {
      toast.error("Doctor not found");
      navigate("/doctors");
    } else if (!doctor) {
      setDoctor(currentDoctor);
    }
  }, [currentDoctor, navigate, doctors.length]);

  if (!doctor)
    return <div className="text-center py-8">Loading doctor details...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Doctor Profile Section */}
      <section className="flex flex-col md:flex-row gap-8 mb-12">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full md:w-1/3 rounded-xl shadow-lg object-cover"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{doctor.name}</h1>
          <p className="text-lg text-gray-600">
            {doctor.degree} - {doctor.speciality}
          </p>
          <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
          <p className="text-xl font-semibold text-primary">
            {currencySymbol}
            {doctor.fees} consultation fee
          </p>
        </div>
      </section>

      {/* Booking Interface */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Select Appointment Time
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {availableSlots.length > 0 &&
            availableSlots.map((daySlots, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedDayIndex(index);
                  setSelectedTime("");
                }}
                className={`min-w-[120px] p-4 rounded-lg text-center transition-all ${
                  selectedDayIndex === index
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {daySlots.length > 0 ? (
                  <>
                    <p className="font-medium">
                      {format(new Date(daySlots[0].isoDate), "EEE")}
                    </p>
                    <p className="text-lg">
                      {format(new Date(daySlots[0].isoDate), "dd")}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500">No Slots</p>
                )}
              </button>
            ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
          {selectedDayIndex !== -1 &&
          availableSlots[selectedDayIndex]?.length > 0 ? (
            availableSlots[selectedDayIndex].map((slot, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(slot.time)}
                className={`p-3 rounded-md text-sm font-medium transition-all ${
                  selectedTime === slot.time
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-green-100"
                }`}
              >
                {slot.time.toLowerCase()}
              </button>
            ))
          ) : selectedDayIndex === -1 ? (
            <p className="text-gray-500 col-span-full text-center">
              Please select a date to view available slots
            </p>
          ) : selectedDayIndex === 0 && todayMessage ? (
            <p className="text-gray-500 col-span-full text-center">
              {todayMessage}
            </p>
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No available slots
            </p>
          )}
        </div>

        {/* Booking Action */}
        <button
          onClick={handleBooking}
          disabled={loading || !selectedTime}
          className={`mt-8 w-full py-3 rounded-lg font-semibold text-white transition-all ${
            loading ? "bg-gray-400" : "bg-primary hover:bg-primary-dark"
          }`}
        >
          {loading ? "Processing..." : "Confirm Appointment"}
        </button>
      </section>

      {/* Related Doctors */}
      <RelatedDoctors currentDocId={docId} speciality={doctor.speciality} />
    </div>
  );
};

export default Appointment;
