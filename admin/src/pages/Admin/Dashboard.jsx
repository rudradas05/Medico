// import React, { useEffect } from "react";
// import { useContext } from "react";
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
//   } = useContext(AdminContext);

//   useEffect(() => {
//     if (admintoken) {
//       getDashData();
//     }
//   }, [admintoken]);
//   return (
//     dashData && (
//       <div className="m-5">
//         <div className="flex flex-wrap gap-3">
//           <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
//             <img src={assets.doctor_icon} alt="" />
//             <div>
//               <p>{dashData.totalDoctors}</p>
//               <p>Doctors</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
//             <img src={assets.doctor_icon} alt="" />
//             <img src={assets.appointments_icon} alt="" />
//             <div>
//               <p>{dashData.totalAppointments}</p>
//               <p>Total Appointments</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
//             <img src={assets.patients_icon} alt="" />
//             <div>
//               <p>{dashData.totalPatients}</p>
//               <p>Patients</p>
//             </div>
//           </div>
//         </div>
//         <div>
//           <div>
//             <div>
//               <img src={assets.list_icon} alt="" />
//               <p>Latest Bookings</p>
//             </div>
//             <div>
//               {dashData.latestAppointments.map((item, index) => {
//                 <div key={index}>
//                   <img src={item.docData.image} alt="" />
//                   <div>
//                     <p>{item.docData.name}</p>
//                     <p>{item.slotData}</p>
//                   </div>
//                   {item.cancelled ? (
//                     <p className="text-red-500 font-semibold">Cancelled</p>
//                   ) : (
//                     <button
//                       className="w-full sm:w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
//                       onClick={() => cancelAppointment(appointment._id)}
//                       disabled={
//                         cancelingId === appointment._id || appointment.cancelled
//                       } // Disable if already cancelled
//                     >
//                       {item.cancelled
//                         ? "Cancelled"
//                         : cancelingId === appointment._id
//                         ? "Canceling..."
//                         : "Cancel"}
//                     </button>
//                   )}
//                 </div>;
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default Dashboard;

import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const {
    admintoken,
    getDashData,
    cancelAppointment,
    dashData,
    cancelingId,
    setCancelingId,
    getAllAppointments,
  } = useContext(AdminContext);

  useEffect(() => {
    if (admintoken) {
      getDashData();
      getAllAppointments();
    }
  }, [admintoken]);

  if (!dashData) return <p>Loading...</p>;

  return (
    <div className="m-5">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
          <img src={assets.doctor_icon} alt="Doctor Icon" />
          <div>
            <p>{dashData.totalDoctors}</p>
            <p>Doctors</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
          <img src={assets.appointments_icon} alt="Appointments Icon" />
          <div>
            <p>{dashData.totalAppointments}</p>
            <p>Total Appointments</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer">
          <img src={assets.patients_icon} alt="Patients Icon" />
          <div>
            <p>{dashData.totalPatients}</p>
            <p>Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="mt-5">
        <div className="flex items-center gap-2">
          <img src={assets.list_icon} alt="List Icon" />
          <p className="font-semibold text-lg">Latest Bookings</p>
        </div>
        <div className="mt-3">
          {dashData.latestAppointments.length === 0 ? (
            <p>No recent appointments.</p>
          ) : (
            dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white shadow-md rounded-md mb-2"
              >
                <img
                  src={item.docData.image}
                  alt="Doctor"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.docData.name}</p>
                  <p className="text-sm text-gray-600">{item.slotData}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 font-semibold">Cancelled</p>
                ) : (
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                    onClick={() => cancelAppointment(item._id)}
                    disabled={cancelingId === item._id || item.cancelled}
                  >
                    {cancelingId === item._id ? "Canceling..." : "Cancel"}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
