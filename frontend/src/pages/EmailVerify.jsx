// // import React, { useContext, useState, useRef, useEffect } from "react";
// // import axios from "axios";
// // import { AppContext } from "../context/AppContext";
// // import { toast } from "react-toastify";
// // import { useNavigate } from "react-router-dom";

// // const EmailVerify = () => {
// //   const { backendurl, token, userData, isLoggedin } = useContext(AppContext);
// //   const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

// //   const [isOtpInvalid, setIsOtpInvalid] = useState(false);

// //   const navigate = useNavigate();
// //   const inputRefs = useRef([]);

// //   const handleInput = (e, index) => {
// //     const { value } = e.target;
// //     if (value.length > 0 && index < inputRefs.current.length - 1) {
// //       inputRefs.current[index + 1].focus();
// //     }
// //   };

// //   const handleKeyDown = (e, index) => {
// //     if (e.key === "Backspace" && e.target.value === "" && index > 0) {
// //       inputRefs.current[index - 1].focus();
// //     }
// //   };

// //   const handlePaste = (e) => {
// //     const paste = e.clipboardData.getData("text");
// //     const pasteArray = paste.split("");
// //     pasteArray.forEach((char, index) => {
// //       if (inputRefs.current[index]) {
// //         inputRefs.current[index].value = char;
// //       }
// //     });
// //   };

// //   const sendVerificationOtp = async () => {
// //     try {
// //       const userId = userData.userId;
// //       const { data } = await axios.post(
// //         `${backendurl}/api/user/send-verify-otp`,
// //         { userId },
// //         { headers: { token } }
// //       );

// //       if (data.success) {
// //         toast.success("Verification OTP sent successfully");
// //         setIsOtpSubmitted(true);
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       console.error("Error:", error.response?.data || error.message);
// //       toast.error(error.message || "Something went wrong");
// //     }
// //   };

// //   const verifyOtp = async (e) => {
// //     e.preventDefault();
// //     const otpArray = inputRefs.current.map((e) => e.value);
// //     const enteredOtp = otpArray.join("");

// //     if (enteredOtp.length !== 6) {
// //       setIsOtpInvalid(true);
// //       toast.error("Please enter a valid 6-digit OTP.");
// //       return;
// //     }

// //     try {
// //       const userId = userData.userId;
// //       const { data } = await axios.post(
// //         `${backendurl}/api/user/verify-account`,
// //         { userId, otp: enteredOtp },
// //         { headers: { token } }
// //       );

// //       if (data.success) {
// //         toast.success("Email verified successfully!");
// //         navigate("/my-profile");
// //       } else {
// //         setIsOtpInvalid(true);
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       console.error("Error:", error.response?.data || error.message);
// //       toast.error(error.message || "Verification failed");
// //     }
// //   };

// //   const inputClass = (index) =>
// //     `w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md ${
// //       isOtpInvalid && inputRefs.current[index]?.value === ""
// //         ? "border-red-500"
// //         : ""
// //     }`;

// //   useEffect(() => {
// //     isLoggedin && userData && userData.isAccoutverified && navigate("/");
// //   }, [isLoggedin, userData]);

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-[80vh]">
// //       <h1 className="text-2xl font-semibold mb-4">Welcome to Medico App</h1>
// //       <p className="mb-6 text-center">
// //         For the first time and to stay updated with us, please verify your
// //         email.
// //       </p>

// //       {!isOtpSubmitted ? (
// //         <button
// //           onClick={sendVerificationOtp}
// //           className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium"
// //         >
// //           Send Verification OTP
// //         </button>
// //       ) : (
// //         <form
// //           onSubmit={verifyOtp}
// //           className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
// //         >
// //           <h1 className="text-white text-2xl font-semibold text-center mb-4">
// //             Verify Email
// //           </h1>
// //           <p className="text-center mb-6 text-indigo-300">
// //             Enter the 6-digit code sent to your email ID.
// //           </p>
// //           <div className="flex justify-between mb-8" onPaste={handlePaste}>
// //             {Array(6)
// //               .fill("")
// //               .map((_, index) => (
// //                 <input
// //                   key={index}
// //                   type="text"
// //                   maxLength="1"
// //                   className={inputClass(index)}
// //                   ref={(el) => (inputRefs.current[index] = el)}
// //                   onInput={(e) => handleInput(e, index)}
// //                   onKeyDown={(e) => handleKeyDown(e, index)}
// //                 />
// //               ))}
// //           </div>
// //           <button
// //             type="submit"
// //             className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium"
// //           >
// //             Verify OTP
// //           </button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // };

// // export default EmailVerify;

// import React, { useContext, useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// // Toast configuration object
// const toastConfig = {
//   position: "top-right",
//   autoClose: 5000, // 5 seconds
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   theme: "colored",
// };

// const EmailVerify = () => {
//   const { backendurl, token, userData, isLoggedin, isVerified } =
//     useContext(AppContext);
//   const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
//   const [isOtpInvalid, setIsOtpInvalid] = useState(false);

//   const navigate = useNavigate();
//   const inputRefs = useRef([]);

//   const handleInput = (e, index) => {
//     const { value } = e.target;
//     if (value.length > 0 && index < inputRefs.current.length - 1) {
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

//   const sendVerificationOtp = async () => {
//     try {
//       const userId = userData.userId;
//       const { data } = await axios.post(
//         `${backendurl}/api/user/send-verify-otp`,
//         { userId },
//         { headers: { token } }
//       );

