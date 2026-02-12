import React from "react";
import { FiCheckCircle, FiClock, FiShield, FiUsers } from "react-icons/fi";

const features = [
  {
    title: "Consult Experts Anytime",
    description:
      "Connect with verified specialists quickly and choose doctors based on your needs.",
    Icon: FiUsers,
  },
  {
    title: "Fast and Convenient",
    description:
      "Book instantly or schedule in advance with flexible and patient-friendly slots.",
    Icon: FiClock,
  },
  {
    title: "Private and Secure",
    description:
      "Your consultations and health details stay protected with secure workflows.",
    Icon: FiShield,
  },
  {
    title: "High Quality Guidance",
    description:
      "Receive personalized advice and practical next steps from qualified doctors.",
    Icon: FiCheckCircle,
  },
];

const Feature = () => {
  return (
    <section className="mt-10 rounded-3xl bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-teal-50">
            Telehealth Benefits
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Advantages of Modern Telehealth
          </h2>
          <p className="mt-3 text-sm text-teal-50 sm:text-base">
            Experience reliable healthcare access with minimal waiting and
            strong continuity of care.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="premium-glass rounded-2xl p-5"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white">
                <feature.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-teal-50">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
