import React, { useContext, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import VerifyPayment from "./pages/VerifyPayment";

const ProtectedRoute = ({ children }) => {
  const { isLoggedin } = useContext(AppContext);
  const hasNotifiedRef = useRef(false);

  if (!isLoggedin) {
    if (!hasNotifiedRef.current) {
      toast.info("Please sign in to continue.");
      hasNotifiedRef.current = true;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50/80">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        pauseOnHover={false}
        newestOnTop
        closeOnClick
        theme="colored"
      />

      <main className="mx-4 sm:mx-[5%]">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route
            path="/my-appointments"
            element={
              <ProtectedRoute>
                <MyAppointments />
              </ProtectedRoute>
            }
          />
          <Route path="/appointment/:docId" element={<Appointments />} />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-payment" element={<VerifyPayment />} />
        </Routes>

        <Footer />
      </main>
    </div>
  );
};

export default App;
