import express from "express";
import authUser from "../middlewares/authUser.js";
import authAdmin from "../middlewares/authAdmin.js";
import upload from "../middlewares/multer.js";
import {
  listServices,
  getServiceById,
  bookService,
  getUserServiceBookings,
  cancelServiceBooking,
  rescheduleServiceBooking,
  createServiceCheckoutSession,
  verifyServicePayment,
  addService,
  updateService,
  deleteService,
  getAllServiceBookings,
  completeServiceBooking,
  adminCancelServiceBooking,
} from "../controllers/serviceController.js";

const serviceRouter = express.Router();

// Public routes
serviceRouter.get("/list", listServices);

// User routes (auth required)
serviceRouter.post("/book", authUser, bookService);
serviceRouter.post("/user/bookings", authUser, getUserServiceBookings);
serviceRouter.post("/cancel-booking", authUser, cancelServiceBooking);
serviceRouter.post("/reschedule-booking", authUser, rescheduleServiceBooking);
serviceRouter.post(
  "/create-checkout-session",
  authUser,
  createServiceCheckoutSession,
);
serviceRouter.post("/verify-payment", authUser, verifyServicePayment);

// Admin routes
serviceRouter.post("/admin/add", authAdmin, upload.single("image"), addService);
serviceRouter.post(
  "/admin/update",
  authAdmin,
  upload.single("image"),
  updateService,
);
serviceRouter.post("/admin/delete", authAdmin, deleteService);
serviceRouter.get("/admin/bookings", authAdmin, getAllServiceBookings);
serviceRouter.post(
  "/admin/complete-booking",
  authAdmin,
  completeServiceBooking,
);
serviceRouter.post(
  "/admin/cancel-booking",
  authAdmin,
  adminCancelServiceBooking,
);

// Wildcard route MUST be last to avoid catching named routes
serviceRouter.get("/:id", getServiceById);

export default serviceRouter;
