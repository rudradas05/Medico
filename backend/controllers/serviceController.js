import diagnosticServiceModel from "../models/diagnosticServiceModel.js";
import serviceBookingModel from "../models/serviceBookingModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import { v2 as cloudinary } from "cloudinary";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const isSlotInPast = (slotDate, slotTime) => {
  const parsed = new Date(`${slotDate} ${slotTime}`);
  if (Number.isNaN(parsed.getTime())) {
    return true;
  }
  return parsed <= new Date();
};

const extractFormat = (fileName = "", fallback = "") => {
  if (fallback) return String(fallback).toLowerCase();
  const parts = String(fileName || "").split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
};

const getReportAccessUrl = (booking) => {
  // The secure_url saved during upload is a permanent public URL.
  // Using it directly is the most reliable way to serve the file.
  return booking?.labReportUrl || "";
};

// ─── PUBLIC ────────────────────────────────────────────────────

const listServices = async (req, res) => {
  try {
    const services = await diagnosticServiceModel.find({});
    res.json({ success: true, services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await diagnosticServiceModel.findById(id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── USER (auth required) ──────────────────────────────────────

const bookService = async (req, res) => {
  try {
    const { userId, serviceId, slotDate, slotTime, paymentMethod } = req.body;

    if (!serviceId || !slotDate || !slotTime) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const service = await diagnosticServiceModel.findById(serviceId);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    if (!service.available) {
      return res
        .status(400)
        .json({ success: false, message: "Service is currently unavailable" });
    }

    // Check if the slot is already booked
    const slots_booked = service.slots_booked || {};
    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res
        .status(400)
        .json({ success: false, message: "This time slot is already booked" });
    }

    const userData = await userModel
      .findById(userId)
      .select("-password")
      .lean();
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const booking = new serviceBookingModel({
      userId,
      serviceId,
      serviceName: service.name,
      serviceImage: service.image,
      userData,
      amount: service.price,
      slotDate,
      slotTime,
      paymentMethod: paymentMethod || "cash",
      payment: paymentMethod === "cash" ? false : false,
      date: Date.now(),
    });

    await booking.save();

    // Mark the slot as booked in the service (same pattern as doctor appointments)
    let slots_booked_updated = service.slots_booked || {};
    slots_booked_updated[slotDate] = [
      ...(slots_booked_updated[slotDate] || []),
      slotTime,
    ];
    await diagnosticServiceModel.findByIdAndUpdate(serviceId, {
      slots_booked: slots_booked_updated,
    });

    res.status(201).json({
      success: true,
      message: "Service booked successfully",
      booking,
    });
  } catch (error) {
    console.error("Error booking service:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUserServiceBookings = async (req, res) => {
  try {
    const { userId } = req.body;
    const bookings = await serviceBookingModel
      .find({ userId })
      .sort({ date: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserServiceReportUrl = async (req, res) => {
  try {
    const { userId, bookingId } = req.body;

    if (!userId || !bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const booking = await serviceBookingModel.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (String(booking.userId) !== String(userId)) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action" });
    }

    if (!booking.labReportUrl && !booking.labReportPublicId) {
      return res
        .status(404)
        .json({ success: false, message: "Report not uploaded yet" });
    }

    const reportUrl = getReportAccessUrl(booking);
    if (!reportUrl) {
      return res
        .status(500)
        .json({ success: false, message: "Could not generate report URL" });
    }

    res.json({
      success: true,
      reportUrl,
      reportName: booking.labReportName || "Lab Report",
      reportMimeType: booking.labReportMimeType || "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const cancelServiceBooking = async (req, res) => {
  try {
    const { userId, bookingId } = req.body;
    if (!userId || !bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const booking = await serviceBookingModel.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    if (booking.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action" });
    }

    await serviceBookingModel.findByIdAndUpdate(bookingId, {
      cancelled: true,
    });

    // Release the slot
    const service = await diagnosticServiceModel.findById(booking.serviceId);
    if (service) {
      let slots_booked = service.slots_booked || {};
      if (slots_booked[booking.slotDate]) {
        slots_booked[booking.slotDate] = slots_booked[booking.slotDate].filter(
          (t) => t !== booking.slotTime,
        );
      }
      await diagnosticServiceModel.findByIdAndUpdate(booking.serviceId, {
        slots_booked,
      });
    }

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const rescheduleServiceBooking = async (req, res) => {
  try {
    const { userId, bookingId, slotDate, slotTime } = req.body;

    if (!userId || !bookingId || !slotDate || !slotTime) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const booking = await serviceBookingModel.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (String(booking.userId) !== String(userId)) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action" });
    }

    if (booking.cancelled) {
      return res.status(400).json({
        success: false,
        message: "Cancelled bookings cannot be rescheduled",
      });
    }

    if (booking.isCompleted) {
      return res.status(400).json({
        success: false,
        message: "Completed bookings cannot be rescheduled",
      });
    }

    if (isSlotInPast(booking.slotDate, booking.slotTime)) {
      return res.status(400).json({
        success: false,
        message: "Past bookings cannot be rescheduled",
      });
    }

    if (isSlotInPast(slotDate, slotTime)) {
      return res.status(400).json({
        success: false,
        message: "Please select a future slot",
      });
    }

    if (booking.slotDate === slotDate && booking.slotTime === slotTime) {
      return res.status(400).json({
        success: false,
        message: "Please choose a different slot",
      });
    }

    const targetSlotPath = `slots_booked.${slotDate}`;
    const oldSlotPath = `slots_booked.${booking.slotDate}`;

    const reserveSlot = await diagnosticServiceModel.updateOne(
      {
        _id: booking.serviceId,
        available: true,
        $or: [
          { [targetSlotPath]: { $exists: false } },
          { [targetSlotPath]: { $nin: [slotTime] } },
        ],
      },
      { $addToSet: { [targetSlotPath]: slotTime } },
    );

    if (!reserveSlot.modifiedCount) {
      return res.status(409).json({
        success: false,
        message: "Selected slot is no longer available",
      });
    }

    const updateBooking = await serviceBookingModel.updateOne(
      {
        _id: bookingId,
        userId,
        cancelled: false,
        isCompleted: false,
        slotDate: booking.slotDate,
        slotTime: booking.slotTime,
      },
      { $set: { slotDate, slotTime } },
    );

    if (!updateBooking.modifiedCount) {
      await diagnosticServiceModel.updateOne(
        { _id: booking.serviceId },
        { $pull: { [targetSlotPath]: slotTime } },
      );

      return res.status(409).json({
        success: false,
        message: "Booking changed while rescheduling. Please try again",
      });
    }

    await diagnosticServiceModel.updateOne(
      { _id: booking.serviceId },
      { $pull: { [oldSlotPath]: booking.slotTime } },
    );

    const serviceSlots = await diagnosticServiceModel
      .findById(booking.serviceId)
      .select("slots_booked")
      .lean();

    if (serviceSlots?.slots_booked?.[booking.slotDate]?.length === 0) {
      await diagnosticServiceModel.updateOne(
        { _id: booking.serviceId },
        { $unset: { [oldSlotPath]: 1 } },
      );
    }

    res.json({
      success: true,
      message: "Service booking rescheduled successfully",
      bookingId,
      slotDate,
      slotTime,
    });
  } catch (error) {
    console.error("Error rescheduling service booking:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const createServiceCheckoutSession = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await serviceBookingModel.findById(bookingId);
    if (!booking || booking.cancelled) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    const amount = Math.round(Number(booking.amount) * 100);
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify-payment?session_id={CHECKOUT_SESSION_ID}&type=service`,
      cancel_url: `${process.env.FRONTEND_URL}/verify-payment?session_id={CHECKOUT_SESSION_ID}&type=service`,
      line_items: [
        {
          price_data: {
            currency: process.env.CURRENCY || "INR",
            product_data: { name: `Diagnostic: ${booking.serviceName}` },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: { bookingId: booking._id.toString(), type: "service" },
    });

    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Error creating service checkout session:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const verifyServicePayment = async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res
        .status(400)
        .json({ success: false, message: "Session ID is missing" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session || session.payment_status !== "paid") {
      return res
        .status(400)
        .json({ success: false, message: "Payment not completed" });
    }

    const bookingId = session.metadata?.bookingId;
    if (!bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid session metadata" });
    }

    await serviceBookingModel.findByIdAndUpdate(bookingId, { payment: true });

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Service payment verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── ADMIN ─────────────────────────────────────────────────────

const addService = async (req, res) => {
  try {
    const { name, description, price, category, preTestInstructions } =
      req.body;

    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "Name, description and price are required",
      });
    }

    let imageUrl = "";
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    // preTestInstructions may arrive as a JSON string from FormData
    let parsedInstructions = preTestInstructions || [];
    if (typeof parsedInstructions === "string") {
      try {
        parsedInstructions = JSON.parse(parsedInstructions);
      } catch {
        parsedInstructions = [];
      }
    }

    const service = new diagnosticServiceModel({
      name,
      description,
      price: Number(price),
      image: imageUrl,
      category: category || "other",
      preTestInstructions: parsedInstructions,
      available: true,
    });

    await service.save();
    res.status(201).json({ success: true, message: "Service added", service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { serviceId, preTestInstructions, ...updateData } = req.body;
    if (!serviceId) {
      return res
        .status(400)
        .json({ success: false, message: "Service ID required" });
    }

    // Handle image upload if a new file is provided
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    // Handle preTestInstructions (may arrive as JSON string from FormData)
    if (preTestInstructions !== undefined) {
      if (typeof preTestInstructions === "string") {
        try {
          updateData.preTestInstructions = JSON.parse(preTestInstructions);
        } catch {
          updateData.preTestInstructions = preTestInstructions
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      } else {
        updateData.preTestInstructions = preTestInstructions;
      }
    }

    const service = await diagnosticServiceModel.findByIdAndUpdate(
      serviceId,
      updateData,
      { new: true },
    );
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, message: "Service updated", service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.body;
    if (!serviceId) {
      return res
        .status(400)
        .json({ success: false, message: "Service ID required" });
    }
    await diagnosticServiceModel.findByIdAndDelete(serviceId);
    res.json({ success: true, message: "Service deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllServiceBookings = async (req, res) => {
  try {
    const bookings = await serviceBookingModel.find({}).sort({ date: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAdminServiceReportUrl = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID required" });
    }

    const booking = await serviceBookingModel.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (!booking.labReportUrl && !booking.labReportPublicId) {
      return res
        .status(404)
        .json({ success: false, message: "Report not uploaded yet" });
    }

    const reportUrl = getReportAccessUrl(booking);
    if (!reportUrl) {
      return res
        .status(500)
        .json({ success: false, message: "Could not generate report URL" });
    }

    res.json({
      success: true,
      reportUrl,
      reportName: booking.labReportName || "Lab Report",
      reportMimeType: booking.labReportMimeType || "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const streamServiceReport = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const token = req.query.token || "";
    const admintoken = req.query.admintoken || "";

    // Verify at least one valid auth token
    const jwt = (await import("jsonwebtoken")).default;
    let authorised = false;
    let requestUserId = null;

    if (admintoken) {
      try {
        const decoded = jwt.verify(admintoken, process.env.JWT_SECRET);
        if (decoded === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
          authorised = true;
        }
      } catch (_) {}
    }

    if (!authorised && token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded?.id) {
          authorised = true;
          requestUserId = decoded.id;
        }
      } catch (_) {}
    }

    if (!authorised) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const booking = await serviceBookingModel.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // If user token, verify ownership
    if (requestUserId && String(booking.userId) !== String(requestUserId)) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const fileUrl = booking.labReportUrl;
    if (!fileUrl) {
      return res
        .status(404)
        .json({ success: false, message: "Report not uploaded yet" });
    }

    // Fetch the file from Cloudinary and pipe it with inline disposition
    const https = await import("https");
    const http = await import("http");
    const requestModule = fileUrl.startsWith("https") ? https : http;

    const fetchAndPipe = (url, redirectCount = 0) => {
      if (redirectCount > 5) {
        if (!res.headersSent) {
          return res
            .status(502)
            .json({ success: false, message: "Too many redirects" });
        }
        return;
      }

      requestModule
        .get(url, (upstream) => {
          // Follow redirects
          if (
            [301, 302, 303, 307, 308].includes(upstream.statusCode) &&
            upstream.headers.location
          ) {
            upstream.resume(); // consume response to free socket
            return fetchAndPipe(upstream.headers.location, redirectCount + 1);
          }

          if (upstream.statusCode < 200 || upstream.statusCode >= 300) {
            upstream.resume();
            if (!res.headersSent) {
              return res.status(502).json({
                success: false,
                message: "Could not fetch report file",
              });
            }
            return;
          }

          const contentType =
            booking.labReportMimeType ||
            upstream.headers["content-type"] ||
            "application/octet-stream";
          const fileName = booking.labReportName || "lab-report";

          res.setHeader("Content-Type", contentType);
          res.setHeader(
            "Content-Disposition",
            `inline; filename="${fileName}"`,
          );
          res.setHeader("Cache-Control", "private, max-age=300");

          upstream.pipe(res);
        })
        .on("error", (err) => {
          console.error("Report proxy fetch error:", err);
          if (!res.headersSent) {
            res.status(502).json({
              success: false,
              message: "Could not fetch report file",
            });
          }
        });
    };

    fetchAndPipe(fileUrl);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

const completeServiceBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID required" });
    }
    await serviceBookingModel.findByIdAndUpdate(bookingId, {
      isCompleted: true,
    });
    res.json({ success: true, message: "Booking marked as completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const adminCancelServiceBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID required" });
    }

    const booking = await serviceBookingModel.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    await serviceBookingModel.findByIdAndUpdate(bookingId, {
      cancelled: true,
    });

    // Release the slot
    const service = await diagnosticServiceModel.findById(booking.serviceId);
    if (service) {
      let slots_booked = service.slots_booked || {};
      if (slots_booked[booking.slotDate]) {
        slots_booked[booking.slotDate] = slots_booked[booking.slotDate].filter(
          (t) => t !== booking.slotTime,
        );
      }
      await diagnosticServiceModel.findByIdAndUpdate(booking.serviceId, {
        slots_booked,
      });
    }

    res.json({ success: true, message: "Booking cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const uploadServiceLabReport = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const reportFile = req.file;

    if (!bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID required" });
    }

    if (!reportFile) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload a report file" });
    }

    const booking = await serviceBookingModel.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (booking.cancelled) {
      return res.status(400).json({
        success: false,
        message: "Cannot upload report for a cancelled booking",
      });
    }

    if (!booking.isCompleted) {
      return res.status(400).json({
        success: false,
        message: "Complete the booking before uploading a report",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(reportFile.path, {
      resource_type: "raw",
      folder: "medico/lab-reports",
      use_filename: true,
      unique_filename: true,
    });

    booking.labReportUrl = uploadResult.secure_url;
    booking.labReportName = reportFile.originalname || "";
    booking.labReportMimeType = reportFile.mimetype || "";
    booking.labReportPublicId = uploadResult.public_id || "";
    booking.labReportFormat = extractFormat(
      reportFile.originalname,
      uploadResult.format,
    );
    booking.labReportResourceType = uploadResult.resource_type || "raw";
    booking.labReportUploadedAt = Date.now();

    await booking.save();

    const reportUrl = getReportAccessUrl(booking);

    res.json({
      success: true,
      message: "Lab report uploaded successfully",
      report: {
        url: reportUrl || booking.labReportUrl,
        name: booking.labReportName,
        mimeType: booking.labReportMimeType,
        uploadedAt: booking.labReportUploadedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  listServices,
  getServiceById,
  bookService,
  getUserServiceBookings,
  getUserServiceReportUrl,
  cancelServiceBooking,
  rescheduleServiceBooking,
  createServiceCheckoutSession,
  verifyServicePayment,
  addService,
  updateService,
  deleteService,
  getAllServiceBookings,
  getAdminServiceReportUrl,
  completeServiceBooking,
  adminCancelServiceBooking,
  uploadServiceLabReport,
  streamServiceReport,
};
