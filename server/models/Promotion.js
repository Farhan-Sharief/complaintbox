import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
  {
    title: String,
    status: {
      type: String,
      enum: ["upcoming", "pending", "completed"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Promotion", promotionSchema);    