// import { createContext, useEffect, useState } from "react";

// import axios from "axios";
// import { toast } from "react-toastify";
// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const currencySymbol = "₹";
//   const backendurl = import.meta.env.VITE_BACKEND_URL;
//   const [doctors, setDoctors] = useState([]);
//   const value = {
//     doctors,
//     currencySymbol,
//   };

//   const getDoctorsData = async () => {
//     try {
//       const { data } = await axios.get(backendurl + "/api/doctor/list");
//       if (data.sucess) {
//         setDoctors(data.doctors);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };
//   useEffect(() => {
//     getDoctorsData();
//   }, [backendurl]);
//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };

// export default AppContextProvider;
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const currencySymbol = "₹";
//   const backendurl = import.meta.env.VITE_BACKEND_URL;
//   const [doctors, setDoctors] = useState([]);
//   const [token, setToken] = useState(
//     localStorage.getItem("token") ? localStorage.getItem("token") : false
//   );
//   const [loading, setLoading] = useState(true);
//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [userData, setUserData] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);

//   const loadUserData = async () => {
//     try {
//       const { data } = await axios.get(backendurl + "/api/user/get-user-data", {
//         headers: {
//           token,
//         },
//       });
//       if (data.success) {
//         setUserData(data.userData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   const getDoctorsData = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(backendurl + "/api/doctor/list");
//       if (data.success) {
//         setDoctors(data.doctors);
//       } else {
//         toast.error(error.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verification_status_user = async () => {
//     if (userData.isAccoutverified === true) {
//       setIsVerified(true);
//     }
//   };
//   useEffect(() => {
//     getDoctorsData();
//   }, [backendurl]);

//   useEffect(() => {
//     if (token) {
//       loadUserData();
//     } else {
//       setUserData(false);
//     }
//   }, [token]);
//   // useEffect(() => {
//   //   getAuthState();
//   // }, []);

//   const value = {
//     backendurl,
//     doctors,
//     currencySymbol,
//     getDoctorsData,
//     loading,
//     isLoggedin,
//     setIsLoggedin,
//     userData,
//     setUserData,
//     token,
//     setToken,
//     loadUserData,
//   };

//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };

// export default AppContextProvider;

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

  // Function to check token expiration
  const checkTokenExpiration = () => {
    const expiresAt = localStorage.getItem("expiresAt");

    if (!expiresAt || Date.now() > parseInt(expiresAt, 10)) {
      console.log("Token expired! Logging out...");
      logoutUser();
    }
  };

  // Function to log out user
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    setToken(null);
    setIsLoggedin(false);
    console.log(isLoggedin);
    setUserData(false);
    toast.info("You have been logged");
  };

  // Load user data
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

  // Fetch doctors data
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

  // Check account verification status
  const verification_status_user = async () => {
    if (userData.isAccoutverified === true) {
      setIsVerified(true);
    }
  };

  // Effect to check token and set token expiration
  useEffect(() => {
    if (token) {
      checkTokenExpiration();
      loadUserData();
    } else {
      setUserData(false);
    }
  }, [token]);

  // Effect to load doctors data
  useEffect(() => {
    getDoctorsData();
  }, [backendurl]);

  // Effect to verify user account status
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

  // Store token and expiration time on login
  // const setTokenAndExpiration = (newToken) => {
  //   const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // Set expiration to 7 days
  //   localStorage.setItem("token", newToken);
  //   localStorage.setItem("expiresAt", expiresAt);
  //   setToken(newToken);
  //   setIsLoggedin(true);
  // };

  // Provide context values
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
    setToken, // Use this function to set token and expiration
    loadUserData,
    logoutUser,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
