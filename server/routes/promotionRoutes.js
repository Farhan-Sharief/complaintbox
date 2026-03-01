import express from "express";
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
  getActivePromotions,
} from "../controllers/promotionController.js";

const router = express.Router();   // ✅ REQUIRED

router.get("/", getPromotions);
router.get("/active", getActivePromotions);
router.post("/", createPromotion);
router.put("/:id", updatePromotion);
router.delete("/:id", deletePromotion);

export default router;