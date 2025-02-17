// import React from "react";
// import { specialityData } from "../assets/assets";
// import { Link } from "react-router-dom";

// const SpecialityMenu = () => {
//   return (
//     <div
//       className="flex flex-col items-center gap-4 py-16 text-gray-800"
//       id="speciality"
//     >
//       <h1 className="text-3xl font-medium">Find by Speciality</h1>
//       <p className="sm:w-1/3 text-center text-sm">
//         Simply browse through our extensive list of trusted doctors, schedule
//         your appointment hassle free
//       </p>
//       <div className=" flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
//         {specialityData.map((item, index) => (
//           <Link
//             onClick={() => scrollTo(0, 0)}
//             className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
//             key={index}
//             to={`/doctors/${item.speciality}`}
//           >
//             <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
//             <p>{item.speciality}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SpecialityMenu;

// import React from "react";
// import { specialityData } from "../assets/assets";
// import { Link } from "react-router-dom";

// const SpecialityMenu = () => {
//   return (
//     <div
//       className="flex flex-col items-center gap-6 py-16 bg-gradient-to-r from-blue-100 via-teal-100 to-blue-200 text-gray-800"
//       id="speciality"
//     >
//       <h1 className="text-4xl font-semibold text-gray-800">
//         Find by Speciality
//       </h1>
//       <p className="w-full sm:w-1/2 text-center text-sm text-gray-600">
//         Browse through our extensive list of trusted doctors and schedule your
//         appointment hassle-free.
//       </p>
//       <div className="flex sm:justify-center gap-6 pt-5 w-full overflow-scroll">
//         {specialityData.map((item, index) => (
//           <Link
//             onClick={() => scrollTo(0, 0)}
//             className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
//             key={index}
//             to={`/doctors/${item.speciality}`}
//           >
//             <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center w-32 sm:w-40 hover:shadow-xl transition-all duration-300">
//               <img
//                 className="w-16 sm:w-24 mb-2"
//                 src={item.image}
//                 alt={item.speciality}
//               />
//               <p>{item.speciality}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SpecialityMenu;

import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-6 py-16 bg-gradient-to-br from-blue-50 to-teal-50"
      id="speciality"
    >
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-poppins">
          Find by Medical Speciality
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          Connect with board-certified specialists across{" "}
          {specialityData.length}+ medical fields. Your journey to better health
          starts here.
        </p>
      </div>

      {/* Speciality Cards Grid */}
      <div className="w-full px-4 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative block overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1"
            >
              <div className="p-4 md:p-6 flex flex-col items-center">
                {/* Image Container */}
                <div className="mb-4 w-20 h-20 md:w-24 md:h-24 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform group-hover:scale-110"
                    src={item.image}
                    alt={item.speciality}
                    loading="lazy"
                  />
                </div>

                {/* Text Content */}
                <h3 className="text-center text-sm md:text-base font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                  {item.speciality}
                </h3>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;
