import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Stripe from "stripe";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const expiresIn = 7 * 24 * 60 * 60 * 1000;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      token,
      expiresAt: Date.now() + expiresIn,
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Medico",
      text: `Welcome to MEDICO App, ${name}. Your account has been created with email id: ${email}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const expiresIn = 7 * 24 * 60 * 60 * 1000;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      token,
      expiresAt: Date.now() + expiresIn,
    });
  } catch (error) {
    console.error("Error logging in user:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while logging in. Please try again later.",
    });
  }
};

const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (user.isAccoutverified) {
      return res.json({ success: false, message: "Account already verified" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyotp = otp;
    user.verifyotpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify your account",
      text: `Verify your account. Your verification code is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
    res.json({
      success: true,
      message: "Verification code sent to your email",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.verifyotpExpireAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Verification code expired" });
    }

    if (user.verifyotp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code" });
    }

    user.isAccoutverified = true;
    user.verifyotp = "";
    user.verifyotpExpireAt = 0;
    await user.save();

    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "email is required",
    });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Enter a valid email" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetotp = otp;
    user.resetOtpExpireAt = Date.now() + 300000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your password reset OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ success: false, message: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        return res.json({
          success: true,
          message: "Password reset OTP sent successfully",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }
    if (user.resetotp === "" || user.resetotp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetotp = "";
    user.resetOtpExpireAt = 0;
    await user.save();
    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const updateUserData = async (req, res) => {
  try {
    const {
      userId,
      name,
      phone,
      address,
      dob,
      gender,
      bloodGroup,
      allergies,
      medications,
      medicalHistory,
      bloodPressure,
      hasAllergies,
    } = req.body;
    const imageFile = req.file;
    if (
      !name ||
      !phone ||
      !address ||
      !dob ||
      !gender ||
      !bloodGroup ||
      !allergies ||
      !medications ||
      !medicalHistory ||
      !bloodPressure
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    await userModel.findByIdAndUpdate(userId, {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(address && { address }),
      ...(dob && { dob }),
      ...(gender && { gender }),
      ...(bloodGroup && { bloodGroup }),
      ...(allergies && { allergies }),
      ...(hasAllergies && { hasAllergies }),
      ...(medications && { medications }),
      ...(medicalHistory && { medicalHistory }),
      ...(bloodPressure && { bloodPressure }),
    });
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "User data updated successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    if (!userId || !docId || !slotDate || !slotTime) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const docData = await doctorModel.findById(docId).lean();
    if (!docData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    if (!docData.available) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor is not available" });
    }

    let slots_booked = docData.slots_booked || {};

    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res.json({ success: false, message: "Slot is already booked" });
    }

    slots_booked[slotDate] = [...(slots_booked[slotDate] || []), slotTime];

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      { slots_booked },
      { new: true }
    );

    if (!updatedDoctor) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update doctor's slots" });
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

    const newAppointment = new appointmentModel({
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    });

    await newAppointment.save();

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const appointmentsList = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointment = await appointmentModel.find({ userId });
    res.json({ success: true, appointment });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    if (!userId || !appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Not authorized" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    let slots_booked = doctorData.slots_booked;
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );
    }
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
      appointmentData,
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    const amount = Math.round(Number(appointmentData.amount) * 100);
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid appointment amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify-payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify-payment?session_id={CHECKOUT_SESSION_ID}`,
      line_items: [
        {
          price_data: {
            currency: process.env.CURRENCY || "INR",
            product_data: { name: "Doctor Consultation Fee" },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: { appointmentId: appointmentData._id.toString() },
    });

    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const verifyPayment = async (req, res) => {
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

    const appointmentId = session.metadata?.appointmentId;
    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid session metadata" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export {
  registerUser,
  loginUser,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
  getUserData,
  updateUserData,
  bookAppointment,
  appointmentsList,
  cancelAppointment,
  createCheckoutSession,
  verifyPayment,
};
