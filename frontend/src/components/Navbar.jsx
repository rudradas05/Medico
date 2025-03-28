import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AppContext } from "../context/AppContext";
import { RiLoginCircleFill } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { token, setToken, userData, setIsLoggedin, logoutUser } =
    useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-teal-500 z-50 shadow-lg">
      <div className="grid grid-cols-[auto_1fr_auto] gap-2 px-4 py-4 max-w-screen-xl mx-auto items-center">
        <img
          onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }}
          className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
          src={assets.logo}
          alt="logo"
        />

        <ul className="hidden md:flex items-center justify-center gap-10 text-white font-medium text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-teal-200 transition-colors duration-200 ${
                isActive ? "text-teal-200 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `hover:text-teal-200 transition-colors duration-200 ${
                isActive ? "text-teal-200 font-semibold" : ""
              }`
            }
          >
            Find a Doctor
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-teal-200 transition-colors duration-200 ${
                isActive ? "text-teal-200 font-semibold" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `hover:text-teal-200 transition-colors duration-200 ${
                isActive ? "text-teal-200 font-semibold" : ""
              }`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-teal-200 transition-colors duration-200 ${
                isActive ? "text-teal-200 font-semibold" : ""
              }`
            }
          >
            Contact
          </NavLink>
        </ul>

        <div className="flex items-center gap-6 justify-end">
          {token && userData ? (
            <div className="relative" ref={dropdownRef}>
              <img
                className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-white hover:ring-teal-200 transition-all"
                src={userData.image}
                alt="User"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              <div
                className={`absolute top-14 right-0 bg-white shadow-lg rounded-lg py-2 w-48 ${
                  showDropdown ? "block" : "hidden"
                } transition-opacity duration-200`}
              >
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    logoutUser();
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="mr-1 hidden md:block bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                Create Account
              </button>

              <RiLoginCircleFill
                onClick={() => navigate("/login")}
                className="mr-1 block md:hidden text-3xl text-white cursor-pointer hover:text-teal-200 transition-colors"
              />
            </div>
          )}
        </div>
        <CiMenuBurger
          onClick={() => setShowMenu(true)}
          className="text-3xl cursor-pointer md:hidden text-white hover:text-teal-200  transition-colors mr"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed  inset-0 bg-teal-700/95 backdrop-blur-sm z-40 transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform ease-in-out duration-300`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-teal-500">
          <img className="w-32" src={assets.logo} alt="Logo" />
          <IoCloseCircleOutline
            onClick={() => setShowMenu(false)}
            className="text-3xl text-white cursor-pointer hover:text-teal-200 transition-colors"
          />
        </div>
        <ul className="flex flex-col items-center gap-6 mt-8 text-lg font-medium text-white">
          <NavLink
            to="/"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `hover:text-teal-200 transition-colors duration-200 ${
                isActive ? "text-teal-200 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `hover:text-teal-200 transition-colors duration-200 ${
                isActive ? "text-teal-200 font-semibold" : ""
              }`
            }
          >
            Find a Doctor
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `hover:text-teal-200 transition-colors duration-200 ${
                isActive ? "text-teal-200 font-semibold" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `hover:text-teal-200 transition-colors duration-200 ${
                isActive ? "text-teal-200 font-semibold" : ""
              }`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `hover:text-teal-200 transition-colors duration-200 ${
                isActive ? "text-teal-200 font-semibold" : ""
              }`
            }
          >
            Contact
          </NavLink>

          {!token && (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-full mt-4 hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Create Account
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
