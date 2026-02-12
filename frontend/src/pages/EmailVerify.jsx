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
  const [timer, setTimer] = useState(360);
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
    const paste = e.clipboardData.getData("text").trim();
    const pasteArray = paste.slice(0, 6).split("");

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
        setTimer(360);
        setCanResend(false);
        setIsOtpInvalid(false);
      } else {
        toast.error(data.message, toastConfig);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong", toastConfig);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((input) => input?.value || "");
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
  }, [isVerified, isLoggedin, userData, navigate]);

  useEffect(() => {
    let countdown;

    if (isOtpSubmitted && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer <= 0) {
      setCanResend(true);
    }

    return () => clearInterval(countdown);
  }, [isOtpSubmitted, timer]);

  return (
    <div className="min-h-[88vh] flex items-center justify-center bg-gradient-to-b from-teal-50 via-white to-teal-50 px-4 py-10">
      <div className="premium-panel w-full max-w-md rounded-3xl p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Verify Your Email
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            We have sent a 6-digit code to your registered email address.
          </p>
        </div>

        {!isOtpSubmitted ? (
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-2xl border border-teal-100 bg-teal-50/80 p-4 sm:p-5 text-center">
              <p className="text-teal-700 text-sm sm:text-base">
                Click below to receive your verification code.
              </p>
            </div>
            <button
              onClick={sendVerificationOtp}
              className="w-full py-3 sm:py-4 rounded-xl bg-primary hover:bg-teal-600 text-white font-semibold transition-colors"
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
                      inputMode="numeric"
                      className="w-10 h-10 sm:w-14 sm:h-14 bg-white text-slate-900 text-center text-xl sm:text-2xl font-medium rounded-xl border-2 border-teal-100 focus:border-primary focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                      ref={(el) => (inputRefs.current[index] = el)}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
              </div>

              {isOtpInvalid && (
                <p className="text-red-600 text-sm text-center">
                  Please enter a valid 6-digit code.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 sm:py-4 rounded-xl bg-primary hover:bg-teal-600 text-white font-semibold transition-colors"
            >
              Verify Account
            </button>

            <div className="text-center text-sm text-slate-500">
              {canResend ? (
                <button
                  type="button"
                  onClick={sendVerificationOtp}
                  className="text-teal-700 hover:text-teal-800 hover:underline font-medium"
                >
                  Resend OTP
                </button>
              ) : (
                <p>
                  You can resend OTP in{" "}
                  <span className="font-semibold text-slate-800">
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
