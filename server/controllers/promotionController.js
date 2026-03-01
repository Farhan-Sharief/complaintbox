import Promotion from "../models/Promotion.js";

export const getPromotions = async (req, res) => {
  const promotions = await Promotion.find();
  res.json(promotions);
};

export const createPromotion = async (req, res) => {
  const promotion = await Promotion.create(req.body);
  res.status(201).json(promotion);
};

export const updatePromotion = async (req, res) => {
  const updated = await Promotion.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deletePromotion = async (req, res) => {
  await Promotion.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
export const getActivePromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find({
      status: "pending",
    });

    res.json(promotions);
  } catch (err) {
    res.status(500).json({ message: "Promotion fetch error" });
  }
};