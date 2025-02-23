import express from "express";
import {
  allDoctorsList,
  loginDoctor,
  doctorAppointments,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", allDoctorsList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, doctorAppointments);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);

export default doctorRouter;
