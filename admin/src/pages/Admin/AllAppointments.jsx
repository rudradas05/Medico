import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const {
    appointments,
    getAllAppointments,
    admintoken,
    cancelAppointment,
    cancelingId,
    setCancelingId,
  } = useContext(AdminContext);
  const { calculateAge, formatAppointmentDate, currencySymbol } =
    useContext(AppContext);

  useEffect(() => {
    if (admintoken) {
      getAllAppointments();
    }
  }, [admintoken]);

  return (
    <div className="w-full">
      <p className="mb-4 text-lg font-semibold text-slate-800">Appointments</p>
      <div className="admin-card max-h-[80vh] min-h-[60vh] overflow-y-scroll rounded-2xl text-sm">
        {/* Table Header */}
        <div className="hidden grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] border-b border-teal-100 bg-teal-50/70 px-6 py-3 font-semibold text-slate-700 sm:grid">
          <p>#</p>
          <p>Patient Name</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor Name</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Table Body */}
        {appointments?.length > 0 ? (
          appointments.map((appointment, index) => (
            <div
              key={appointment._id || index}
              className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center border-b border-slate-100 px-6 py-3 text-gray-500 hover:bg-teal-50/40"
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={appointment.userData?.image || "/default-avatar.png"}
                  alt="User"
                  className="h-8 w-8 rounded-full object-cover ring-1 ring-teal-100"
                />
                <p>{appointment.userData?.name || "Unknown"}</p>
              </div>
              <p className="max-sm:hidden">
                {appointment.userData?.dob
                  ? calculateAge?.(appointment.userData.dob) || "N/A"
                  : "N/A"}
              </p>
              <p>
                {formatAppointmentDate
                  ? formatAppointmentDate(appointment.slotDate)
                  : appointment.slotDate}
                , {appointment.slotTime}
              </p>
              <div className="flex items-center gap-2">
                <img
                  className="w-8 rounded-full ring-1 ring-teal-100"
                  src={appointment.docData?.image || "/default-doctor.png"}
                  alt="Doctor"
                />
                <p>{appointment.docData?.name || "Unknown"}</p>
              </div>
              <p>
                {currencySymbol || "$"}
                {appointment.amount?.toFixed(2) || "0.00"}
              </p>
              {appointment.cancelled ? (
                <p className="text-red-500 font-semibold">Cancelled</p>
              ) : appointment.isCompleted ? (
                <p className="text-green-500 font-semibold">Completed</p>
              ) : (
                <button
                  className="w-full rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:opacity-50 sm:w-full"
                  onClick={() => cancelAppointment(appointment._id)}
                  disabled={
                    cancelingId === appointment._id || appointment.cancelled
                  }
                >
                  {appointment.cancelled
                    ? "Cancelled"
                    : cancelingId === appointment._id
                    ? "Canceling..."
                    : "Cancel"}
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">No appointments found</p>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
