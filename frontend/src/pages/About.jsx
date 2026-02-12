import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { assets } from "../assets/assets";

const highlights = [
  {
    title: "Efficient",
    description: "Book consultations faster with clear scheduling workflows.",
  },
  {
    title: "Convenient",
    description: "Access verified specialists from anywhere in minutes.",
  },
  {
    title: "Personalized",
    description: "Get care suggestions tailored to your profile and history.",
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-10 pt-4">
      <section className="rounded-3xl bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-500 px-6 py-12 text-white shadow-[0_18px_40px_rgba(20,184,166,0.24)] sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-teal-50">
            About Medico
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Simple, Trustworthy Digital Healthcare
          </h1>
          <p className="mt-3 text-sm text-teal-50 sm:text-base">
            Medico connects patients with trusted doctors and diagnostics through
            a calm, reliable, and easy-to-use care platform.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="premium-panel rounded-2xl p-5 sm:p-6">
          <img
            src={assets.about_image}
            alt="Medical professionals discussing patient care"
            className="h-full w-full rounded-xl object-cover"
          />
        </article>

        <article className="premium-panel rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900">Who We Are</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            We built Medico to reduce friction in healthcare access. From finding
            the right specialist to booking follow-up visits, our goal is to keep
            every step transparent and patient-first.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-gray-900">Our Vision</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
            Deliver consistent, dependable digital care experiences that help
            patients and doctors stay connected effortlessly.
          </p>

          <div className="mt-5 space-y-2">
            {["Verified doctors", "Clear appointment flow", "Secure care journeys"].map(
              (item) => (
                <p key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <FiCheckCircle className="h-4 w-4 text-teal-600" />
                  {item}
                </p>
              ),
            )}
          </div>
        </article>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="premium-panel rounded-2xl p-5">
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-500 px-6 py-8 text-white">
        <h2 className="text-2xl font-semibold">Ready to start your care journey?</h2>
        <p className="mt-2 text-sm text-teal-50 sm:text-base">
          Explore doctors and book appointments in a simple, reliable flow.
        </p>
        <button
          onClick={() => {
            navigate("/doctors");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
        >
          Explore Doctors
          <FiArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};

export default About;
