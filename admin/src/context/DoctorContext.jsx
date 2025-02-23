import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { data } from "react-router-dom";
import { toast } from "react-toastify";

export const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [doctortoken, setDoctortoken] = useState(
    localStorage.getItem("doctortoken")
      ? localStorage.getItem("doctortoken")
      : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [cancelingId, setCancelingId] = useState(null);
  const [doctorData, setDoctorData] = useState(false);

  const getDoctorAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/api/doctor/appointments`,
        {
          headers: { doctortoken },
        }
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { doctortoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    setCancelingId(appointmentId);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { doctortoken } }
      );
      if (data.success) {
        setAppointments((prev) =>
          prev.map((app) =>
            app._id === appointmentId ? { ...app, cancelled: true } : app
          )
        );
        toast.success("Appointment canceled successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    } finally {
      setCancelingId(null);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/doctor/dashboard`, {
        headers: { doctortoken },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  };

  const loadDoctorData = async () => {
    try {
      const { data } = await axios.get(
        backendurl + "/api/doctor/get-doctor-data",
        {
          headers: {
            doctortoken,
          },
        }
      );
      if (data.success) {
        setDoctorData(data.doctorData);
        console.log(data.doctorData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const value = {
    doctortoken,
    setDoctortoken,
    backendurl,
    appointments,
    setAppointments,
    getDoctorAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
    cancelingId,
    setCancelingId,
    loadDoctorData,
    doctorData,
    setDoctorData,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
