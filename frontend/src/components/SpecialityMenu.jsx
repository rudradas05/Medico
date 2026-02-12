import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { specialityData } from "../assets/assets";

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="mt-10 rounded-3xl bg-gradient-to-br from-teal-50 via-white to-emerald-50 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-teal-700">
            Browse Expertise
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Find by Medical Speciality
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            Choose from {specialityData.length}+ medical specialities and connect
            with experienced doctors quickly.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {specialityData.map((item) => (
            <Link
              key={item.speciality}
              to={`/doctors/${item.speciality}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="premium-panel group relative overflow-hidden rounded-2xl p-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 transition group-hover:bg-teal-100">
                <img
                  className="h-10 w-10 object-contain"
                  src={item.image}
                  alt={item.speciality}
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-center text-xs font-semibold text-gray-700 sm:text-sm">
                {item.speciality}
              </p>

              <FiArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-teal-300 opacity-0 transition group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;
