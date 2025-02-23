// import React from "react";
// import { assets } from "../assets/assets";
// import { NavLink } from "react-router-dom";

// const Header = () => {
//   return (
//     <div
//       className="flex flex-row
//      md-flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 "
//     >
//       {/* left-side */}
//       <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[30px]">
//         <p className="text-3xl md;text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-toght">
//           Book Appointment <br />
//           with our expert
//         </p>
//         <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
//           <img className="w-28" src={assets.group_profiles} alt="" />
//           <p>
//             Simply browse through our extensive list of trusted doctors,
//             <br className="hidden sm:block" />
//             schedule your appointment hussle free
//           </p>
//         </div>
//         <NavLink
//           to="/doctors"
//           className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
//         >
//           Book appointment{" "}
//           <img className="w-3" src={assets.arrow_icon} alt="" />
//         </NavLink>
//       </div>
//       {/* right-side */}
//       <div className="md:w-1/2 relative z-0">
//         <img
//           className="w-full md:absolute bottom-0 h-auto rounded-lg"
//           src={assets.header_img}
//           alt=""
//         />
//       </div>
//     </div>
//   );
// };

// export default Header;
// import React from "react";
// import { assets } from "../assets/assets";
// import { NavLink } from "react-router-dom";

// const Header = () => {
//   return (
//     <div className="bg-gradient-to-r from-blue-600 to-teal-500 py-20 px-6 md:px-16 lg:px-24 text-white">
//       <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
//         {/* Left side - Text & Call to Action */}
//         <div className="md:w-1/2 text-center md:text-left space-y-6">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
//             Book Your Appointment with Trusted Doctors
//           </h1>
//           <p className="text-lg md:text-xl font-light">
//             Access a wide range of healthcare specialists, book appointments
//             effortlessly, and take control of your health.
//           </p>
//           <NavLink
//             to="/doctors"
//             className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white py-3 px-8 rounded-lg shadow-md text-lg font-semibold transform transition-all duration-300 ease-in-out"
//           >
//             Book Appointment
//             <img
//               className="w-4 ml-2"
//               src={assets.arrow_icon}
//               alt="Arrow Icon"
//             />
//           </NavLink>
//         </div>

//         {/* Right side - Image */}
//         <div className="md:w-1/2 mt-12 md:mt-0 relative">
//           <img
//             className="w-full h-auto rounded-lg shadow-lg object-cover"
//             src={assets.header_img}
//             alt="Healthcare Illustration"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

// import React from "react";
// import { assets } from "../assets/assets";
// import { NavLink } from "react-router-dom";
// import { motion } from "framer-motion";

// const Header = () => {
//   return (
//     <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 py-20 px-6 md:px-16 lg:px-24 text-white overflow-hidden">
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-teal-500/50"></div>

//       {/* Content Container */}
//       <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
//         {/* Left side - Text & Call to Action */}
//         <motion.div
//           className="md:w-1/2 text-center md:text-left space-y-6"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-poppins">
//             Book Your Appointment with Trusted Doctors
//           </h1>
//           <p className="text-lg md:text-xl font-light text-gray-100">
//             Access a wide range of healthcare specialists, book appointments
//             effortlessly, and take control of your health.
//           </p>
//           <NavLink
//             to="/doctors"
//             className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white py-3 px-8 rounded-lg shadow-md text-lg font-semibold transform transition-all duration-300 ease-in-out hover:scale-105 group"
//           >
//             Book Appointment
//             <motion.img
//               className="w-4 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2"
//               src={assets.arrow_icon}
//               alt="Arrow Icon"
//               whileHover={{ x: 5 }}
//             />
//           </NavLink>
//         </motion.div>

//         {/* Right side - Image */}
//         <motion.div
//           className="md:w-1/2 mt-12 md:mt-0 relative"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//         >
//           <motion.img
//             className="w-full h-auto rounded-lg shadow-lg object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
//             src={assets.header_img}
//             alt="Healthcare Illustration"
//             whileHover={{ scale: 1.05 }}
//           />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 py-20 px-6 md:px-16 lg:px-24 text-white overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-teal-500/50"></div>

      {/* Content Container */}
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left side - Text & Call to Action */}
        <motion.div
          className="md:w-1/2 text-center md:text-left space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-poppins">
            Book Your Appointment with Trusted Doctors
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-100">
            Access a wide range of healthcare specialists, book appointments
            effortlessly, and take control of your health.
          </p>
          <NavLink
            to="/doctors"
            aria-label="Book an appointment with a doctor"
            className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white py-3 px-8 rounded-lg shadow-md text-lg font-semibold transform transition-all duration-300 ease-in-out hover:scale-105 group"
          >
            Book Appointment
            {assets.arrow_icon && (
              <motion.img
                className="w-4 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                src={assets.arrow_icon}
                alt="Arrow Icon"
                whileHover={{ x: 5 }}
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </NavLink>
        </motion.div>

        {/* Right side - Image */}
        <motion.div
          className="md:w-1/2 mt-12 md:mt-0 relative group"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {assets.header_img ? (
            <motion.img
              className="w-full h-auto rounded-lg  object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              src={assets.header_img}
              alt="Healthcare Illustration"
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-700">Image Not Available</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
