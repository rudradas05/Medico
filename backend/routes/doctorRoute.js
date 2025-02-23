import express from "express";
import {
  allDoctorsList,
  loginDoctor,
  doctorAppointments,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  getDoctorData,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";
import userRouter from "./userRoute.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", allDoctorsList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, doctorAppointments);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/get-doctor-data", authDoctor, getDoctorData);
doctorRouter.post("/update-doctor-data", authDoctor, updateDoctorProfile);

export default doctorRouter;
