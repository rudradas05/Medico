import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { admintoken, setAdmintoken } = useContext(AdminContext);
  const { setDoctortoken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    try {
      setAdmintoken("");
      setDoctortoken("");
      localStorage.removeItem("admintoken");
      localStorage.removeItem("doctortoken");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 sm:px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-500 shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={assets.logo}
          className="w-32 sm:w-40 cursor-pointer"
          alt="Admin Dashboard Logo"
        />
        <span className="bg-white text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm">
          {admintoken ? "Admin" : "Doctor"}
        </span>
      </div>

      <button
        onClick={logout}
        className="bg-white text-indigo-600 text-sm font-semibold px-6 sm:px-8 py-2 rounded-full shadow-md transition-all duration-300 hover:bg-indigo-100 hover:scale-105"
        aria-label="Logout"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
