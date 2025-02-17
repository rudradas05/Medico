// import React, { useContext } from "react";

// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const TopDoctors = () => {
//   const navigate = useNavigate();
//   const { doctors } = useContext(AppContext);
//   return (
//     <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
//       <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
//       <p className="sm:w-1/3 text-center text-sm">
//         Simply Browse through our extensive list of trusted doctros.
//       </p>
//       <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
//         {doctors.slice(0, 10).map((item, index) => (
//           <div
//             onClick={() => navigate(`/appointment/${item._id}`)}
//             className="border border-blue-200 rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
//             key={index}
//           >
//             <img className="bg-blue-50 " src={item.image} alt="" />
//             <div className="p-4">
//               <div className="flex items-center gap-2 text-sm text-center text-green-500">
//                 <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                 <p>Available</p>
//               </div>
//               <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//               <p className="text-gray-600 tet-sm">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={() => {
//           navigate("/doctors");
//           scrollTo(0, 0);
//         }}
//         className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
//       >
//         more
//       </button>
//     </div>
//   );
// };

// export default TopDoctors;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-8 py-16 bg-gradient-to-b from-white to-blue-50">
      {/* Header Section */}
      <div className="text-center max-w-3xl px-4 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-poppins">
          Our Leading Medical Experts
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Connect with top-rated specialists dedicated to your health and
          wellness
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="w-full max-w-screen-xl px-4 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.slice(0, 8).map((doctor) => (
            <div
              key={doctor._id}
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={doctor.image}
                  alt={doctor.name}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
              </div>

              {/* Doctor Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  {doctor.available ? (
                    <span className="text-green-600 font-medium">
                      ✅ Available
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      ❌ Unavailable
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {doctor.name}
                </h3>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-400 rounded-2xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* View More Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        VIEW ALL DOCTORS
      </button>
    </div>
  );
};

export default TopDoctors;
