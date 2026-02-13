import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    dosage: { type: String, trim: true, default: "" },
    frequency: { type: String, trim: true, default: "" },
    duration: { type: String, trim: true, default: "" },
    instructions: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const prescriptionSchema = new mongoose.Schema(
  {
    diagnosis: { type: String, trim: true, default: "" },
    notes: { type: String, trim: true, default: "" },
    medicines: { type: [medicineSchema], default: [] },
  },
  { _id: false },
);

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },
  docData: { type: Object, required: true },
  amount: { type: Number, required: true },
  date: { type: Number, required: true },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  doctorRating: { type: Number, min: 1, max: 5, default: null },
  doctorReview: { type: String, trim: true, default: "", maxlength: 500 },
  reviewedAt: { type: Number, default: null },
  prescription: { type: prescriptionSchema, default: null },
  prescribedAt: { type: Number, default: null },
});

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
