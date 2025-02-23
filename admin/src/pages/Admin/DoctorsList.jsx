// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";

// const DoctorsList = () => {
//   const { doctors, admintoken, getAllDoctors, changeAvailability } =
//     useContext(AdminContext);
//   useEffect(() => {
//     if (admintoken) {
//       getAllDoctors();
//     }
//   }, [admintoken]);
//   return (
//     <div className="m-5 max-h[90vh] overflow-y-scroll">
//       <h1 className="text-lg font-medium">All Doctors</h1>
//       <div className="flex flex-wrap w-full gap-4 pt-5 gap-y-6">
//         {doctors.map((item, index) => (
//           <div
//             className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
//             key={index}
//           >
//             <img
//               className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
//               src={item.image}
//               alt=""
//             />
//             <div className="p-4">
//               <p className="text-neutral-800 text-lg font-medium">
//                 {item.name}
//               </p>
//               <p className="text-zinc-600 text-sm">{item.speciality}</p>
//               <div className="mt-2 flex items-center gap-2 text-sm">
//                 <input
//                   onChange={() => changeAvailability(item._id)}
//                   type="checkbox"
//                   checked={item.available}
//                 />

//                 <p>Available</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DoctorsList;

import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { motion } from "framer-motion";
import { FaUserMd } from "react-icons/fa";

const DoctorsList = () => {
  const { doctors, admintoken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (admintoken) {
      getAllDoctors();
    }
  }, [admintoken]);

  return (
    <div className="m-5 max-w-6xl mx-auto max-h-[80vh] overflow-y-scroll">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        All Doctors
      </h1>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {doctors.map((doctor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center"
          >
            {/* Doctor Image */}
            <img
              src={doctor.image}
              alt={doctor.name}
              loading="lazy"
              className="w-24 h-24 object-cover rounded-full border-2 border-indigo-500"
            />

            {/* Doctor Details */}
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-2">
                <FaUserMd className="text-indigo-600" /> {doctor.name}
              </p>
              <p className="text-sm text-gray-600">{doctor.speciality}</p>
            </div>

            {/* Availability Toggle */}
            <div className="mt-4 flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={doctor.available}
                  onChange={() => changeAvailability(doctor._id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
              <p className="text-gray-700 text-sm">
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
