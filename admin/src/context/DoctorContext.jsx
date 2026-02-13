import axios from "axios";
import { createContext, useEffect, useState } from "react";
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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "We couldn't load your appointments right now."
      );
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
      toast.error(
        error.response?.data?.message ||
          "We couldn't update the appointment. Please try again."
      );
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
      toast.error(
        error.response?.data?.message ||
          "We couldn't cancel this appointment. Please try again."
      );
    } finally {
      setCancelingId(null);
    }
  };

  const savePrescription = async ({ appointmentId, diagnosis, notes, medicines }) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctor/add-prescription`,
        { appointmentId, diagnosis, notes, medicines },
        { headers: { doctortoken } }
      );

      if (data.success) {
        toast.success(data.message || "Prescription saved.");
        await getDoctorAppointments();
        return { success: true };
      }

      toast.error(data.message || "Could not save prescription.");
      return { success: false };
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "We couldn't save this prescription. Please try again."
      );
      return { success: false };
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/doctor/dashboard`, {
        headers: { doctortoken },
      });
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "We couldn't load the dashboard. Please try again."
      );
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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
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
    savePrescription,
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
