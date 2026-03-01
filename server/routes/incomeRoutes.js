import express from "express";
import {
  getIncomes,
  createIncome,
  deleteIncome,
} from "../controllers/incomeController.js";

const router = express.Router();

router.get("/", getIncomes);
router.post("/", createIncome);
router.delete("/:id", deleteIncome);

export default router;