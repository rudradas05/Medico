import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { motion } from "framer-motion";
import { FaUserMd } from "react-icons/fa";

const ABSOLUTE_URL_REGEX = /^https?:\/\//i;
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

const resolveImageUrl = (imagePath, backendurl = "") => {
  if (typeof imagePath !== "string") return "";

  const raw = imagePath.trim();
  if (!raw) return "";

  const normalized = raw.replace(/\\/g, "/");

  if (normalized.startsWith("//")) {
    return encodeURI(`https:${normalized}`);
  }

  if (ABSOLUTE_URL_REGEX.test(normalized)) {
    try {
      const parsed = new URL(normalized);
      if (
        parsed.protocol === "http:" &&
        !LOCAL_HOSTNAMES.has(parsed.hostname)
      ) {
        parsed.protocol = "https:";
        return encodeURI(parsed.toString());
      }
    } catch {
      // Return the input if URL parsing fails.
    }
    return encodeURI(normalized);
  }

  if (normalized.startsWith("data:") || normalized.startsWith("blob:")) {
    return normalized;
  }

  const baseUrl = (backendurl || "").replace(/\/+$/, "");
  if (!baseUrl) return encodeURI(normalized);

  if (normalized.startsWith("/")) {
    return encodeURI(`${baseUrl}${normalized}`);
  }

  return encodeURI(`${baseUrl}/${normalized}`);
};

const DoctorsList = () => {
  const { doctors, admintoken, backendurl, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (admintoken) {
      getAllDoctors();
    }
  }, [admintoken]);

  return (
    <div className="mx-auto max-h-[80vh] max-w-6xl overflow-y-scroll">
      <h1 className="text-center text-2xl font-bold text-slate-800">
        All Doctors
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {doctors.map((doctor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="admin-card flex flex-col items-center overflow-hidden rounded-2xl p-4 text-center transition hover:-translate-y-0.5"
          >
            <img
              src={resolveImageUrl(doctor.image, backendurl)}
              alt={doctor.name}
              loading="lazy"
              className="h-24 w-24 rounded-full border-2 border-teal-500 object-cover"
            />

            <div className="mt-4">
              <p className="flex items-center justify-center gap-2 text-lg font-semibold text-slate-900">
                <FaUserMd className="text-teal-600" /> {doctor.name}
              </p>
              <p className="text-sm text-slate-600">{doctor.speciality}</p>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={doctor.available}
                  onChange={() => changeAvailability(doctor._id)}
                  className="sr-only peer"
                />
                <div className="h-6 w-11 rounded-full bg-gray-300 peer peer-checked:bg-primary peer-checked:after:translate-x-5 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-['']"></div>
              </label>
              <p className="text-sm text-slate-700">
                {doctor.available ? "Available" : "Unavailable"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
