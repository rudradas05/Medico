import React from "react";
import { FaCheck } from "react-icons/fa";

const BookConsultation = () => {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-teal-700 py-16 px-6 md:px-12 lg:px-16">
      <h2 className="text-3xl sm:text-4xl font-semibold text-center text-white mb-8 animate-fadeIn">
        How to Book an Online Doctor Consultation
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {[
          "Choose Doctor's Specialisation",
          "Check Doctor’s Availability",
          "Select Date & Time Slot",
          "Book an Appointment",
        ].map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 animate-fadeInUp"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-teal-500 text-white rounded-full shadow-md">
              <span className="text-2xl font-semibold">{index + 1}</span>
            </div>
            <p className="text-lg font-medium text-teal-700 text-center">
              {step}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-teal-100 p-8 rounded-lg shadow-md mb-12 animate-fadeIn">
        <h3 className="text-2xl font-semibold text-teal-700 mb-6">
          How to Get the Best Out of Your Doctor Video Consultation Session
        </h3>
        <ul className="list-none space-y-4">
          {[
            "Make a list of questions and concerns you want to highlight.",
            "Tell your doctor your symptoms clearly and honestly.",
            "Keep your medical history, such as test reports or prescriptions, handy.",
            "Make sure there is no noise disturbance before connecting.",
            "It may be helpful to have someone with you in case you miss any information.",
          ].map((tip, index) => (
            <li key={index} className="flex items-start space-x-3">
              <FaCheck className="text-teal-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BookConsultation;
