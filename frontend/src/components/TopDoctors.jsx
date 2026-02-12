import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { resolveImageUrl } from "../utils/imageUrl";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors, backendurl } = useContext(AppContext);

  return (
    <section className="mt-10 rounded-3xl bg-gradient-to-br from-white via-teal-50 to-emerald-100/60 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-teal-700">
              Featured Team
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Leading Medical Experts
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
              Meet trusted specialists ready to support your health journey.
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/doctors");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-white px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
          >
            View All Doctors
            <FiArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors
            .filter((doc) => doc.available)
            .slice(0, 8)
            .map((doctor) => (
              <article
                key={doctor._id}
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                className="premium-panel group cursor-pointer overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 p-3">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-white/70">
                    <img
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      src={resolveImageUrl(doctor.image, backendurl)}
                      alt={doctor.name}
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide">
                    {doctor.available ? (
                      <>
                        <FiCheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Available</span>
                      </>
                    ) : (
                      <>
                        <FiXCircle className="h-3.5 w-3.5 text-red-600" />
                        <span className="text-red-700">Unavailable</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-teal-700">{doctor.speciality}</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                    <FaStar className="h-3.5 w-3.5 text-amber-400" />
                    {Number(doctor.totalReviews || 0) > 0
                      ? Number(doctor.averageRating || 0).toFixed(1)
                      : "New"}
                    <span className="text-amber-600">
                      ({Number(doctor.totalReviews || 0)})
                    </span>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;
