import express from "express";
import {
  getBorrowedItems,
  createBorrowedItem,
  updateBorrowedItem,
  deleteBorrowedItem,
} from "../controllers/borrowedController.js";

const router = express.Router();

router.get("/", getBorrowedItems);
router.post("/", createBorrowedItem);
router.put("/:id", updateBorrowedItem);
router.delete("/:id", deleteBorrowedItem);

export default router;