//       if (data.success) {
//         toast.success("Verification OTP sent successfully", toastConfig); // Improved toast notification
//         setIsOtpSubmitted(true);
//       } else {
//         toast.error(data.message, toastConfig); // Improved error toast
//       }
//     } catch (error) {
//       console.error("Error:", error.response?.data || error.message);
//       toast.error(error.message || "Something went wrong", toastConfig); // Improved error toast
//     }
//   };

//   const verifyOtp = async (e) => {
//     e.preventDefault();
//     const otpArray = inputRefs.current.map((e) => e.value);
//     const enteredOtp = otpArray.join("");

//     if (enteredOtp.length !== 6) {
//       setIsOtpInvalid(true);
//       toast.error("Please enter a valid 6-digit OTP.", toastConfig); // Improved error toast
//       return;
//     }

//     try {
//       const userId = userData.userId;
//       const { data } = await axios.post(
//         `${backendurl}/api/user/verify-account`,
//         { userId, otp: enteredOtp },
//         { headers: { token } }
//       );

//       if (data.success) {
//         toast.success("Email verified successfully!", toastConfig); // Improved toast notification
//         navigate("/my-profile");
//       } else {
//         setIsOtpInvalid(true);
//         toast.error(data.message, toastConfig); // Improved error toast
//       }
//     } catch (error) {
//       console.error("Error:", error.response?.data || error.message);
//       toast.error(error.message || "Verification failed", toastConfig); // Improved error toast
//     }
//   };

//   const inputClass = (index) =>
//     `w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md ${
//       isOtpInvalid && inputRefs.current[index]?.value === ""
//         ? "border-red-500"
//         : ""
//     }`;

//   useEffect(() => {
//     !isVerified &&
//       isLoggedin &&
//       userData &&
//       userData.isAccoutverified &&
//       navigate("/");
//   }, [isLoggedin, userData]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[80vh]">
//       <h1 className="text-2xl font-semibold mb-4">Welcome to Medico App</h1>
//       <p className="mb-6 text-center">
//         For the first time and to stay updated with us, please verify your
//         email.
//       </p>

//       {!isOtpSubmitted ? (
//         <button
//           onClick={sendVerificationOtp}
//           className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-900 text-white font-medium"
//         >
//           Send Verification OTP
//         </button>
//       ) : (
//         <form
//           onSubmit={verifyOtp}
//           className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
//         >
//           <h1 className="text-white text-2xl font-semibold text-center mb-4">
//             Verify Email
//           </h1>
//           <p className="text-center mb-6 text-indigo-300">
//             Enter the 6-digit code sent to your email ID.
//           </p>
//           <div className="flex justify-between mb-8" onPaste={handlePaste}>
//             {Array(6)
//               .fill("")
//               .map((_, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   maxLength="1"
//                   className={inputClass(index)}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   onInput={(e) => handleInput(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
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
//     </div>
//   );
// };

// export default EmailVerify;

import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

const EmailVerify = () => {
  const { backendurl, token, userData, isLoggedin, isVerified } =
    useContext(AppContext);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);

  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    const { value } = e.target;
    if (value.length > 0 && index < inputRefs.current.length - 1) {
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

  const sendVerificationOtp = async () => {
    try {
      const userId = userData.userId;
      const { data } = await axios.post(
        `${backendurl}/api/user/send-verify-otp`,
        { userId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Verification OTP sent successfully", toastConfig); // Improved toast notification
        setIsOtpSubmitted(true);
      } else {
        toast.error(data.message, toastConfig); // Improved error toast
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.message || "Something went wrong", toastConfig); // Improved error toast
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const enteredOtp = otpArray.join("");

    if (enteredOtp.length !== 6) {
      setIsOtpInvalid(true);
      toast.error("Please enter a valid 6-digit OTP.", toastConfig); // Improved error toast
      return;
    }

    try {
      const userId = userData.userId;
      const { data } = await axios.post(
        `${backendurl}/api/user/verify-account`,
        { userId, otp: enteredOtp },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Email verified successfully!", toastConfig); // Improved toast notification
        navigate("/my-profile");
      } else {
        setIsOtpInvalid(true);
        toast.error(data.message, toastConfig); // Improved error toast
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.message || "Verification failed", toastConfig); // Improved error toast
    }
  };

  const inputClass = (index) =>
    `w-14 h-14 bg-white text-gray-900 text-center text-2xl font-medium rounded-lg border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all ${
      isOtpInvalid && inputRefs.current[index]?.value === ""
        ? "border-red-500"
        : "border-gray-300"
    }`;

  useEffect(() => {
    !isVerified &&
      isLoggedin &&
      userData &&
      userData.isAccoutverified &&
      navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to your email address
          </p>
        </div>

        {!isOtpSubmitted ? (
          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-lg p-6 text-center">
              <p className="text-indigo-700">
                Click below to receive your verification code
              </p>
            </div>
            <button
              onClick={sendVerificationOtp}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
            >
              Send Verification Code
            </button>
          </div>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between gap-2" onPaste={handlePaste}>
                {Array(6)
                  .fill("")
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className={inputClass(index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
              </div>

              {isOtpInvalid && (
                <p className="text-red-600 text-sm text-center">
                  Please enter a valid 6-digit code
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
            >
              Verify Account
            </button>

            <p className="text-center text-gray-600 text-sm">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={sendVerificationOtp}
                className="text-indigo-600 font-semibold hover:text-indigo-700"
              >
                Resend Code
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
