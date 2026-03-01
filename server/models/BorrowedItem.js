import mongoose from "mongoose";

const borrowedSchema = new mongoose.Schema(
  {
    name: String,
    person: String,
    returned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("BorrowedItem", borrowedSchema);