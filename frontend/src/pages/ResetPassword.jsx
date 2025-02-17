// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ResetPassword = () => {
//   const { backendurl } = useContext(AppContext);
//   axios.defaults.withCredentials = true;
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [isEmailSent, setIsEmailSent] = useState(false);
//   const [otp, setOtp] = useState(0);
//   const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
//   const inputRefs = React.useRef([]);
//   const handleInput = (e, index) => {
//     if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && e.target.value === "" && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };
//   const handlePaste = (e) => {
//     const paste = e.clipboardData.getData("text");
//     const pasteAArray = paste.split("");
//     pasteAArray.forEach((char, index) => {
//       if (inputRefs.current[index]) {
//         inputRefs.current[index].value = char;
//       }
//     });
//   };

//   const onSubmitEmail = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         backendurl + "/api/user/send-reset-otp",
//         { email }
//       );
//       data.success ? toast.success(data.message) : toast.error(data.message);
//       data.success && setIsEmailSent(true);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[80vh]">
//       {!isEmailSent && (
//         <form
//           onSubmit={onSubmitEmail}
//           className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
//         >
//           <h1 className="text-white text-2xl font-semibold text-center mb-4">
//             Reset Password
//           </h1>
//           <p className="text-center mb-6 text-indigo-300 ">
//             Enter Your Register Email
//           </p>
//           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.mail_icon} alt="" className="w-3 h-3" />
//             <input
//               className="bg-transparent outline-none text-white"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               type="email"
//               placeholder="Enter Email"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium"
//           >
//             Send Reset Otp
//           </button>
//         </form>
//       )}

//       {/* // otp enter form */}
//       {isOtpSubmitted && isEmailSent && (
//         <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
//           <h1 className="text-white text-2xl font-semibold text-center mb-4">
//             Enter Reset Otp
//           </h1>
//           <p className="text-center mb-6 text-indigo-300 ">
//             Enter the 6-digit code sent to your email id.
//           </p>
//           <div className="flex justify-between mb-8" onPaste={handlePaste}>
//             {Array(6)
//               .fill(0)
//               .map((_, index) => (
//                 <input
//                   type="text"
//                   maxLength="1"
//                   key={index}
//                   required
//                   className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
//                   ref={(e) => (inputRefs.current[index] = e)}
//                   onInput={(e) => handleInput(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                 />
//               ))}
//           </div>
//           <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium">
//             Verify OTP
//           </button>
//         </form>
//       )}

//       {/* enter new password */}
//       {isOtpSubmitted && isEmailSent && (
//         <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
//           <h1 className="text-white text-2xl font-semibold text-center mb-4">
//             New Password
//           </h1>
//           <p className="text-center mb-6 text-indigo-300 ">
//             Enter Your New Password
//           </p>
//           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.lock_icon} alt="" className="w-3 h-3" />
//             <input
//               className="bg-transparent outline-none text-white"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               type="password"
//               placeholder="Enter Password"
//             />
//           </div>
//           <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium">
//             Change Password
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ResetPassword;

// const onSubmitPassword = async (e) => {
//   e.preventDefault();
//   console.log(otp);
//   try {
//     const { data } = await axios.post(
//       backendurl + "/api/user/reset-password",
//       { email, otp, newPassword }
//     );
//     data.success ? toast.success(data.message) : toast.error(data.message);
//     data.success && navigate("/login");
//   } catch (error) {
//     toast.error(error.message);
//   }
// };

// const onSubmitPassword = async (e) => {
//   e.preventDefault();

//   try {
//     const { data } = await axios.post(
//       backendurl + "/api/user/reset-password",
//       { email, otp, newPassword }
//     );
//     data.success ? toast.success(data.message) : toast.error(data.message);
//     data.success && navigate("/login");
//   } catch (error) {
//     toast.error(error.message);
//     console.error(error.response?.data || error); // Log the error response
//   }
// };

