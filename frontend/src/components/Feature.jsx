import React from "react";
import { FaCheck } from "react-icons/fa";

const Feature = () => {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-teal-700 py-16 px-6 sm:px-10 md:px-12 rounded-lg my-12">
      <div className="text-center text-white mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Advantages of Telehealth
        </h1>
        <p className="text-lg sm:text-xl mt-4 max-w-3xl mx-auto">
          Experience the convenience and reliability of telehealth services from
          the comfort of your home. Here are some benefits that make telehealth
          the ideal solution for modern healthcare.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-start transition-transform transform hover:scale-105 hover:shadow-2xl animate-fadeInUp">
          <div className="w-12 h-12 bg-teal-500 text-white flex items-center justify-center rounded-full mb-4">
            <FaCheck className="text-2xl" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-teal-700 mb-3">
            Consult Leading Experts Anytime
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Connect instantly with a 24x7 specialist or choose to consult with a
            particular doctor based on your needs.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-start transition-transform transform hover:scale-105 hover:shadow-2xl animate-fadeInUp delay-100">
          <div className="w-12 h-12 bg-teal-500 text-white flex items-center justify-center rounded-full mb-4">
            <FaCheck className="text-2xl" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-teal-700 mb-3">
            Convenient and Easy
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Start an instant consultation within 2 minutes or schedule a
            consultation at your convenience.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-start transition-transform transform hover:scale-105 hover:shadow-2xl animate-fadeInUp delay-200">
          <div className="w-12 h-12 bg-teal-500 text-white flex items-center justify-center rounded-full mb-4">
            <FaCheck className="text-2xl" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-teal-700 mb-3">
            100% Safe Consultations
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Rest assured that your consultation will be completely private and
            secure, maintaining your confidentiality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Feature;
