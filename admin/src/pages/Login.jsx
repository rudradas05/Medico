import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAdmintoken, backendurl } = useContext(AdminContext);
  const { setDoctortoken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendurl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("admintoken", data.token);
          setAdmintoken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendurl}/api/doctor/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("doctortoken", data.token);

          setDoctortoken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex min-h-screen items-center justify-center px-4 py-8"
    >
      <div className="admin-panel m-auto flex min-w-[340px] flex-col items-start gap-3 rounded-2xl p-8 text-sm text-[#5E5E5E] sm:min-w-96">
        <p className="m-auto text-2xl font-semibold">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="mt-3 w-full">
          <p className="mb-1 text-slate-700">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="admin-input"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="w-full">
          <p className="mb-1 text-slate-700">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="admin-input"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="admin-button mt-2 w-full py-2.5 text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p className="pt-1 text-slate-600">
            Doctor Login{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="pt-1 text-slate-600">
            Admin Login{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
