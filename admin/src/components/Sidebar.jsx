import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { admintoken } = useContext(AdminContext);
  const { doctortoken } = useContext(DoctorContext);

  if (!admintoken && !doctortoken) return null;

  const filteredLinks = sidebarLinks.filter(
    ({ role }) =>
      (admintoken && role === "admin") || (doctortoken && role === "doctor")
  );

  return (
    <aside className="min-h-screen  sm:min-w-64 bg-white border-r shadow-md flex flex-col">
      <ul className="flex flex-col mt-6 text-gray-700">
        {filteredLinks.map(({ to, icon, label }) => (
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
            <span className="hidden md:block text-sm">{label}</span>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

const sidebarLinks = [
  {
    to: "/admin-dashboard",
    icon: assets.home_icon,
    label: "Dashboard",
    role: "admin",
  },
  {
    to: "/all-appointments",
    icon: assets.appointment_icon,
    label: "Appointments",
    role: "admin",
  },
  {
    to: "/add-doctor",
    icon: assets.add_icon,
    label: "Add Doctor",
    role: "admin",
  },
  {
    to: "/doctor-list",
    icon: assets.people_icon,
    label: "Doctors List",
    role: "admin",
  },
  {
    to: "/doctor-profile",
    icon: assets.doctor_icon,
    label: "Profile",
    role: "doctor",
  },
  {
    to: "/doctor-appointments",
    icon: assets.appointments_icon,
    label: "Appointments",
    role: "doctor",
  },
  {
    to: "/doctor-dashboard",
    icon: assets.home_icon,
    label: "Dashboard",
    role: "doctor",
  },
];

export default Sidebar;
