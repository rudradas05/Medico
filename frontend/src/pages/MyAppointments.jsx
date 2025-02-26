import React, { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const MyAppointments = () => {
  const { backendurl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [payingId, setPayingId] = useState(null);

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
          (a, b) => new Date(b.slotDate) - new Date(a.slotDate)
        );
        setAppointments(sortedAppointments);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      toast.error(
        "Appointment fetch error:",
        error.response?.status,
        error.message
      );
      toast.error(
        `Failed to load appointments: ${
          error.response?.data?.message || "Something went wrong!"
        }`
      );

      if (error.response?.status === 401) {
        logout();
        setAppointments([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [backendurl, token]);

  const isExpired = (slotDate, slotTime) => {
    const appointmentDateTime = new Date(`${slotDate} ${slotTime}`);
    return appointmentDateTime < new Date();
  };

  const handleCancelAppointment = async (appointmentId) => {
    setCancelingId(appointmentId);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        setAppointments((prev) =>
          prev.filter((app) => app._id !== appointmentId)
        );
        toast.success("Appointment canceled successfully");
        fetchAppointments();
        getDoctorsData();
      }
    } catch (error) {
      toast.error(
        `Cancel failed: ${
          error.response?.data?.message || "Failed to cancel appointment."
        }`
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
        { headers: { token } }
      );

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setPayingId(null);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No appointments found
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
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
                    onError={(e) => (e.target.src = "/default-doctor.jpg")}
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {appointment.docData.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
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
                    <button className="w-full sm:w-full px-4 py-2 bg-teal-600 text-white rounded-md cursor-not-allowed">
                      Appointment Completed
                    </button>
                  ) : isExpired(appointment.slotDate, appointment.slotTime) ? (
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
                          className="w-full sm:w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                          onClick={() => appoinmentStripepay(appointment._id)}
                          disabled={payingId === appointment._id}
                        >
                          {payingId === appointment._id
                            ? "Processing"
                            : "Pay Online"}
                        </button>
                      )}

                      <button
                        className="w-full sm:w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                        onClick={() => handleCancelAppointment(appointment._id)}
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
    </div>
  );
};

export default MyAppointments;
