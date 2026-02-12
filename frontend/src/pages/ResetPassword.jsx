import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
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

const panelClass =
  "premium-panel w-full text-sm rounded-3xl border border-teal-100 p-7 sm:p-8";

const inputWrapClass =
  "flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-teal-100 bg-white transition-all duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-teal-100";

const primaryBtnClass =
  "w-full py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-teal-600 active:scale-[0.99] transition-all duration-200";

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
    const paste = e.clipboardData.getData("text").trim();
    const pasteArray = paste.slice(0, 6).split("");

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const sendOtp = async () => {
    try {
      toast.info("Sending OTP...", toastConfig);
      const { data } = await axios.post(`${backendurl}/api/user/send-reset-otp`, {
        email,
      });

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    await sendOtp();
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    const enteredOtp = inputRefs.current.map((input) => input?.value || "").join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.", toastConfig);
      return;
    }

    setOtp(enteredOtp);
    setIsOtpSubmitted(true);
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();

    try {
      toast.info("Resetting password...", toastConfig);
      const { data } = await axios.post(`${backendurl}/api/user/reset-password`, {
        email,
        otp,
        newPassword,
      });

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
    <div className="min-h-[90vh] bg-gradient-to-b from-teal-50 via-white to-teal-50 flex items-center justify-center px-4 py-10">
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className={`${panelClass} max-w-md`}>
          <div className="text-center mb-8">
            <h1 className="text-slate-900 text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-slate-600">
              Enter your registered email to receive a reset OTP.
            </p>
          </div>

          <div className="mb-6">
            <div className={inputWrapClass}>
              <img src={assets.mail_icon} alt="Email" className="w-4 h-4 opacity-70" />
              <input
                className="bg-transparent outline-none text-slate-800 placeholder-slate-400 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="Enter Email"
              />
            </div>
          </div>

          <button type="submit" className={primaryBtnClass}>
            Send Reset OTP
          </button>
        </form>
      )}

      {isEmailSent && !isOtpSubmitted && (
        <form onSubmit={onSubmitOtp} className={`${panelClass} max-w-[520px]`}>
          <div className="text-center mb-8">
            <h1 className="text-slate-900 text-3xl font-bold mb-2">Verify OTP</h1>
            <p className="text-slate-600">We have sent a 6-digit code to {email}</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between gap-2 sm:gap-3 mb-4" onPaste={handlePaste}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    inputMode="numeric"
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl border-2 border-teal-100 bg-white text-slate-900 text-center text-2xl font-semibold focus:border-primary focus:ring-4 focus:ring-teal-100 outline-none transition-all duration-150"
                    ref={(el) => (inputRefs.current[index] = el)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
            </div>
            <p className="text-center text-slate-500 text-sm">
              Can not find the code? Check spam folder or{" "}
              <button
                type="button"
                onClick={sendOtp}
                className="text-teal-700 hover:text-teal-800 underline font-medium"
              >
                resend OTP
              </button>
            </p>
          </div>

          <button type="submit" className={primaryBtnClass}>
            Verify and Continue
          </button>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitPassword} className={`${panelClass} max-w-md`}>
          <div className="text-center mb-8">
            <h1 className="text-slate-900 text-3xl font-bold mb-2">New Password</h1>
            <p className="text-slate-600">Create a strong, unique password.</p>
          </div>

          <div className="mb-6">
            <div className={inputWrapClass}>
              <img src={assets.lock_icon} alt="Password" className="w-4 h-4 opacity-70" />
              <input
                className="bg-transparent outline-none text-slate-800 placeholder-slate-400 w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                type="password"
                placeholder="Enter New Password"
              />
            </div>
          </div>

          <button type="submit" className={primaryBtnClass}>
            Update Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
