import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 py-20 px-6 md:px-16 lg:px-24 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-teal-500/50"></div>

      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        <motion.div
          className="md:w-1/2 text-center md:text-left space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-poppins">
            Book Your Appointment with Trusted Doctors
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-100">
            Access a wide range of healthcare specialists, book appointments
            effortlessly, and take control of your health.
          </p>
          <NavLink
            to="/doctors"
            aria-label="Book an appointment with a doctor"
            className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white py-3 px-8 rounded-lg shadow-md text-lg font-semibold transform transition-all duration-300 ease-in-out hover:scale-105 group"
          >
            Book Appointment
            {assets.arrow_icon && (
              <motion.img
                className="w-4 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                src={assets.arrow_icon}
                alt="Arrow Icon"
                whileHover={{ x: 5 }}
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </NavLink>
        </motion.div>

        <motion.div
          className="md:w-1/2 mt-12 md:mt-0 relative group"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {assets.header_img ? (
            <motion.img
              className="w-full h-auto rounded-lg  object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              src={assets.header_img}
              alt="Healthcare Illustration"
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-700">Image Not Available</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
