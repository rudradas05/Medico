import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiEdit,
  FiMapPin,
  FiDollarSign,
  FiInfo,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const DoctorProfile = () => {
  const { doctortoken, backendurl, doctorData, setDoctorData, loadDoctorData } =
    useContext(DoctorContext);
  const { currencySymbol } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateDoctorData = async () => {
    setLoading(true);
    try {
      const updateData = {
        address: doctorData.address,
        available: doctorData.available,
        fees: doctorData.fees,
        about: doctorData.about,
      };

      const { data } = await axios.post(
        `${backendurl}/api/doctor/update-doctor-data`,
        updateData,
        { headers: { doctortoken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDoctorData(data.updatedDoctor);
        setIsEdit(false);
        loadDoctorData();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadDoctorData();
  }, [doctortoken]);

  return (
    doctorData && (
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="admin-card w-full flex-shrink-0 rounded-2xl p-6 md:w-80"
          >
            <div className="relative group">
              <img
                className="mb-4 h-64 w-full rounded-xl object-cover"
                src={doctorData.image}
                alt="Doctor"
              />
              <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {doctorData.name}
              </h2>
              <p className="text-gray-600 text-sm">
                {doctorData.degree} • {doctorData.speciality}
              </p>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-teal-100 px-3 py-1 text-sm text-teal-800">
                  {doctorData.experience}
                </span>
                <div className="flex items-center gap-1">
                  {doctorData.available ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  <span className="text-sm">
                    {doctorData.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="admin-card flex-1 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Profile Information
              </h2>
              <button
                onClick={() => setIsEdit(!isEdit)}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: isEdit ? "#ecfdf5" : "#14b8a6",
                  color: isEdit ? "#0f766e" : "white",
                }}
              >
                <FiEdit className="text-sm" />
                {isEdit ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FiInfo className="text-gray-500" />
                  <h3 className="font-semibold text-gray-700">About</h3>
                </div>
                {isEdit ? (
                  <textarea
                    value={doctorData.about}
                    onChange={(e) =>
                      setDoctorData({ ...doctorData, about: e.target.value })
                    }
                    className="admin-input"
                    rows="4"
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {doctorData.about}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FiDollarSign className="text-gray-500" />
                    <h3 className="font-semibold text-gray-700">
                      Appointment Fee
                    </h3>
                  </div>
                  {isEdit ? (
                    <input
                      type="number"
                      value={doctorData.fees}
                      onChange={(e) =>
                        setDoctorData({ ...doctorData, fees: e.target.value })
                      }
                      className="admin-input"
                    />
                  ) : (
                    <p className="text-gray-600">
                      {currencySymbol}
                      {doctorData.fees}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FiMapPin className="text-gray-500" />
                    <h3 className="font-semibold text-gray-700">Address</h3>
                  </div>
                  {isEdit ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={doctorData.address.line1}
                        onChange={(e) =>
                          setDoctorData({
                            ...doctorData,
                            address: {
                              ...doctorData.address,
                              line1: e.target.value,
                            },
                          })
                        }
                        className="admin-input"
                      />
                      <input
                        type="text"
                        value={doctorData.address.line2}
                        onChange={(e) =>
                          setDoctorData({
                            ...doctorData,
                            address: {
                              ...doctorData.address,
                              line2: e.target.value,
                            },
                          })
                        }
                        className="admin-input"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-600 space-y-1">
                      <p>{doctorData.address.line1}</p>
                      <p>{doctorData.address.line2}</p>
                    </div>
                  )}
                </div>
              </div>

              {isEdit && (
                <div className="flex items-center gap-4 pt-4">
                  <label className="font-medium text-gray-700">
                    Availability
                  </label>
                  <div
                    onClick={() =>
                      setDoctorData({
                        ...doctorData,
                        available: !doctorData.available,
                      })
                    }
                    className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
                      doctorData.available ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                        doctorData.available ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </div>
                </div>
              )}

              {isEdit && (
                <motion.button
                  onClick={updateDoctorData}
                  disabled={loading}
                  whileTap={{ scale: 0.95 }}
                  className="admin-button w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
