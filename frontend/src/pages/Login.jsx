// // // import React, { useContext, useState } from "react";
// // // import { assets } from "../assets/assets";
// // // import { useNavigate } from "react-router-dom";
// // // import { AppContext } from "../context/AppContext";
// // // import axios from "axios";
// // // import { toast } from "react-toastify";

// // // const Login = () => {
// // //   const [state, setState] = useState("Sign Up");
// // //   const [name, setName] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");

// // //   const { backendurl, token, setToken, isLoggedin, setIsLoggedin } =
// // //     useContext(AppContext);
// // //   const navigate = useNavigate();

// // //   const REGISTER_URL = `${backendurl}/api/user/register`;
// // //   const LOGIN_URL = `${backendurl}/api/user/login`;

// // //   const onSubmitHandler = async (event) => {
// // //     event.preventDefault();

// // //     try {
// // //       if (state === "Sign Up") {
// // //         const { data } = await axios.post(REGISTER_URL, {
// // //           name,
// // //           email,
// // //           password,
// // //         });
// // //         if (data.success) {
// // //           localStorage.setItem("token", data.token);
// // //           setToken(data.token);
// // //           navigate("/email-verify");
// // //           setIsLoggedin(true);
// // //         } else {
// // //           toast.error(data.message);
// // //         }
// // //       } else {
// // //         const { data } = await axios.post(LOGIN_URL, { email, password });
// // //         if (data.success) {
// // //           localStorage.setItem("token", data.token);
// // //           setToken(data.token);
// // //           navigate("/");
// // //           setIsLoggedin(true);
// // //         } else {
// // //           toast.error(data.message);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error("Error:", error); // Debugging purposes
// // //       toast.error("Failed to connect. Please try again later.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex items-center justify-center min-h-[80vh] px-6 sm:px-0">
// // //       <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
// // //         <h2 className="text-3xl font-semibold text-white text-center mb-3">
// // //           {state === "Sign Up" ? "Create Account" : "Login"}
// // //         </h2>
// // //         <p className="text-center text-sm mb-6">
// // //           Please {state === "Sign Up" ? "Sign Up" : "Login"} to book appointment
// // //         </p>
// // //         <form onSubmit={onSubmitHandler}>
// // //           {state === "Sign Up" && (
// // //             <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
// // //               <img src={assets.person_icon} alt="Person Icon" />
// // //               <input
// // //                 onChange={(e) => setName(e.target.value)}
// // //                 value={name}
// // //                 className="bg-transparent outline-none"
// // //                 type="text"
// // //                 placeholder="Enter Full Name"
// // //                 required
// // //               />
// // //             </div>
// // //           )}
// // //           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
// // //             <img src={assets.mail_icon} alt="Mail Icon" />
// // //             <input
// // //               onChange={(e) => setEmail(e.target.value)}
// // //               value={email}
// // //               className="bg-transparent outline-none"
// // //               type="email"
// // //               placeholder="Enter Email Address"
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
// // //             <img src={assets.lock_icon} alt="Lock Icon" />
// // //             <input
// // //               onChange={(e) => setPassword(e.target.value)}
// // //               value={password}
// // //               className="bg-transparent outline-none"
// // //               type="password"
// // //               placeholder="Enter Password"
// // //               required
// // //             />
// // //           </div>
// // //           {state !== "Sign Up" && (
// // //             <p
// // //               onClick={() => navigate("/reset-password")}
// // //               className="mb-4 text-indigo-500 cursor-pointer"
// // //             >
// // //               Forgot Password?
// // //             </p>
// // //           )}

// // //           <button
// // //             type="submit"
// // //             className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium"
// // //           >
// // //             {state === "Sign Up" ? "Create Account" : "Login"}
// // //           </button>
// // //         </form>
// // //         <p className="text-gray-400 text-center text-xs mt-4">
// // //           {state === "Sign Up"
// // //             ? "Already have an account?"
// // //             : "Don't have an account?"}{" "}
// // //           <span
// // //             onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
// // //             className="text-blue-400 cursor-pointer underline"
// // //           >
// // //             {state === "Sign Up" ? "Login here" : "Sign Up"}
// // //           </span>
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;

