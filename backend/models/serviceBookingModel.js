import mongoose from "mongoose";

const serviceBookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diagnosticService",
      required: true,
    },
    serviceName: { type: String, required: true },
    serviceImage: { type: String, default: "" },
    userData: { type: Object, required: true },
    amount: { type: Number, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["cash", "online"],
      default: "cash",
    },
    payment: { type: Boolean, default: false },
    cancelled: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    date: { type: Number, default: Date.now },
  },
  { timestamps: true },
);

const serviceBookingModel =
  mongoose.models.serviceBooking ||
  mongoose.model("serviceBooking", serviceBookingSchema);

export default serviceBookingModel;
