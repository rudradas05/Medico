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
    <div className="w-full max-w-8xl m-5">
      <p className="mb-3 text-lg font-medium">Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] px-6 py-3 border-b bg-gray-100 font-semibold">
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
              className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] px-6 py-3 border-b items-center text-gray-500 hover:bg-gray-50"
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={appointment.userData?.image || "/default-avatar.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
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
                  className="w-8 rounded-full"
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
                  className="w-full sm:w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
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
