// // // import React, { useEffect } from "react";
// // // import { useContext } from "react";
// // // import { AdminContext } from "../../context/AdminContext";
// // // import { assets } from "../../assets/assets";

// // // const Dashboard = () => {
// // //   const {
// // //     admintoken,
// // //     getDashData,
// // //     cancelAppointment,
// // //     dashData,
// // //     cancelingId,
// // //     setCancelingId,
// // //   } = useContext(AdminContext);

// // //   useEffect(() => {
// // //     if (admintoken) {
// // //       getDashData();
// // //     }
// // //   }, [admintoken]);
// // //   return (
// // //     dashData && (
// // //       <div className="m-5">
// // //         <div className="flex flex-wrap gap-3">
// // //           <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
// // //             <img src={assets.doctor_icon} alt="" />
// // //             <div>
// // //               <p>{dashData.totalDoctors}</p>
// // //               <p>Doctors</p>
// // //             </div>
// // //           </div>
// // //           <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
// // //             <img src={assets.doctor_icon} alt="" />
// // //             <img src={assets.appointments_icon} alt="" />
// // //             <div>
// // //               <p>{dashData.totalAppointments}</p>
// // //               <p>Total Appointments</p>
// // //             </div>
// // //           </div>
// // //           <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
// // //             <img src={assets.patients_icon} alt="" />
// // //             <div>
// // //               <p>{dashData.totalPatients}</p>
// // //               <p>Patients</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div>
// // //           <div>
// // //             <div>
// // //               <img src={assets.list_icon} alt="" />
// // //               <p>Latest Bookings</p>
// // //             </div>
// // //             <div>
// // //               {dashData.latestAppointments.map((item, index) => {
// // //                 <div key={index}>
// // //                   <img src={item.docData.image} alt="" />
// // //                   <div>
// // //                     <p>{item.docData.name}</p>
// // //                     <p>{item.slotData}</p>
// // //                   </div>
// // //                   {item.cancelled ? (
// // //                     <p className="text-red-500 font-semibold">Cancelled</p>
// // //                   ) : (
// // //                     <button
// // //                       className="w-full sm:w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
// // //                       onClick={() => cancelAppointment(appointment._id)}
// // //                       disabled={
// // //                         cancelingId === appointment._id || appointment.cancelled
// // //                       } // Disable if already cancelled
// // //                     >
// // //                       {item.cancelled
// // //                         ? "Cancelled"
// // //                         : cancelingId === appointment._id
// // //                         ? "Canceling..."
// // //                         : "Cancel"}
// // //                     </button>
// // //                   )}
// // //                 </div>;
// // //               })}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     )
// // //   );
// // // };

// // // export default Dashboard;

// // import React, { useEffect } from "react";
// // import { useContext } from "react";
// // import { AdminContext } from "../../context/AdminContext";
// // import { assets } from "../../assets/assets";

// // const Dashboard = () => {
// //   const {
// //     admintoken,
// //     getDashData,
// //     cancelAppointment,
// //     dashData,
// //     cancelingId,
// //     setCancelingId,
// //     getAllAppointments,
// //   } = useContext(AdminContext);

// //   useEffect(() => {
// //     if (admintoken) {
// //       getDashData();
// //       getAllAppointments();
// //     }
// //   }, [admintoken]);

// //   if (!dashData) return <p>Loading...</p>;

