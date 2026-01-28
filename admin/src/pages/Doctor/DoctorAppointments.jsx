import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { BiXCircle, BiCheckCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";

const DoctorAppointments = () => {
  const {
    doctortoken,
    appointments,
    getDoctorAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, formatAppointmentDate, currencySymbol } =
    useContext(AppContext);
  const [loadingAction, setLoadingAction] = useState(null);

  useEffect(() => {
    if (doctortoken) {
      getDoctorAppointments();
    }
  }, [doctortoken]);

  const handleAction = async (action, id) => {
    setLoadingAction(id);
    try {
      if (action === "complete") {
        await completeAppointment(id);
      } else {
        await cancelAppointment(id);
      }
      getDoctorAppointments();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-3 border-b font-semibold">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {[...appointments].reverse().map((item, index) => (
          <div
            key={item.id || index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-3 border-b items-center"
          >
            <p>{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt="Patient"
                className="w-8 h-8 rounded-full border"
                onError={(e) => (e.target.src = "/default_profile.png")}
              />
              <p>{item.userData.name}</p>
            </div>
            <p>{item.payment ? "Online" : "Cash"}</p>
            <p>
              {item.userData?.dob
                ? calculateAge?.(item.userData.dob) || "N/A"
                : "N/A"}
            </p>
            <p>
              {formatAppointmentDate(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currencySymbol}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-500">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500">Completed</p>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction("cancel", item._id)}
                  className="text-red-500 text-2xl cursor-pointer hover:text-red-700 disabled:opacity-50"
                  title="Cancel Appointment"
                  disabled={loadingAction === item._id}
                >
                  {loadingAction === item._id ? (
                    <ImSpinner2 className="animate-spin" />
                  ) : (
                    <BiXCircle />
                  )}
                </button>
                <button
                  onClick={() => handleAction("complete", item._id)}
                  className="text-green-500 text-2xl cursor-pointer hover:text-green-700 disabled:opacity-50"
                  title="Complete Appointment"
                  disabled={loadingAction === item._id}
                >
                  {loadingAction === item._id ? (
                    <ImSpinner2 className="animate-spin" />
                  ) : (
                    <BiCheckCircle />
                  )}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