// // // import React, { useContext, useEffect, useState } from "react";
// // // import { assets } from "../assets/assets";
// // // import { useNavigate } from "react-router-dom";
// // // import { AppContext } from "../context/AppContext";
// // // import axios from "axios";
// // // import { toast } from "react-toastify";

// // // // Toast configuration object
// // // const toastConfig = {
// // //   position: "top-right",
// // //   autoClose: 5000, // 5 seconds
// // //   hideProgressBar: false,
// // //   closeOnClick: true,
// // //   pauseOnHover: true,
// // //   draggable: true,
// // //   theme: "colored",
// // // };

// // // const Login = () => {
// // //   const [state, setState] = useState("Sign Up");
// // //   const [name, setName] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");

// // //   const { backendurl, token, setToken, isLoggedin, setIsLoggedin } =
// // //     useContext(AppContext);
// // //   const navigate = useNavigate();

// // //   const REGISTER_URL = `${backendurl}/api/user/register`;
// // //   const LOGIN_URL = `${backendurl}/api/user/login`;
// // //   useEffect(() => {
// // //     if (token) {
// // //       navigate("/my-profile"); // Redirect to homepage if already logged in
// // //     }
// // //   }, [token, navigate]);

// // //   const onSubmitHandler = async (event) => {
// // //     event.preventDefault();

// // //     if (token) {
// // //       toast.error(
// // //         "You are already logged in. Please logout first.",
// // //         toastConfig
// // //       ); // Improved toast notification
// // //       return;
// // //     }

// // //     try {
// // //       if (state === "Sign Up") {
// // //         const { data } = await axios.post(REGISTER_URL, {
// // //           name,
// // //           email,
// // //           password,
// // //         });
// // //         if (data.success) {
// // //           localStorage.setItem("token", data.token);
// // //           setToken(data.token);
// // //           navigate("/email-verify");
// // //           setIsLoggedin(true);
// // //           toast.success("Account created successfully!", toastConfig); // Improved toast notification
// // //         } else {
// // //           toast.error(
// // //             data.message || "Sign up failed, please try again.",
// // //             toastConfig
// // //           ); // Improved error toast
// // //         }
// // //       } else {
// // //         const { data } = await axios.post(LOGIN_URL, { email, password });
// // //         if (data.success) {
// // //           localStorage.setItem("token", data.token);
// // //           setToken(data.token);
// // //           navigate("/");
// // //           setIsLoggedin(true);
// // //           toast.success("Login successful!", toastConfig); // Improved toast notification
// // //         } else {
// // //           toast.error(
// // //             data.message || "Login failed, please check your credentials.",
// // //             toastConfig
// // //           ); // Improved error toast
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error("Error:", error); // Debugging purposes
// // //       toast.error(error.mess, toastConfig); // Improved error toast
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex items-center justify-center min-h-[80vh] px-6 sm:px-0">
// // //       <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
// // //         <h2 className="text-3xl font-semibold text-white text-center mb-3">
// // //           {state === "Sign Up" ? "Create Account" : "Login"}
// // //         </h2>
// // //         <p className="text-center text-sm mb-6">
// // //           Please {state === "Sign Up" ? "Sign Up" : "Login"} to book appointment
// // //         </p>
// // //         <form onSubmit={onSubmitHandler}>
// // //           {state === "Sign Up" && (
// // //             <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
// // //               <img src={assets.person_icon} alt="Person Icon" />
// // //               <input
// // //                 onChange={(e) => setName(e.target.value)}
// // //                 value={name}
// // //                 className="bg-transparent outline-none"
// // //                 type="text"
// // //                 placeholder="Enter Full Name"
// // //                 required
// // //               />
// // //             </div>
// // //           )}
// // //           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
// // //             <img src={assets.mail_icon} alt="Mail Icon" />
// // //             <input
// // //               onChange={(e) => setEmail(e.target.value)}
// // //               value={email}
// // //               className="bg-transparent outline-none"
// // //               type="email"
// // //               placeholder="Enter Email Address"
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
// // //             <img src={assets.lock_icon} alt="Lock Icon" />
// // //             <input
// // //               onChange={(e) => setPassword(e.target.value)}
// // //               value={password}
// // //               className="bg-transparent outline-none"
// // //               type="password"
// // //               placeholder="Enter Password"
// // //               required
// // //             />
// // //           </div>
// // //           {state !== "Sign Up" && (
// // //             <p
// // //               onClick={() => navigate("/reset-password")}
// // //               className="mb-4 text-indigo-500 cursor-pointer"
// // //             >
// // //               Forgot Password?
// // //             </p>
// // //           )}

