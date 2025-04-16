// import React, { useContext, useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const toastConfig = {
//   position: "top-right",
//   autoClose: 5000,
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
//         toast.success("Verification OTP sent successfully", toastConfig);
//         setIsOtpSubmitted(true);
//       } else {
//         toast.error(data.message, toastConfig);
//       }
//     } catch (error) {
//       toast.error(error.message || "Something went wrong", toastConfig);
//     }
//   };

//   const verifyOtp = async (e) => {
//     e.preventDefault();
//     const otpArray = inputRefs.current.map((e) => e.value);
//     const enteredOtp = otpArray.join("");

//     if (enteredOtp.length !== 6) {
//       setIsOtpInvalid(true);
//       toast.error("Please enter a valid 6-digit OTP.", toastConfig);
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
//         toast.success("Email verified successfully!", toastConfig);
//         navigate("/my-profile");
//       } else {
//         setIsOtpInvalid(true);
//         toast.error(data.message, toastConfig);
//       }
//     } catch (error) {
//       toast.error(error.message || "Verification failed", toastConfig);
//     }
//   };

//   useEffect(() => {
//     !isVerified &&
//       isLoggedin &&
//       userData &&
//       userData.isAccoutverified &&
//       navigate("/");
//   }, [isLoggedin, userData]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 md:px-8">
//       <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl sm:p-8">
//         <div className="text-center mb-6 sm:mb-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//             Verify Your Email
//           </h1>
//           <p className="text-gray-600 text-sm sm:text-base">
//             We've sent a 6-digit code to your email address
//           </p>
//         </div>

//         {!isOtpSubmitted ? (
//           <div className="space-y-4 sm:space-y-6">
//             <div className="bg-indigo-50 rounded-lg p-4 sm:p-6 text-center">
//               <p className="text-indigo-700 text-sm sm:text-base">
//                 Click below to receive your verification code
//               </p>
//             </div>
//             <button
//               onClick={sendVerificationOtp}
//               className="w-full py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
//             >
//               Send Verification Code
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={verifyOtp} className="space-y-6 sm:space-y-8">
//             <div className="space-y-4">
//               <div
//                 className="flex justify-between gap-2 sm:gap-3"
//                 onPaste={handlePaste}
//               >
//                 {Array(6)
//                   .fill("")
//                   .map((_, index) => (
//                     <input
//                       key={index}
//                       type="text"
//                       maxLength="1"
//                       className="w-10 h-10 sm:w-14 sm:h-14  bg-white text-gray-900 text-center text-xl sm:text-2xl font-medium rounded-lg border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
//                       ref={(el) => (inputRefs.current[index] = el)}
//                       onInput={(e) => handleInput(e, index)}
//                       onKeyDown={(e) => handleKeyDown(e, index)}
//                     />
//                   ))}
//               </div>

//               {isOtpInvalid && (
//                 <p className="text-red-600 text-sm text-center">
//                   Please enter a valid 6-digit code
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
//             >
//               Verify Account
//             </button>
//           </form>
//         )}
//       </div>
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
  const [timer, setTimer] = useState(360); // 6 minutes = 360 seconds
  const [canResend, setCanResend] = useState(false);

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
        toast.success("Verification OTP sent successfully", toastConfig);
        setIsOtpSubmitted(true);
        setTimer(360); // Reset timer to 6 minutes
        setCanResend(false);
      } else {
        toast.error(data.message, toastConfig);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong", toastConfig);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const enteredOtp = otpArray.join("");

    if (enteredOtp.length !== 6) {
      setIsOtpInvalid(true);
      toast.error("Please enter a valid 6-digit OTP.", toastConfig);
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
        toast.success("Email verified successfully!", toastConfig);
        navigate("/my-profile");
      } else {
        setIsOtpInvalid(true);
        toast.error(data.message, toastConfig);
      }
    } catch (error) {
      toast.error(error.message || "Verification failed", toastConfig);
    }
  };

  useEffect(() => {
    if (!isVerified && isLoggedin && userData?.isAccoutverified) {
      navigate("/");
    }
  }, [isLoggedin, userData]);

  useEffect(() => {
    let countdown;
    if (isOtpSubmitted && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer <= 0) {
      setCanResend(true);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [isOtpSubmitted, timer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            We've sent a 6-digit code to your email address
          </p>
        </div>

        {!isOtpSubmitted ? (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-indigo-50 rounded-lg p-4 sm:p-6 text-center">
              <p className="text-indigo-700 text-sm sm:text-base">
                Click below to receive your verification code
              </p>
            </div>
            <button
              onClick={sendVerificationOtp}
              className="w-full py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
            >
              Send Verification Code
            </button>
          </div>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <div
                className="flex justify-between gap-2 sm:gap-3"
                onPaste={handlePaste}
              >
                {Array(6)
                  .fill("")
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-10 h-10 sm:w-14 sm:h-14 bg-white text-gray-900 text-center text-xl sm:text-2xl font-medium rounded-lg border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
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
              className="w-full py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
            >
              Verify Account
            </button>

            <div className="text-center text-sm text-gray-500">
              {canResend ? (
                <button
                  type="button"
                  onClick={sendVerificationOtp}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Resend OTP
                </button>
              ) : (
                <p>
                  You can resend OTP in{" "}
                  <span className="font-semibold text-gray-800">
                    {String(Math.floor(timer / 60)).padStart(2, "0")}:
                    {String(timer % 60).padStart(2, "0")}
                  </span>
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
