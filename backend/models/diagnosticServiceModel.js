import mongoose from "mongoose";

const diagnosticServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    category: {
      type: String,
      enum: [
        "imaging-radiology",
        "laboratory",
        "cardiovascular-pulmonary",
        "endoscopy",
        "neurological-functional",
      ],
      default: "laboratory",
    },
    preTestInstructions: { type: [String], default: [] },
    available: { type: Boolean, default: true },
    // Tracks booked slots per date, same pattern as doctor appointments
    // e.g. { "2026-02-13": ["10:00 AM", "10:30 AM"] }
    slots_booked: { type: Object, default: {} },
  },
  { timestamps: true },
);

const diagnosticServiceModel =
  mongoose.models.diagnosticService ||
  mongoose.model("diagnosticService", diagnosticServiceSchema);

export default diagnosticServiceModel;
