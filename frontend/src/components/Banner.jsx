import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Banner = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useContext(AppContext);

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600 rounded-2xl px-8 py-16 md:px-12 my-16 shadow-2xl transform hover:scale-101 transition-transform duration-300 ease-in-out">
      <div className="flex-1 text-center lg:text-left space-y-6 lg:pr-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fadeIn">
          Book Your Appointment <br />
          with Trusted Doctors
        </h1>

        <p className="text-lg sm:text-xl text-gray-100 animate-fadeIn delay-100">
          Browse through our list of 100+ verified doctors and book your
          appointment hassle-free.
        </p>

        <button
          onClick={() => navigate(isLoggedin ? "/doctors" : "/login")}
          className="bg-white text-sm sm:text-base text-gray-800 font-semibold px-8 py-3 rounded-full mt-6 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 animate-fadeIn delay-200"
        >
          {isLoggedin ? "Book Appointment" : "Create Account"}
        </button>
      </div>

      <div className="mt-12 lg:mt-0 lg:w-1/3 relative flex justify-center lg:justify-end animate-fadeInRight">
        <img
          className="w-full max-w-md lg:max-w-lg object-cover rounded-xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-300 ease-in-out"
          src={assets.appointment_img}
          alt="Doctor Appointment"
        />
      </div>
    </div>
  );
};

export default Banner;
