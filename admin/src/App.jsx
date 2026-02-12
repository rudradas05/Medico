import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";

import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import AddService from "./pages/Admin/AddService";
import ServicesList from "./pages/Admin/ServicesList";
import ServiceBookings from "./pages/Admin/ServiceBookings";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import Sidebar from "./components/Sidebar";
const App = () => {
  const { admintoken } = useContext(AdminContext);
  const { doctortoken } = useContext(DoctorContext);
  return admintoken || doctortoken ? (
    <div className="admin-shell">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        pauseOnHover={false}
        newestOnTop
        closeOnClick
        theme="colored"
      />
      <Navbar />
      <div className="mx-auto flex w-full max-w-[1680px] items-start">
        <Sidebar />
        <main className="min-h-[calc(100vh-80px)] flex-1 px-3 pb-8 pt-6 sm:px-6 lg:px-8">
          <Routes>
            {/* Admin route */}
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
            <Route path="/add-service" element={<AddService />} />
            <Route path="/services-list" element={<ServicesList />} />
            <Route path="/service-bookings" element={<ServiceBookings />} />
            {/* Doctor routes */}
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointments />}
            />
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        pauseOnHover={false}
        newestOnTop
        closeOnClick
        theme="colored"
      />
    </>
  );
};

export default App;
