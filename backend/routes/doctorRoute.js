import express from "express";
import {
  allDoctorsList,
  loginDoctor,
  doctorAppointments,
  appointmentComplete,
  appointmentCancel,
  addPrescription,
  doctorDashboard,
  getDoctorData,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", allDoctorsList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, doctorAppointments);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.post("/add-prescription", authDoctor, addPrescription);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/get-doctor-data", authDoctor, getDoctorData);
doctorRouter.post("/update-doctor-data", authDoctor, updateDoctorProfile);

export default doctorRouter;
