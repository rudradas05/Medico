import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const ServiceBookings = () => {
  const { backendurl, admintoken } = useContext(AdminContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingReportId, setUploadingReportId] = useState(null);
  const [openingReportId, setOpeningReportId] = useState(null);

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

  const uploadReport = async (bookingId, file) => {
    if (!file) return;

    setUploadingReportId(bookingId);

    try {
      const formData = new FormData();
      formData.append("bookingId", bookingId);
      formData.append("report", file);

      const { data } = await axios.post(
        `${backendurl}/api/services/admin/upload-report`,
        formData,
        { headers: { admintoken } },
      );

      if (data.success) {
        toast.success("Lab report uploaded successfully");
        fetchBookings();
      } else {
        toast.error(data.message || "Could not upload report");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not upload the report file",
      );
    } finally {
      setUploadingReportId(null);
    }
  };

  const openReport = async (bookingId) => {
    if (!bookingId) return;

    setOpeningReportId(bookingId);

    try {
      const { data } = await axios.post(
        `${backendurl}/api/services/admin/report-url`,
        { bookingId },
        { headers: { admintoken } },
      );

      if (!data.success || !data.reportUrl) {
        toast.error(data.message || "Could not open report");
        return;
      }

      // window.open(data.reportUrl, "_blank", "noopener,noreferrer");
      const tab = window.open("about:blank", "_blank", "noopener,noreferrer");
      if (!tab) {
        toast.error("Popup blocked. Please allow popups.");
        return;
      }

      tab.location.href = `${backendurl}/api/services/report-file/${bookingId}?admintoken=${encodeURIComponent(admintoken)}`;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not fetch report file",
      );
    } finally {
      setOpeningReportId(null);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] w-full">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl">
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Service Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="admin-card rounded-2xl p-5">
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
                      <span className="px-2 py-0.5 rounded-full text-xs bg-teal-100 text-teal-700">
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
                      <span className="font-medium">Amount:</span> INR{" "}
                      {booking.amount}
                    </div>
                    <div>
                      <span className="font-medium">Payment:</span>{" "}
                      <span className="capitalize">
                        {booking.paymentMethod}
                      </span>
                    </div>
                    {booking.labReportUrl || booking.labReportPublicId ? (
                      <div className="col-span-2 sm:col-span-4">
                        <span className="font-medium">Lab Report:</span>{" "}
                        <button
                          type="button"
                          onClick={() => openReport(booking._id)}
                          disabled={openingReportId === booking._id}
                          className="text-primary hover:underline disabled:opacity-50"
                        >
                          {openingReportId === booking._id
                            ? "Opening..."
                            : booking.labReportName || "View uploaded report"}
                        </button>
                      </div>
                    ) : booking.isCompleted ? (
                      <div className="col-span-2 sm:col-span-4 text-amber-700">
                        <span className="font-medium">Lab Report:</span> Not
                        uploaded yet
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Actions */}
                {!booking.cancelled && !booking.isCompleted && (
                  <div className="flex gap-2 flex-shrink-0 sm:flex-col">
                    <button
                      onClick={() => completeBooking(booking._id)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition"
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

                {!booking.cancelled && booking.isCompleted && (
                  <div className="flex gap-2 flex-shrink-0 sm:flex-col">
                    <input
                      id={`lab-report-${booking._id}`}
                      type="file"
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg,.webp"
                      onChange={(event) =>
                        uploadReport(booking._id, event.target.files?.[0])
                      }
                    />
                    <label
                      htmlFor={`lab-report-${booking._id}`}
                      className={`cursor-pointer rounded-md px-3 py-1.5 text-center text-xs font-medium transition ${
                        uploadingReportId === booking._id
                          ? "bg-gray-100 text-gray-500"
                          : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                      }`}
                    >
                      {uploadingReportId === booking._id
                        ? "Uploading..."
                        : booking.labReportUrl || booking.labReportPublicId
                          ? "Replace Report"
                          : "Upload Report"}
                    </label>
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
