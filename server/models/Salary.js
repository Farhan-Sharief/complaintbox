import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Salary", salarySchema);