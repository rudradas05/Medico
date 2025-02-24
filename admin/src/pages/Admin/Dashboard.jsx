// import React, { useEffect, useContext } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { assets } from "../../assets/assets";
// import { motion } from "framer-motion";
// import { FaUserMd, FaCalendarAlt, FaUsers } from "react-icons/fa";
// import { AppContext } from "../../context/AppContext";

// const Dashboard = () => {
//   const {
//     admintoken,
//     appointemnts,
//     getDashData,
//     cancelAppointment,
//     dashData,
//     cancelingId,
//     getAllAppointments,
//   } = useContext(AdminContext);

//   const { formatAppointmentDate } = useContext(AppContext);

//   useEffect(() => {
//     if (admintoken) {
//       getDashData();
//       getAllAppointments();
//     }
//   }, [admintoken]);

//   if (!dashData)
//     return (
//       <p className="text-center text-gray-600 mt-10 text-lg">
//         Loading dashboard...
//       </p>
//     );

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       {/* Dashboard Summary */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {summaryCards.map((card, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.4, delay: index * 0.1 }}
//             className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg border border-gray-200 transition cursor-pointer"
//           >
//             <img src={card.icon} alt={card.label} className="w-12 h-12" />
//             <div>
//               <p className="text-2xl font-semibold text-gray-800">
//                 {dashData ? card.count(dashData) : "Loading..."}
//               </p>
//               <p className="text-gray-600 text-sm">{card.label}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Latest Bookings Section */}
//       <div className="mt-8">
//         <div className="flex items-center gap-3 mb-4">
//           <img src={assets.list_icon} alt="List Icon" className="w-6" />
//           <h2 className="text-xl font-semibold text-gray-800">
//             Latest Bookings
//           </h2>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           {dashData.latestAppointments.length === 0 ? (
//             <p className="text-gray-500 text-center">No recent appointments.</p>
//           ) : (
//             <div className="space-y-4">
//               {dashData.latestAppointments.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3, delay: index * 0.1 }}
//                   className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
//                 >
//                   <img
//                     src={item.docData.image}
//                     alt="Doctor"
//                     className="w-14 h-14 rounded-full border"
//                   />
//                   <div className="flex-1">
//                     <p className="text-lg font-medium text-gray-900">
//                       {item.docData.name}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {formatAppointmentDate
//                         ? formatAppointmentDate(item.slotDate)
//                         : item.slotDate}
//                       , {item.slotTime}
//                     </p>
//                   </div>
//                   {item.cancelled ? (
//                     <p className="text-red-500 font-semibold">Cancelled</p>
//                   ) : (
//                     <button
//                       className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
//                       onClick={() => cancelAppointment(item._id)}
//                       disabled={cancelingId === item._id || item.cancelled}
//                     >
//                       {item.cancelled
//                         ? "Cancelled"
//                         : cancelingId === item._id
//                         ? "Canceling..."
//                         : "Cancel"}
//                     </button>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Summary Card Data
// const summaryCards = [
//   {
//     icon: assets.doctor_icon,
//     count: (data) => data.totalDoctors,
//     label: "Doctors",
//   },
//   {
//     icon: assets.appointments_icon,
//     count: (data) => data.totalAppointments,
//     label: "Total Appointments",
//   },
//   {
//     icon: assets.patients_icon,
//     count: (data) => data.totalPatients,
//     label: "Patients",
//   },
// ];

// export default Dashboard;

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

  // Create local state to track changes
  const [localDashData, setLocalDashData] = useState(null);

  useEffect(() => {
    if (admintoken) {
      getDashData();
      getAllAppointments();
    }
  }, [admintoken]);

  useEffect(() => {
    setLocalDashData(dashData); // Sync state when dashData updates
  }, [dashData]);

  if (!localDashData)
    return (
      <p className="text-center text-gray-600 mt-10 text-lg">
        Loading dashboard...
      </p>
    );

  const handleCancelAppointment = async (appointmentId) => {
    await cancelAppointment(appointmentId);

    // Update local state to reflect the cancellation instantly
    setLocalDashData((prev) => ({
      ...prev,
      latestAppointments: prev.latestAppointments.map((appt) =>
        appt._id === appointmentId ? { ...appt, cancelled: true } : appt
      ),
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Dashboard Summary */}
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

      {/* Latest Bookings Section */}
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
                      {formatAppointmentDate
                        ? formatAppointmentDate(item.slotDate)
                        : item.slotDate}
                      , {item.slotTime}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-500 font-semibold">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 font-semibold">Completed</p>
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