// // //           <button
// // //             type="submit"
// // //             className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium"
// // //           >
// // //             {state === "Sign Up" ? "Create Account" : "Login"}
// // //           </button>
// // //         </form>
// // //         <p className="text-gray-400 text-center text-xs mt-4">
// // //           {state === "Sign Up"
// // //             ? "Already have an account?"
// // //             : "Don't have an account?"}{" "}
// // //           <span
// // //             onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
// // //             className="text-blue-400 cursor-pointer underline"
// // //           >
// // //             {state === "Sign Up" ? "Login here" : "Sign Up"}
// // //           </span>
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;

// // import React, { useContext, useEffect, useState } from "react";
// // import { assets } from "../assets/assets";
// // import { useNavigate } from "react-router-dom";
// // import { AppContext } from "../context/AppContext";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // // Toast configuration object
// // const toastConfig = {
// //   position: "top-right",
// //   autoClose: 5000,
// //   hideProgressBar: false,
// //   closeOnClick: true,
// //   pauseOnHover: true,
// //   draggable: true,
// //   theme: "colored",
// // };

// // // Reusable Input Component
// // const InputField = ({ icon, type, placeholder, value, onChange }) => (
// //   <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
// //     <img src={icon} alt={`${placeholder} Icon`} />
// //     <input
// //       onChange={onChange}
// //       value={value}
// //       className="bg-transparent outline-none w-full"
// //       type={type}
// //       placeholder={placeholder}
// //       required
// //       aria-label={placeholder}
// //     />
// //   </div>
// // );

// // const Login = () => {
// //   const [state, setState] = useState("Sign Up");
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const { backendurl, token, setToken, isLoggedin, setIsLoggedin } =
// //     useContext(AppContext);
// //   const navigate = useNavigate();

// //   const REGISTER_URL = `${backendurl}/api/user/register`;
// //   const LOGIN_URL = `${backendurl}/api/user/login`;

// //   useEffect(() => {
// //     if (token) {
// //       navigate("/my-profile");
// //     }
// //   }, [token, navigate]);

// //   const onSubmitHandler = async (event) => {
// //     event.preventDefault();

// //     if (token) {
// //       toast.error(
// //         "You are already logged in. Please logout first.",
// //         toastConfig
// //       );
// //       return;
// //     }

// //     try {
// //       const url = state === "Sign Up" ? REGISTER_URL : LOGIN_URL;
// //       const payload =
// //         state === "Sign Up" ? { name, email, password } : { email, password };

// //       const { data } = await axios.post(url, payload);

