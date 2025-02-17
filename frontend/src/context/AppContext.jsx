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
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

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
    getDoctorsData();
  }, [backendurl]);

  useEffect(() => {
    if (token) {
      loadUserData();
    } else {
      setUserData(false);
    }
  }, [token]);
  // useEffect(() => {
  //   getAuthState();
  // }, []);

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
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
