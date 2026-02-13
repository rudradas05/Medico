import express from "express";
import {
  updateUserData,
  getUserData,
  isAuthenticated,
  loginUser,
  registerUser,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
  bookAppointment,
  appointmentsList,
  rescheduleAppointment,
  submitDoctorReview,
  testimonialsList,
  cancelAppointment,
  createCheckoutSession,
  verifyPayment,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
// userRouter.post("/logout", logoutUser);
userRouter.post("/send-verify-otp", authUser, sendVerifyOtp);
userRouter.post("/verify-account", authUser, verifyEmail);
userRouter.get("/is-auth", authUser, isAuthenticated);
userRouter.post("/send-reset-otp", sendResetOtp);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/get-user-data", authUser, getUserData);
userRouter.post(
  "/update-user-data",
  upload.single("image"),
  authUser,
  updateUserData
);

userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointment", authUser, appointmentsList);
userRouter.post("/reschedule-appointment", authUser, rescheduleAppointment);
userRouter.post("/submit-review", authUser, submitDoctorReview);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.get("/testimonials", testimonialsList);

userRouter.post("/create-checkout-session", authUser, createCheckoutSession);

userRouter.post("/verify-payment", authUser, verifyPayment);

export default userRouter;
