import React, { useEffect, useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const {
    admintoken,
    getDashData,
    cancelAppointment,
    dashData,
    cancelingId,
    getAllAppointments,
  } = useContext(AdminContext);

  const { formatAppointmentDate } = useContext(AppContext);

  const [localDashData, setLocalDashData] = useState(null);

  useEffect(() => {
    if (admintoken) {
      getDashData();
      getAllAppointments();
    }
  }, [admintoken]);

  useEffect(() => {
    setLocalDashData(dashData);
  }, [dashData]);

  if (!localDashData)
    return (
      <p className="text-center text-gray-600 mt-10 text-lg">
        Loading dashboard...
      </p>
    );

  const handleCancelAppointment = async (appointmentId) => {
    await cancelAppointment(appointmentId);

    setLocalDashData((prev) => ({
      ...prev,
      latestAppointments: prev.latestAppointments.map((appt) =>
        appt._id === appointmentId ? { ...appt, cancelled: true } : appt
      ),
    }));
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {summaryCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="admin-card flex cursor-pointer items-center gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5"
          >
            <img src={card.icon} alt={card.label} className="h-12 w-12" />
            <div>
              <p className="text-2xl font-semibold text-slate-800">
                {localDashData ? card.count(localDashData) : "Loading..."}
              </p>
              <p className="text-sm text-slate-500">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center gap-3">
          <img src={assets.list_icon} alt="List Icon" className="w-6" />
          <h2 className="text-xl font-semibold text-slate-800">
            Latest Bookings
          </h2>
        </div>

        <div className="admin-card rounded-2xl p-6">
          {localDashData.latestAppointments.length === 0 ? (
            <p className="text-center text-gray-500">No recent appointments.</p>
          ) : (
            <div className="space-y-4">
              {localDashData.latestAppointments.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4 rounded-xl border border-teal-100 bg-teal-50/40 p-4 transition hover:bg-teal-50/70"
                >
                  <img
                    src={item.docData.image}
                    alt="Doctor"
                    className="h-14 w-14 rounded-full border border-teal-100 object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-medium text-slate-900">
                      {item.docData.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatAppointmentDate
                        ? formatAppointmentDate(item.slotDate)
                        : item.slotDate}
                      , {item.slotTime}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-500 font-semibold">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="font-semibold text-emerald-600">Completed</p>
                  ) : (
                    <button
                      className="rounded-lg bg-red-600 px-5 py-2 text-white transition-colors hover:bg-red-700 disabled:opacity-50"
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

// Summary Card Data
const summaryCards = [
  {
    icon: assets.doctor_icon,
    count: (data) => data.totalDoctors,
    label: "Doctors",
  },
  {
    icon: assets.appointments_icon,
    count: (data) => data.totalAppointments,
    label: "Total Appointments",
  },
  {
    icon: assets.patients_icon,
    count: (data) => data.totalPatients,
    label: "Patients",
  },
];

export default Dashboard;
