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
    <nav className="sticky top-0 z-40 border-b border-teal-100/90 bg-white/95 px-4 py-4 backdrop-blur sm:px-8">
      <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between gap-4">
        <img
          src={assets.logo}
          className="w-32 cursor-pointer rounded-xl border border-slate-900/10 bg-slate-900/90 px-3 py-2 sm:w-40"
          alt="Admin Dashboard Logo"
        />
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-teal-100 bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-700">
            {admintoken ? "Admin" : "Doctor"}
          </span>

          <button
            onClick={logout}
            className="rounded-full border border-teal-100 bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
