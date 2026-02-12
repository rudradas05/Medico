import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiChevronDown,
  FiLogOut,
  FiMenu,
  FiUser,
  FiX,
} from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { resolveImageUrl } from "../utils/imageUrl";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Doctors", path: "/doctors" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { token, userData, backendurl, logoutUser } = useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 pt-4">
      <div className="rounded-2xl border border-teal-100 bg-white/95 px-4 py-3 shadow-[0_10px_28px_rgba(15,118,110,0.10)] backdrop-blur-sm sm:px-5">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavigate("/")}
            className="rounded-xl border border-white/20 bg-slate-900/80 px-3 py-1.5 transition hover:bg-slate-900"
            aria-label="Go to home"
          >
            <img className="h-8 w-auto" src={assets.logo} alt="Medico" />
          </button>

          <nav className="hidden items-center justify-center gap-2 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-teal-100 text-teal-800"
                      : "text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {token && userData ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50/70 px-2 py-1.5 text-sm font-medium text-teal-800 transition hover:bg-teal-100"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={resolveImageUrl(userData.image, backendurl)}
                    alt={userData.name || "Profile"}
                  />
                  <FiChevronDown className="hidden h-4 w-4 sm:block" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        handleNavigate("/my-profile");
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-teal-50"
                    >
                      <FiUser className="h-4 w-4 text-teal-600" />
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        handleNavigate("/my-appointments");
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-teal-50"
                    >
                      <FiCalendar className="h-4 w-4 text-teal-600" />
                      My Appointments
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        logoutUser();
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <FiLogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNavigate("/login")}
                className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600 sm:inline-flex"
              >
                Create Account
              </button>
            )}

            <button
              onClick={() => setShowMenu(true)}
              className="rounded-lg p-2 text-gray-700 transition hover:bg-teal-50 lg:hidden"
              aria-label="Open menu"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-slate-900/45 transition ${
          showMenu ? "visible opacity-100" : "invisible opacity-0"
        } lg:hidden`}
      >
        <aside
          className={`absolute right-0 top-0 h-full w-72 bg-white p-4 shadow-2xl transition-transform ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="rounded-xl border border-white/20 bg-slate-900/80 px-3 py-1.5">
              <img className="h-8 w-auto" src={assets.logo} alt="Medico" />
            </div>
            <button
              onClick={() => setShowMenu(false)}
              className="rounded-lg p-2 text-gray-700 hover:bg-teal-50"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-teal-100 text-teal-800"
                      : "text-gray-700 hover:bg-teal-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {!token && (
            <button
              onClick={() => {
                setShowMenu(false);
                handleNavigate("/login");
              }}
              className="mt-6 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white"
            >
              Create Account
            </button>
          )}
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
