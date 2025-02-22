// import React, { useContext } from "react";
// import { assets } from "../assets/assets";
// import { AdminContext } from "../context/AdminContext";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { admintoken, setAdmintoken } = useContext(AdminContext);
//   const navigate = useNavigate();
//   // const logout = () => {
//   //   navigate("/");
//   //   admintoken && setAdmintoken("");
//   //   admintoken && localStorage.removeItem("admintoken");
//   // };
//   const logout = () => {
//     try {
//       if (admintoken) {
//         setAdmintoken("");
//         localStorage.removeItem("admintoken");
//       }
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
//       <div className="flex items-center gap-2 text-sm">
//         <img className="w-36 sm:w-40 cursor-pointer" alt="admin logo" />
//         <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
//           {admintoken ? "Admin" : "Doctor"}
//         </p>
//       </div>
//       <button
//         onClick={logout}
//         className="bg-primary text-white text-sm px-10 py-2 rounded-full"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { admintoken, setAdmintoken } = useContext(AdminContext);
  const { setDoctortoken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    try {
      setAdmintoken(""); // Clear admin token from context
      setDoctortoken(""); // Clear doctor token from context
      localStorage.removeItem("admintoken"); // Remove admin token from localStorage
      localStorage.removeItem("doctortoken"); // Remove doctor token from localStorage
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 sm:px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-500 shadow-md">
      {/* Left Section - Logo & Role */}
      <div className="flex items-center gap-4">
        <img
          src={assets.logo}
          className="w-32 sm:w-40 cursor-pointer"
          alt="Admin Dashboard Logo"
        />
        <span className="bg-white text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm">
          {admintoken ? "Admin" : "Doctor"}
        </span>
      </div>

      {/* Right Section - Logout Button */}
      <button
        onClick={logout}
        className="bg-white text-indigo-600 text-sm font-semibold px-6 sm:px-8 py-2 rounded-full shadow-md transition-all duration-300 hover:bg-indigo-100 hover:scale-105"
        aria-label="Logout"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
