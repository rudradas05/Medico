// import React, { useContext } from "react";
// import { AdminContext } from "../context/AdminContext";
// import { NavLink } from "react-router-dom";
// import { assets } from "../assets/assets";

// const Sidebar = () => {
//   const { admintoken } = useContext(AdminContext);
//   return (
//     <div className="min-h-screen bg-white border-r">
//       {admintoken && (
//         <ul className="text-[#515151] mt-5">
//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
//                 isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
//               }`
//             }
//             to={"/admin-dashboard"}
//           >
//             <img src={assets.home_icon} alt="" />
//             <p>Dashboard</p>
//           </NavLink>
//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
//                 isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
//               }`
//             }
//             to={"/all-appointments"}
//           >
//             <img src={assets.appointment_icon} alt="" />
//             <p>Appointments</p>
//           </NavLink>
//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer
//               ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
//             }
//             to={"/add-doctor"}
//           >
//             <img src={assets.add_icon} alt="" />
//             <p>Add Doctor</p>
//           </NavLink>
//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer
//               ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
//             }
//             to={"/doctor-list"}
//           >
//             <img src={assets.people_icon} alt="" />
//             <p>Doctors List</p>
//           </NavLink>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { admintoken } = useContext(AdminContext);

  if (!admintoken) return null; // Hide sidebar if no admin token

  return (
    <aside className="min-h-screen min-w-64 bg-white border-r shadow-md flex flex-col">
      {/* Sidebar Links */}
      <ul className="flex flex-col mt-6 text-gray-700">
        {sidebarLinks.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-6 rounded-r-full transition-all duration-300 ${
                isActive
                  ? "bg-indigo-100 text-indigo-600 font-semibold border-r-4 border-indigo-500"
                  : "hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <img src={icon} alt={`${label} Icon`} className="w-5 h-5" />
            <span className="text-sm">{label}</span>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

// Sidebar Navigation Links
const sidebarLinks = [
  { to: "/admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
  {
    to: "/all-appointments",
    icon: assets.appointment_icon,
    label: "Appointments",
  },
  { to: "/add-doctor", icon: assets.add_icon, label: "Add Doctor" },
  { to: "/doctor-list", icon: assets.people_icon, label: "Doctors List" },
];

export default Sidebar;
