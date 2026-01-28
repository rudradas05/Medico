import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FiSearch, FiStar, FiZap, FiClock, FiDollarSign } from "react-icons/fi";
import { motion } from "framer-motion";

const Doctors = () => {
  const { speciality, docId } = useParams();
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const navigate = useNavigate();
  const { doctors = [], currencySymbol = "$" } = useContext(AppContext);

  const specialities = useMemo(() => {
    const uniqueSpecialities = new Set(doctors.map((doc) => doc.speciality));
    return Array.from(uniqueSpecialities).sort();
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    if (!Array.isArray(doctors)) return [];

    const list = doctors.filter((doctor) => {
      const matchesSpeciality = !speciality || doctor.speciality === speciality;
      const matchesSearch =
        !search.trim() ||
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(search.toLowerCase());
      const matchesAvailability = onlyAvailable ? doctor.available : true;

      return matchesSpeciality && matchesSearch && matchesAvailability;
    });

    return list.sort((a, b) => {
      if (sortBy === "fee") {
        return Number(a.fees || 0) - Number(b.fees || 0);
      }
      return a.name.localeCompare(b.name);
    });
  }, [doctors, speciality, search, onlyAvailable, sortBy]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02 },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8 mb-10">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Specialist
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with experienced healthcare professionals from the comfort
            of your home
          </p>
        </motion.header>

        <div className="mb-16 max-w-5xl mx-auto">
          <div className="relative mb-4">
            <FiSearch className="absolute top-4 left-4 text-gray-400 text-xl" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctors by name or specialty..."
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setOnlyAvailable((v) => !v)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  onlyAvailable
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-teal-300"
                }`}
              >
                Show Available Only
              </button>
              <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-full text-sm">
                <label className="text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none text-gray-800"
                >
                  <option value="name">Name A-Z</option>
                  <option value="fee">Lowest Fee</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowFilter(!showFilter)}
              className="md:hidden self-start text-teal-600 hover:text-teal-700 text-sm font-semibold"
            >
              {showFilter ? "Hide" : "Show"} Specialities
            </button>
          </div>

          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Specializations
              </h2>
            </div>

            <div
              className={`grid grid-cols-2 sm:flex gap-2 ${
                showFilter ? "block" : "hidden sm:flex"
              }`}
            >
              {specialities.map((spec) => (
                <motion.button
                  key={spec}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-full text-sm ${
                    speciality === spec
                      ? "bg-teal-600 text-white"
                      : "bg-white text-gray-600 border hover:border-teal-300"
                  }`}
                  onClick={() =>
                    navigate(
                      speciality === spec ? "/doctors" : `/doctors/${spec}`
                    )
                  }
                >
                  {spec}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
        >
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <motion.article
                key={doctor._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer border border-gray-100 hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/appointment/${doctor._id}`)}
              >
                <div className="relative bg-gray-50 h-64 flex items-center justify-center">
                  <img
                    src={doctor.image}
                    alt={`${doctor.name}, ${doctor.speciality}`}
                    className="max-h-full w-full object-contain px-3"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/10" />
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {doctor.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        doctor.available
                          ? "bg-teal-50 text-teal-700 border border-teal-100"
                          : "bg-red-50 text-red-700 border border-red-100"
                      }`}
                    >
                      {doctor.available ? "Available" : "Not Available"}
                    </span>
                  </div>
                  <p className="text-teal-600 font-medium mb-3">
                    {doctor.speciality}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <FiStar className="text-amber-500" />
                      <span className="font-medium">4.9 Rating</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiZap className="text-teal-600" />
                      <span>{doctor.experience || "5"} Years Experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiClock className="text-purple-600" />
                      <span className="text-gray-700">
                        {(doctor.slots_booked &&
                          Object.keys(doctor.slots_booked).length) ||
                          0}{" "}
                        booked slots
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-800">
                      <FiDollarSign className="text-teal-500" />
                      <span className="font-semibold">
                        {currencySymbol}
                        {doctor.fees || "120"}
                      </span>
                      <span className="text-xs text-gray-500">per session</span>
                    </div>
                    <button
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/appointment/${doctor._id}`);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-20 space-y-4">
              <div className="text-6xl">👩⚕️</div>
              <h3 className="text-xl font-semibold text-gray-800">
                No Doctors Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Doctors;