// const onSubmitEmail = async (e) => {
//   e.preventDefault();
//   try {
//     const { data } = await axios.post(
//       backendurl + "/api/user/send-reset-otp",
//       { email }
//     );
//     if (data.success) {
//       toast.success(data.message);
//       setIsEmailSent(true);
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     toast.error(error.message);
//   }
// };

// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const ResetPassword = () => {
//   const { backendurl } = useContext(AppContext);
//   axios.defaults.withCredentials = true;
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [isEmailSent, setIsEmailSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
//   const navigate = useNavigate();
//   const inputRefs = React.useRef([]);
//   const toastConfig = {
//     position: "top-right",
//     autoClose: 5000, // 5 seconds
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "colored",
//   };

//   const handleInput = (e, index) => {
//     if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && e.target.value === "" && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     const paste = e.clipboardData.getData("text");
//     const pasteArray = paste.split("");
//     pasteArray.forEach((char, index) => {
//       if (inputRefs.current[index]) {
//         inputRefs.current[index].value = char;
//       }
//     });
//   };

//   const onSubmitEmail = async (e) => {
//     e.preventDefault();
//     try {
//       toast.info("Sending OTP...", toastConfig); // Indicate process start
//       const { data } = await axios.post(
//         `${backendurl}/api/user/send-reset-otp`,
//         { email }
//       );

//       if (data.success) {
//         toast.success(data.message, toastConfig);
//         setIsEmailSent(true);
//       } else {
//         toast.error(
//           data.message || "Failed to send OTP. Please try again.",
//           toastConfig
//         );
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Network error. Please try again.";
//       toast.error(errorMessage, toastConfig);
//     }
//   };

//   const onSubmitOtp = async (e) => {
//     e.preventDefault();
//     const otpArray = inputRefs.current.map((e) => e.value);
//     setOtp(otpArray.join(""));
//     setIsOtpSubmitted(true);
//   };

//   const onSubmitPassword = async (e) => {
//     e.preventDefault();
//     try {
//       toast.info("Resetting password...", toastConfig);
//       const { data } = await axios.post(
//         `${backendurl}/api/user/reset-password`,
//         { email, otp, newPassword }
//       );

//       if (data.success) {
//         toast.success(
//           "Password reset successful! Redirecting to login...",
//           toastConfig
//         );
//         navigate("/login");
//       } else {
//         toast.error(
//           data.message || "Failed to reset password. Please try again.",
//           toastConfig
//         );
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Network error. Please try again.";
//       toast.error(errorMessage, toastConfig);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[80vh]">
//       {!isEmailSent && (
//         <form
//           onSubmit={onSubmitEmail}
//           className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
//         >
//           <h1 className="text-white text-2xl font-semibold text-center mb-4">
//             Reset Password
//           </h1>
//           <p className="text-center mb-6 text-indigo-300">
//             Enter Your Registered Email
//           </p>
//           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.mail_icon} alt="" className="w-3 h-3" />
//             <input
//               className="bg-transparent outline-none text-white"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               type="email"
//               placeholder="Enter Email"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium"
//           >
//             Send Reset Otp
//           </button>
//         </form>
//       )}

//       {isEmailSent && !isOtpSubmitted && (
//         <form
//           onSubmit={onSubmitOtp}
//           className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
//         >
//           <h1 className="text-white text-2xl font-semibold text-center mb-4">
//             Enter Reset Otp
//           </h1>
//           <p className="text-center mb-6 text-indigo-300">
//             Enter the 6-digit code sent to your email id.
//           </p>
//           <div className="flex justify-between mb-8" onPaste={handlePaste}>
//             {Array(6)
//               .fill(0)
//               .map((_, index) => (
//                 <input
//                   type="text"
//                   maxLength="1"
//                   key={index}
//                   className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
//                   ref={(e) => (inputRefs.current[index] = e)}
//                   onInput={(e) => handleInput(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   onChange={(e) =>
//                     setOtp((prevOtp) => prevOtp + e.target.value)
//                   }
//                 />
//               ))}
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium"
//           >
//             Verify OTP
//           </button>
//         </form>
//       )}

//       {isOtpSubmitted && isEmailSent && (
//         <form
//           onSubmit={onSubmitPassword}
//           className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
//         >
//           <h1 className="text-white text-2xl font-semibold text-center mb-4">
//             New Password
//           </h1>
//           <p className="text-center mb-6 text-indigo-300">
//             Enter Your New Password
//           </p>
//           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.lock_icon} alt="" className="w-3 h-3" />
//             <input
//               className="bg-transparent outline-none text-white"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               type="password"
//               placeholder="Enter Password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium"
//           >
//             Change Password
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { backendurl } = useContext(AppContext);
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);
  const toastConfig = {
    position: "top-right",
    autoClose: 5000, // 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      toast.info("Sending OTP...", toastConfig); // Indicate process start
      const { data } = await axios.post(
        `${backendurl}/api/user/send-reset-otp`,
        { email }
      );

      if (data.success) {
        toast.success(data.message, toastConfig);
        setIsEmailSent(true);
      } else {
        toast.error(
          data.message || "Failed to send OTP. Please try again.",
          toastConfig
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Network error. Please try again.";
      toast.error(errorMessage, toastConfig);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      toast.info("Resetting password...", toastConfig);
      const { data } = await axios.post(
        `${backendurl}/api/user/reset-password`,
        { email, otp, newPassword }
      );

      if (data.success) {
        toast.success(
          "Password reset successful! Redirecting to login...",
          toastConfig
        );
        navigate("/login");
      } else {
        toast.error(
          data.message || "Failed to reset password. Please try again.",
          toastConfig
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Network error. Please try again.";
      toast.error(errorMessage, toastConfig);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800">
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-800 p-8 rounded-xl shadow-2xl w-96 text-sm border border-slate-700 transition-all duration-300 hover:shadow-3xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-bold mb-2">
              Reset Password
            </h1>
            <p className="text-slate-400">
              Enter your registered email to receive OTP
            </p>
          </div>

          <div className="mb-6 group">
            <div className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-slate-700 transition-all duration-200 focus-within:bg-slate-600 focus-within:ring-2 focus-within:ring-indigo-500">
              <img
                src={assets.mail_icon}
                alt=""
                className="w-4 h-4 opacity-70"
              />
              <input
                className="bg-transparent outline-none text-white placeholder-slate-400 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="Enter Email"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-200"
          >
            Send Reset OTP
          </button>
        </form>
      )}

      {isEmailSent && !isOtpSubmitted && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-800 p-8 rounded-xl shadow-2xl w-[480px] text-sm border border-slate-700"
        >
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-bold mb-2">Verify OTP</h1>
            <p className="text-slate-400">
              We've sent a 6-digit code to {email}
            </p>
          </div>

          <div className="mb-8">
            <div
              className="flex justify-between gap-3 mb-4"
              onPaste={handlePaste}
            >
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    className="w-14 h-14 bg-slate-700 text-white text-center text-2xl rounded-lg
                             focus:ring-2 focus:ring-indigo-500 focus:bg-slate-600 outline-none
                             transition-all duration-150 font-mono"
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onChange={(e) =>
                      setOtp((prevOtp) => prevOtp + e.target.value)
                    }
                  />
                ))}
            </div>
            <p className="text-center text-slate-400 text-sm">
              Can't find the code? Check spam folder or{" "}
              <button
                type="button"
                onClick={onSubmitEmail}
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                resend OTP
              </button>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-200"
          >
            Verify & Continue
          </button>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitPassword}
          className="bg-slate-800 p-8 rounded-xl shadow-2xl w-96 text-sm border border-slate-700"
        >
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-bold mb-2">New Password</h1>
            <p className="text-slate-400">Create a strong, unique password</p>
          </div>

          <div className="mb-6 group">
            <div className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-slate-700 transition-all duration-200 focus-within:bg-slate-600 focus-within:ring-2 focus-within:ring-indigo-500">
              <img
                src={assets.lock_icon}
                alt=""
                className="w-4 h-4 opacity-70"
              />
              <input
                className="bg-transparent outline-none text-white placeholder-slate-400 w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                type="password"
                placeholder="Enter New Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-200"
          >
            Update Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
