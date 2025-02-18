import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { admintoken, setAdmintoken } = useContext(AdminContext);
  const navigate = useNavigate();
  // const logout = () => {
  //   navigate("/");
  //   admintoken && setAdmintoken("");
  //   admintoken && localStorage.removeItem("admintoken");
  // };
  const logout = () => {
    try {
      if (admintoken) {
        setAdmintoken("");
        localStorage.removeItem("admintoken");
      }
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-sm">
        <img className="w-36 sm:w-40 cursor-pointer" alt="admin logo" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {admintoken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
