import React, { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiSearch,
  FiSliders,
  FiUser,
} from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import { resolveImageUrl } from "../utils/imageUrl";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors = [], currencySymbol = "$", backendurl } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  const specialities = useMemo(() => {
    return Array.from(new Set(doctors.map((doctor) => doctor.speciality))).sort();
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    const query = search.trim().toLowerCase();

    const list = doctors.filter((doctor) => {
      const bySpeciality = !speciality || doctor.speciality === speciality;
      const byAvailability = onlyAvailable ? doctor.available : true;
      const bySearch =
        !query ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.speciality.toLowerCase().includes(query);

      return bySpeciality && byAvailability && bySearch;
    });

    return list.sort((a, b) => {
      if (sortBy === "fee") {
        return Number(a.fees || 0) - Number(b.fees || 0);
      }
      return a.name.localeCompare(b.name);
    });
  }, [doctors, speciality, onlyAvailable, search, sortBy]);

  return (
    <div className="min-h-screen pb-12 pt-4">
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-500 text-white shadow-lg">
        <div className="absolute -right-16 -top-14 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-emerald-200/20 blur-2xl" />

        <div className="relative px-6 py-10 sm:px-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-teal-50">
            <FiCheckCircle className="h-4 w-4" />
            Verified Doctors
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Find Your Specialist</h1>
          <p className="mt-3 max-w-2xl text-sm text-teal-50 sm:text-base">
            Explore specialist doctors, compare experience and consultation fees,
            and book your appointment in a few clicks.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-5 max-w-6xl px-2 sm:mt-6 sm:px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by doctor name or specialty"
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setOnlyAvailable((prev) => !prev)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition sm:text-sm ${
                  onlyAvailable
                    ? "border-primary bg-teal-50 text-primary"
                    : "border-gray-200 text-gray-600 hover:border-teal-200"
                }`}
              >
                Available Only
              </button>

              <label className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-xs text-gray-600 sm:text-sm">
                <FiSliders className="h-4 w-4 text-primary" />
                Sort
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="bg-transparent font-medium text-gray-700 outline-none"
                >
                  <option value="name">Name A-Z</option>
                  <option value="fee">Lowest Fee</option>
                </select>
              </label>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => navigate("/doctors")}
              className={`min-w-max rounded-full border px-4 py-2 text-xs font-medium transition sm:text-sm ${
                !speciality
                  ? "border-primary bg-teal-50 text-primary"
                  : "border-gray-200 text-gray-600 hover:border-teal-200"
              }`}
            >
              All Specialities
            </button>

            {specialities.map((item) => (
              <button
                key={item}
                onClick={() =>
                  navigate(speciality === item ? "/doctors" : `/doctors/${item}`)
                }
                className={`min-w-max rounded-full border px-4 py-2 text-xs font-medium transition sm:text-sm ${
                  speciality === item
                    ? "border-primary bg-teal-50 text-primary"
                    : "border-gray-200 text-gray-600 hover:border-teal-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-2 sm:px-4">
        {filteredDoctors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <FiUser className="mx-auto h-10 w-10 text-gray-300" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">No doctors found</h2>
            <p className="mt-2 text-sm text-gray-500">
              Try changing your search query or removing some filters.
            </p>
          </div>
        ) : (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.05 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredDoctors.map((doctor) => (
              <motion.article
                key={doctor._id}
                variants={cardVariants}
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 p-3">
                  {doctor.image ? (
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-white/60">
                      <img
                        src={resolveImageUrl(doctor.image, backendurl)}
                        alt={`${doctor.name}, ${doctor.speciality}`}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-primary">
                      <FiUser className="h-14 w-14" />
                    </div>
                  )}

                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                      doctor.available
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {doctor.available ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{doctor.speciality}</p>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FiBriefcase className="h-4 w-4 text-primary" />
                      <span>{doctor.experience || "5 Years"} experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="h-4 w-4 text-primary" />
                      <span>
                        {(doctor.slots_booked &&
                          Object.keys(doctor.slots_booked).length) ||
                          0} booked days
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiDollarSign className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-gray-800">
                        {currencySymbol}
                        {doctor.fees || 120}
                      </span>
                      <span className="text-xs text-gray-500">per consultation</span>
                    </div>
                  </div>

                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/appointment/${doctor._id}`);
                    }}
                    className="mt-5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
                  >
                    Book Appointment
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Doctors;
