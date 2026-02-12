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
      (admintoken && role === "admin") || (doctortoken && role === "doctor"),
  );

  return (
    <aside className="sticky top-[81px] min-h-[calc(100vh-81px)] w-16 sm:w-64">
      <div className="admin-panel mr-2 mt-6 rounded-2xl p-2 sm:mr-4 sm:p-3">
        <ul className="flex flex-col gap-1 text-gray-700">
        {filteredLinks.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-teal-50 text-teal-700 font-semibold shadow-sm border border-teal-100"
                  : "hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <img src={icon} alt={`${label} Icon`} className="h-5 w-5" />
            <span className="hidden text-sm sm:block">{label}</span>
          </NavLink>
        ))}
        </ul>
      </div>
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
    to: "/add-service",
    icon: assets.add_icon,
    label: "Add Service",
    role: "admin",
  },
  {
    to: "/services-list",
    icon: assets.list_icon,
    label: "Services List",
    role: "admin",
  },
  {
    to: "/service-bookings",
    icon: assets.appointment_icon,
    label: "Service Bookings",
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
