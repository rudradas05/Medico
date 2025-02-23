import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointments = () => {
  const {
    doctortoken,
    setDoctortoken,
    appointments,
    setAppointments,
    getDoctorAppointments,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (doctortoken) {
      getDoctorAppointments();
    }
  }, [doctortoken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-3 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
