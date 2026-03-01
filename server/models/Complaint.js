import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    text: String,
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);