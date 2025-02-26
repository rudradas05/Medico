import React, { useContext, useEffect, useState, useMemo } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dashData,
    getDashData,
    doctortoken,
    cancelAppointment,
    cancelingId,
    getDoctorAppointments,
  } = useContext(DoctorContext);

  const { formatAppointmentDate } = useContext(AppContext);

  const [localDashData, setLocalDashData] = useState(null);

  const handleCancelAppointment = async (appointmentId) => {
    await cancelAppointment(appointmentId);

    setLocalDashData((prev) => ({
      ...prev,
      latestAppointments: prev.latestAppointments.map((appt) =>
        appt._id === appointmentId ? { ...appt, cancelled: true } : appt
      ),
    }));
  };

  const summaryCards = useMemo(
    () => [
      {
        icon: assets.earning_icon,
        count: (data) => data.totalEarnings,
        label: "Total Earning",
      },
      {
        icon: assets.appointments_icon,
        count: (data) => data.appointments,
        label: "Total Appointments",
      },
      {
        icon: assets.patients_icon,
        count: (data) => data.patients,
        label: "Patients",
      },
    ],
    []
  );

  useEffect(() => {
    if (doctortoken) {
      getDashData();
      getDoctorAppointments();
    }
  }, [doctortoken]);

  useEffect(() => {
    setLocalDashData(dashData);
  }, [dashData]);

  if (!localDashData)
    return (
      <p className="text-center text-gray-600 mt-10 text-lg">
        Loading dashboard...
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg border border-gray-200 transition cursor-pointer"
          >
            <img src={card.icon} alt={card.label} className="w-12 h-12" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {localDashData ? card.count(localDashData) : "Loading..."}
              </p>
              <p className="text-gray-600 text-sm">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-3 mb-4">
          <img src={assets.list_icon} alt="List Icon" className="w-6" />
          <h2 className="text-xl font-semibold text-gray-800">
            Latest Bookings
          </h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {localDashData.latestAppointments.length === 0 ? (
            <p className="text-gray-500 text-center">No recent appointments.</p>
          ) : (
            <div className="space-y-4">
              {localDashData.latestAppointments.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <img
                    src={item.docData.image}
                    alt="Doctor"
                    className="w-14 h-14 rounded-full border"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-900">
                      {item.docData.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatAppointmentDate(item.slotDate)}, {item.slotTime}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-500 font-semibold">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500">Completed</p>
                  ) : (
                    <button
                      className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      onClick={() => handleCancelAppointment(item._id)}
                      disabled={cancelingId === item._id}
                    >
                      {cancelingId === item._id ? "Canceling..." : "Cancel"}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
