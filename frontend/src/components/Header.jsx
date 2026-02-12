import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FiActivity, FiArrowRight, FiShield } from "react-icons/fi";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <section className="relative mt-4 overflow-hidden rounded-[30px] bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-500 px-6 py-10 text-white shadow-[0_22px_50px_rgba(20,184,166,0.28)] sm:px-8 lg:px-12 lg:py-14">
      <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-emerald-300/20 blur-2xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[52%]"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-teal-50">
            <FiShield className="h-3.5 w-3.5" />
            Premium Healthcare Access
          </p>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Book Expert Doctors With
            <span className="block text-teal-100">Confidence and Speed</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-teal-50 sm:text-base">
            Connect with verified specialists, choose the most convenient slots,
            and manage your care journey from one elegant dashboard.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <NavLink
              to="/doctors"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-teal-800 shadow-md transition hover:bg-teal-50"
            >
              Book Appointment
              <FiArrowRight className="h-4 w-4" />
            </NavLink>
            <NavLink
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/45 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Explore Services
              <FiActivity className="h-4 w-4" />
            </NavLink>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="premium-glass rounded-xl p-3">
              <p className="text-[11px] uppercase tracking-wide text-teal-100">Doctors</p>
              <p className="mt-1 text-xl font-bold">100+</p>
            </div>
            <div className="premium-glass rounded-xl p-3">
              <p className="text-[11px] uppercase tracking-wide text-teal-100">Specialities</p>
              <p className="mt-1 text-xl font-bold">25+</p>
            </div>
            <div className="premium-glass rounded-xl p-3">
              <p className="text-[11px] uppercase tracking-wide text-teal-100">Support</p>
              <p className="mt-1 text-xl font-bold">24x7</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-3 shadow-2xl lg:w-[48%]"
        >
          <div className="absolute -top-8 right-4 h-24 w-24 rounded-full bg-white/30 blur-2xl" />
          <img
            className="h-full w-full rounded-xl object-cover"
            src={assets.header_img}
            alt="Healthcare Illustration"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Header;
