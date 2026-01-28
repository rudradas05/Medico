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

  const { backendurl, token, setToken, isLoggedin, setIsLoggedin } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/my-profile");
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (token) {
      toast.error("You're already signed in. Please sign out to switch accounts.");
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
        const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem("token", data.token);
        localStorage.setItem("expiresAt", expiresAt);
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
