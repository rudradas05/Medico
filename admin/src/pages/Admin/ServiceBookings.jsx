import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const ServiceBookings = () => {
  const { backendurl, admintoken } = useContext(AdminContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/api/services/admin/bookings`,
        { headers: { admintoken } },
      );
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      toast.error("Could not load bookings");
    } finally {
      setLoading(false);
    }
  };

  const completeBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/services/admin/complete-booking`,
        { bookingId },
        { headers: { admintoken } },
      );
      if (data.success) {
        toast.success("Booking marked as completed");
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/services/admin/cancel-booking`,
        { bookingId },
        { headers: { admintoken } },
      );
      if (data.success) {
        toast.success("Booking cancelled");
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] w-full">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="m-5 w-full max-w-5xl">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Service Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl p-5 shadow-sm border"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-800">
                      {booking.serviceName}
                    </h3>
                    {booking.cancelled ? (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
                        Cancelled
                      </span>
                    ) : booking.isCompleted ? (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                        Completed
                      </span>
                    ) : booking.payment ? (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
                        Paid
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700">
                        Pending
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Patient:</span>{" "}
                      {booking.userData?.name || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      {booking.userData?.email || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span>{" "}
                      {booking.slotDate}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span>{" "}
                      {booking.slotTime}
                    </div>
                    <div>
                      <span className="font-medium">Amount:</span> ₹
                      {booking.amount}
                    </div>
                    <div>
                      <span className="font-medium">Payment:</span>{" "}
                      <span className="capitalize">
                        {booking.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {!booking.cancelled && !booking.isCompleted && (
                  <div className="flex gap-2 flex-shrink-0 sm:flex-col">
                    <button
                      onClick={() => completeBooking(booking._id)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 transition"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceBookings;