// //       if (data.success) {
// //         localStorage.setItem("token", data.token);
// //         setToken(data.token);
// //         navigate(state === "Sign Up" ? "/email-verify" : "/");
// //         setIsLoggedin(true);
// //         toast.success(
// //           state === "Sign Up"
// //             ? "Account created successfully!"
// //             : "Login successful!",
// //           toastConfig
// //         );
// //       } else {
// //         toast.error(
// //           data.message || "An error occurred. Please try again.",
// //           toastConfig
// //         );
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       toast.error(
// //         error.response?.data?.message ||
// //           "Something went wrong. Please try again later.",
// //         toastConfig
// //       );
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-[80vh] px-6 sm:px-0">
// //       <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
// //         <h2 className="text-3xl font-semibold text-white text-center mb-3">
// //           {state === "Sign Up" ? "Create Account" : "Login"}
// //         </h2>
// //         <p className="text-center text-sm mb-6">
// //           Please {state === "Sign Up" ? "Sign Up" : "Login"} to book appointment
// //         </p>
// //         <form onSubmit={onSubmitHandler}>
// //           {state === "Sign Up" && (
// //             <InputField
// //               icon={assets.person_icon}
// //               type="text"
// //               placeholder="Enter Full Name"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //             />
// //           )}
// //           <InputField
// //             icon={assets.mail_icon}
// //             type="email"
// //             placeholder="Enter Email Address"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //           />
// //           <InputField
// //             icon={assets.lock_icon}
// //             type="password"
// //             placeholder="Enter Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //           {state !== "Sign Up" && (
// //             <p
// //               onClick={() => navigate("/reset-password")}
// //               className="mb-4 text-indigo-500 cursor-pointer"
// //             >
// //               Forgot Password?
// //             </p>
// //           )}
// //           <button
// //             type="submit"
// //             className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium"
// //           >
// //             {state === "Sign Up" ? "Create Account" : "Login"}
// //           </button>
// //         </form>
// //         <p className="text-gray-400 text-center text-xs mt-4">
// //           {state === "Sign Up"
// //             ? "Already have an account?"
// //             : "Don't have an account?"}{" "}
// //           <span
// //             onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
// //             className="text-blue-400 cursor-pointer underline"
// //           >
// //             {state === "Sign Up" ? "Login here" : "Sign Up"}
// //           </span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useContext, useEffect, useState } from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// // Toast configuration object
// const toastConfig = {
//   position: "top-right",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   theme: "colored",
// };

// // Reusable Input Component
// const InputField = ({ icon, type, placeholder, value, onChange }) => (
//   <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//     <img src={icon} alt={`${placeholder} Icon`} />
//     <input
//       onChange={onChange}
//       value={value}
//       className="bg-transparent outline-none w-full"
//       type={type}
//       placeholder={placeholder}
//       required
//       aria-label={placeholder}
//     />
//   </div>
// );

// const Login = () => {
//   const [state, setState] = useState("Sign Up");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const { backendurl, token, setToken, isLoggedin, setIsLoggedin } =
//     useContext(AppContext);
//   const navigate = useNavigate();

//   const REGISTER_URL = `${backendurl}/api/user/register`;
//   const LOGIN_URL = `${backendurl}/api/user/login`;

//   useEffect(() => {
//     if (token) {
//       navigate("/my-profile");
//     }
//   }, [token, navigate]);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     if (token) {
//       toast.error(
//         "You are already logged in. Please logout first.",
//         toastConfig
//       );
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const url = state === "Sign Up" ? REGISTER_URL : LOGIN_URL;
//       const payload =
//         state === "Sign Up" ? { name, email, password } : { email, password };

//       const { data } = await axios.post(url, payload);

//       if (data.success) {
//         localStorage.setItem("token", data.token);
//         setToken(data.token);
//         navigate(state === "Sign Up" ? "/email-verify" : "/");
//         setIsLoggedin(true);
//         toast.success(
//           state === "Sign Up"
//             ? "Account created successfully!"
//             : "Login successful!",
//           toastConfig
//         );
//       } else {
//         toast.error(
//           data.message || "An error occurred. Please try again.",
//           toastConfig
//         );
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again later.",
//         toastConfig
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[80vh] px-6 sm:px-0">
//       <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
//         <h2 className="text-3xl font-semibold text-white text-center mb-3">
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </h2>
//         <p className="text-center text-sm mb-6">
//           Please {state === "Sign Up" ? "Sign Up" : "Login"} to book appointment
//         </p>
//         <form onSubmit={onSubmitHandler}>
//           {state === "Sign Up" && (
//             <InputField
//               icon={assets.person_icon}
//               type="text"
//               placeholder="Enter Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           )}
//           <InputField
//             icon={assets.mail_icon}
//             type="email"
//             placeholder="Enter Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <InputField
//             icon={assets.lock_icon}
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {state !== "Sign Up" && (
//             <p
//               onClick={() => navigate("/reset-password")}
//               className="mb-4 text-indigo-500 cursor-pointer"
//             >
//               Forgot Password?
//             </p>
//           )}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium hover:from-indigo-700 hover:to-violet-800 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading
//               ? "Loading..."
//               : state === "Sign Up"
//               ? "Create Account"
//               : "Login"}
//           </button>
//         </form>
//         <p className="text-gray-400 text-center text-xs mt-4">
//           {state === "Sign Up"
//             ? "Already have an account?"
//             : "Don't have an account?"}{" "}
//           <span
//             onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
//             className="text-blue-400 cursor-pointer underline"
//           >
//             {state === "Sign Up" ? "Login here" : "Sign Up"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { backendurl, token, setToken, setIsLoggedin } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/my-profile");
  }, [token, navigate]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (token) {
  //     toast.error("You're already logged in. Logout first.");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const url =
  //       mode === "signup"
  //         ? `${backendurl}/api/user/register`
  //         : `${backendurl}/api/user/login`;

  //     const payload =
  //       mode === "signup" ? { name, email, password } : { email, password };

  //     const { data } = await axios.post(url, payload);

  //     if (data.success) {
  //       localStorage.setItem("token", data.token);
  //       setToken(data.token);
  //       setIsLoggedin(true);
  //       navigate(mode === "signup" ? "/email-verify" : "/");
  //       toast.success(
  //         mode === "signup"
  //           ? "Account created! Check your email"
  //           : "Welcome back!"
  //       );
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "An error occurred");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (token) {
      toast.error("You're already logged in. Logout first.");
      return;
    }

    setIsLoading(true);
    try {
      const url =
        mode === "signup"
          ? `${backendurl}/api/user/register`
          : `${backendurl}/api/user/login`;

      const payload =
        mode === "signup" ? { name, email, password } : { email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days from now

        localStorage.setItem("token", data.token);
        localStorage.setItem("expiresAt", expiresAt); // Store expiry time
        setToken(data.token);
        setIsLoggedin(true);

        navigate(mode === "signup" ? "/email-verify" : "/");
        toast.success(
          mode === "signup"
            ? "Account created! Check your email"
            : "Welcome back!"
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            {mode === "login" ? "Welcome Back" : "Get Started"}
          </h1>
          <p className="text-indigo-100">
            {mode === "login"
              ? "Sign in to continue your health journey"
              : "Create your account in seconds"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {mode === "signup" && (
            <div className="relative">
              <FiUser className="absolute top-4 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                required
              />
            </div>
          )}

          <div className="relative">
            <FiMail className="absolute top-4 left-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-4 left-4 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              required
            />
          </div>

          {mode === "login" && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/reset-password")}
                className="text-sm text-indigo-600 hover:text-indigo-800 transition"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-all font-medium disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {mode === "login" ? "Sign In" : "Create Account"}
                <FiArrowRight className="text-lg" />
              </>
            )}
          </button>

          <p className="text-center text-gray-600">
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-indigo-600 hover:text-indigo-800 font-medium transition"
            >
              {mode === "login" ? "Sign up here" : "Sign in here"}
            </button>
          </p>
        </form>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-8 w-24 h-24 bg-indigo-100 rounded-full opacity-20" />
      <div className="absolute top-8 right-8 w-16 h-16 bg-indigo-100 rounded-full opacity-20" />
      <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-indigo-100 rounded-full opacity-20" />
    </div>
  );
};

export default Login;
