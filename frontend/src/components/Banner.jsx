import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiShield } from "react-icons/fi";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Banner = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useContext(AppContext);

  return (
    <section className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 px-6 py-10 text-white shadow-[0_18px_44px_rgba(20,184,166,0.24)] sm:px-8 lg:px-12">
      <div className="absolute -left-8 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-14 right-0 h-52 w-52 rounded-full bg-emerald-300/20 blur-2xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center">
        <div className="lg:w-2/3">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal-50">
            <FiShield className="h-3.5 w-3.5" />
            Seamless Appointment Flow
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Book Your Appointment with Trusted Doctors
          </h2>

          <p className="mt-3 max-w-2xl text-sm text-teal-50 sm:text-base">
            Access verified profiles, compare expertise, and secure your slot in
            less than a minute.
          </p>

          <button
            onClick={() => navigate(isLoggedin ? "/doctors" : "/login")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
          >
            {isLoggedin ? "Book Appointment" : "Create Account"}
            <FiArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="premium-glass lg:w-1/3 rounded-2xl p-3">
          <img
            className="h-full w-full rounded-xl object-cover"
            src={assets.appointment_img}
            alt="Doctor Appointment"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
