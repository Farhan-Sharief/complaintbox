import mongoose from "mongoose";

const liabilitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Liability", liabilitySchema);    