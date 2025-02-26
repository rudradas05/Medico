import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();
const AdminContextProvider = (props) => {
  const [admintoken, setAdmintoken] = useState(
    localStorage.getItem("admintoken") ? localStorage.getItem("admintoken") : ""
  );

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [cancelingId, setCancelingId] = useState(null);
  const [dashData, setDashData] = useState(false);

  const backendurl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/all-doctors`,
        {},
        { headers: { admintoken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId, currentAvailability) => {
    try {
      const updatedDoctors = doctors.map((doctor) =>
        doctor._id === docId
          ? { ...doctor, available: !currentAvailability }
          : doctor
      );

      const response = await axios.post(
        `${backendurl}/api/admin/change-availability`,
        {
          docId,
        },
        { headers: { admintoken } }
      );

      if (response.data.success) {
        getAllDoctors(updatedDoctors).then(() => {
          toast.success("Availability updated successfully");
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/admin/appointments`, {
        headers: { admintoken },
      });
      if (data.success) {
        // Sorting appointments by date (Newest First)
        const sortedAppointments = data.appointments.sort(
          (a, b) => new Date(b.slotDate) - new Date(a.slotDate)
        );

        setAppointments(sortedAppointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    setCancelingId(appointmentId);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/cancel-appointment`,
        { appointmentId },
        { headers: { admintoken } }
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
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setCancelingId(null);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/admin/dashboard`, {
        headers: { admintoken },
      });
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    admintoken,
    setAdmintoken,
    backendurl,
    doctors,
    setDoctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    getDashData,
    dashData,
    cancelingId,
    setCancelingId,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