// //   return (
// //     <div className="m-5">
// //       {/* Summary Cards */}
// //       <div className="flex flex-wrap gap-3">
// //         <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
// //           <img src={assets.doctor_icon} alt="Doctor Icon" />
// //           <div>
// //             <p>{dashData.totalDoctors}</p>
// //             <p>Doctors</p>
// //           </div>
// //         </div>
// //         <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
// //           <img src={assets.appointments_icon} alt="Appointments Icon" />
// //           <div>
// //             <p>{dashData.totalAppointments}</p>
// //             <p>Total Appointments</p>
// //           </div>
// //         </div>
// //         <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
// //           <img src={assets.patients_icon} alt="Patients Icon" />
// //           <div>
// //             <p>{dashData.totalPatients}</p>
// //             <p>Patients</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Latest Bookings */}
// //       <div className="mt-5">
// //         <div className="flex items-center gap-2">
// //           <img src={assets.list_icon} alt="List Icon" />
// //           <p className="font-semibold text-lg">Latest Bookings</p>
// //         </div>
// //         <div className="mt-3">
// //           {dashData.latestAppointments.length === 0 ? (
// //             <p>No recent appointments.</p>
// //           ) : (
// //             dashData.latestAppointments.map((item, index) => (
// //               <div
// //                 key={index}
// //                 className="flex items-center gap-3 p-3 bg-white shadow-md rounded-md mb-2"
// //               >
// //                 <img
// //                   src={item.docData.image}
// //                   alt="Doctor"
// //                   className="w-12 h-12 rounded-full"
// //                 />
// //                 <div className="flex-1">
// //                   <p className="font-semibold">{item.docData.name}</p>
// //                   <p className="text-sm text-gray-600">{item.slotData}</p>
// //                 </div>
// //                 {item.cancelled ? (
// //                   <p className="text-red-500 font-semibold">Cancelled</p>
// //                 ) : (
// //                   <button
// //                     className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
// //                     onClick={() => cancelAppointment(item._id)}
// //                     disabled={cancelingId === item._id || item.cancelled}
// //                   >
// //                     {cancelingId === item._id ? "Canceling..." : "Cancel"}
// //                   </button>
// //                 )}
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useEffect, useContext } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { assets } from "../../assets/assets";

// const Dashboard = () => {
//   const {
//     admintoken,
//     getDashData,
//     cancelAppointment,
//     dashData,
//     cancelingId,
//     setCancelingId,
//     getAllAppointments,
//   } = useContext(AdminContext);

//   useEffect(() => {
//     if (admintoken) {
//       getDashData();
//       getAllAppointments();
//     }
//   }, [admintoken]);

//   if (!dashData)
//     return (
//       <p className="text-center text-gray-600 mt-10">Loading dashboard...</p>
//     );

//   return (
//     <div className="p-6">
//       <div className="flex flex-wrap gap-3">
//         <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
//           <img src={assets.doctor_icon} alt="Doctor Icon" />
//           <div>
//             <p>{dashData.totalDoctors}</p>
//             <p>Doctors</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
//           <img src={assets.appointments_icon} alt="Appointments Icon" />
//           <div>
//             <p>{dashData.totalAppointments}</p>
//             <p>Total Appointments</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
//           <img src={assets.patients_icon} alt="Patients Icon" />
//           <div>
//             <p>{dashData.totalPatients}</p>
//             <p>Patients</p>
//           </div>
//         </div>
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
//                 <div
//                   key={index}
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
//                     <p className="text-sm text-gray-500">{item.slotData}</p>
//                   </div>
//                   {item.cancelled ? (
//                     <p className="text-red-500 font-semibold">Cancelled</p>
//                   ) : (
//                     <button
//                       className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
//                       onClick={() => cancelAppointment(item._id)}
//                       disabled={cancelingId === item._id || item.cancelled}
//                     >
//                       {cancelingId === item._id ? "Canceling..." : "Cancel"}
//                     </button>
//                   )}
//                 </div>
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
//   { icon: assets.doctor_icon, count: "Loading...", label: "Doctors" },
//   {
//     icon: assets.appointments_icon,
//     count: "Loading...",
//     label: "Total Appointments",
//   },
//   { icon: assets.patients_icon, count: "Loading...", label: "Patients" },
// ];

// export default Dashboard;

import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";
import { FaUserMd, FaCalendarAlt, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  const {
    admintoken,
    getDashData,
    cancelAppointment,
    dashData,
    cancelingId,
    getAllAppointments,
  } = useContext(AdminContext);

  useEffect(() => {
    if (admintoken) {
      getDashData();
      getAllAppointments();
    }
  }, [admintoken]);

  if (!dashData)
    return (
      <p className="text-center text-gray-600 mt-10 text-lg">
        Loading dashboard...
      </p>
    );

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
                {dashData ? card.count(dashData) : "Loading..."}
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
          {dashData.latestAppointments.length === 0 ? (
            <p className="text-gray-500 text-center">No recent appointments.</p>
          ) : (
            <div className="space-y-4">
              {dashData.latestAppointments.map((item, index) => (
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
                    <p className="text-sm text-gray-500">{item.slotData}</p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-500 font-semibold">Cancelled</p>
                  ) : (
                    <button
                      className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      onClick={() => cancelAppointment(item._id)}
                      disabled={cancelingId === item._id || item.cancelled}
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
