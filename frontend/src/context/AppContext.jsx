import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [loading, setLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(!!localStorage.getItem("token"));

  const [userData, setUserData] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const checkTokenExpiration = () => {
    const expiresAt = localStorage.getItem("expiresAt");

    if (!expiresAt || Date.now() > parseInt(expiresAt, 10)) {
      console.log("Token expired! Logging out...");
      logoutUser();
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    setToken(null);
    setIsLoggedin(false);
    console.log(isLoggedin);
    setUserData(false);
    toast.info("You have been logged out");
  };

  const loadUserData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/user/get-user-data", {
        headers: {
          token,
        },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getDoctorsData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendurl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verification_status_user = async () => {
    if (userData.isAccoutverified === true) {
      setIsVerified(true);
    }
  };

  useEffect(() => {
    if (token) {
      checkTokenExpiration();
      loadUserData();
    } else {
      setUserData(false);
    }
  }, [token]);

  useEffect(() => {
    getDoctorsData();
  }, [backendurl]);

  useEffect(() => {
    verification_status_user();
  }, [userData]);

  useEffect(() => {
    if (token) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, [token]);

  const value = {
    backendurl,
    doctors,
    currencySymbol,
    getDoctorsData,
    loading,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    token,
    setToken,
    loadUserData,
    logoutUser,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
