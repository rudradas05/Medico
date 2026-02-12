import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiLock, FiMail, FiUser } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (token) {
      toast.error("You are already signed in. Please sign out to switch accounts.");
      return;
    }

    setIsLoading(true);
    try {
      const url =
        mode === "signup"
          ? `${backendurl}/api/user/register`
          : `${backendurl}/api/user/login`;

      const payload = mode === "signup" ? { name, email, password } : { email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem("token", data.token);
        localStorage.setItem("expiresAt", expiresAt);
        setToken(data.token);
        setIsLoggedin(true);

        navigate(mode === "signup" ? "/email-verify" : "/");
        toast.success(mode === "signup" ? "Account created" : "Welcome back");
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-[0_16px_35px_rgba(15,118,110,0.12)]"
      >
        <div className="bg-gradient-to-r from-teal-700 to-emerald-500 px-6 py-8 text-white">
          <p className="text-xs uppercase tracking-widest text-teal-100">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            {mode === "login" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="mt-2 text-sm text-teal-50">
            {mode === "login"
              ? "Access your profile, appointments, and care services."
              : "Join Medico and start managing your health journey."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {mode === "signup" && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</span>
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
                  placeholder="Your full name"
                />
              </div>
            </label>
          )}

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Email</span>
            <div className="relative">
              <FiMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
                placeholder="your.email@example.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Password</span>
            <div className="relative">
              <FiLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
                placeholder="Enter password"
              />
            </div>
          </label>

          {mode === "login" && (
            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="text-xs font-medium text-teal-700 transition hover:text-teal-800"
            >
              Forgot password?
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                {mode === "login" ? "Sign In" : "Create Account"}
                <FiArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            {mode === "login" ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode((prev) => (prev === "login" ? "signup" : "login"))}
              className="font-semibold text-teal-700 hover:text-teal-800"
            >
              {mode === "login" ? "Create account" : "Sign in"}
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
