import Liability from "../models/Liability.js";

export const getLiabilities = async (req, res) => {
  const liabilities = await Liability.find();
  res.json(liabilities);
};

export const createLiability = async (req, res) => {
  const liability = await Liability.create(req.body);
  res.status(201).json(liability);
};

export const deleteLiability = async (req, res) => {
  await Liability.findByIdAndDelete(req.params.id);
  res.json({ message: "Liability deleted" });
};