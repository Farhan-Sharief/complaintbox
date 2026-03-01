import BorrowedItem from "../models/BorrowedItem.js";

export const getBorrowedItems = async (req, res) => {
  const items = await BorrowedItem.find();
  res.json(items);
};

export const createBorrowedItem = async (req, res) => {
  const item = await BorrowedItem.create(req.body);
  res.status(201).json(item);
};

export const updateBorrowedItem = async (req, res) => {
  const updated = await BorrowedItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteBorrowedItem = async (req, res) => {
  await BorrowedItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};