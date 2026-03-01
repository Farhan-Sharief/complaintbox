import express from "express";
import {
  getLiabilities,
  createLiability,
  deleteLiability,
} from "../controllers/liabilityController.js";

const router = express.Router();

router.get("/", getLiabilities);
router.post("/", createLiability);
router.delete("/:id", deleteLiability);

export default router;  