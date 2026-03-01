import express from "express";
import {
  getAssets,
  createAsset,
  deleteAsset,
} from "../controllers/assetController.js";

const router = express.Router();

router.get("/", getAssets);
router.post("/", createAsset);
router.delete("/:id", deleteAsset);

export default router;