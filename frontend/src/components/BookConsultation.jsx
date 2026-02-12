import React from "react";
import { FiCheck, FiClock, FiFileText, FiUserCheck } from "react-icons/fi";

const steps = [
  {
    title: "Choose Speciality",
    description: "Select the doctor category that best matches your concern.",
    Icon: FiUserCheck,
  },
  {
    title: "Check Availability",
    description: "View doctor schedule and pick a convenient day.",
    Icon: FiClock,
  },
  {
    title: "Select Time Slot",
    description: "Reserve your preferred consultation time instantly.",
    Icon: FiFileText,
  },
  {
    title: "Confirm Booking",
    description: "Finalize details and receive appointment confirmation.",
    Icon: FiCheck,
  },
];

const tips = [
  "Prepare your key symptoms and questions before the session.",
  "Keep reports, prescriptions, and previous records nearby.",
  "Choose a quiet environment for better communication.",
  "Be clear and honest while describing your condition.",
  "Take notes during consultation for follow-up steps.",
];

const BookConsultation = () => {
  return (
    <section className="mt-10 rounded-3xl bg-gradient-to-br from-teal-50 via-white to-emerald-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-teal-700">
            Consultation Flow
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            How to Book an Online Consultation
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="premium-panel rounded-2xl p-5 transition hover:-translate-y-1"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                <step.Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-teal-600">
                Step {index + 1}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="premium-panel mt-8 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Get Better Value From Every Online Visit
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <FiCheck className="h-3.5 w-3.5" />
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BookConsultation;
