// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import incomeRoutes from "./routes/incomeRoutes.js";
// Import route files
import expenseRoutes from "./routes/expenseRoutes.js";
import salaryRoutes from "./routes/salaryRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
import liabilityRoutes from "./routes/liabilityRoutes.js";
import borrowedRoutes from "./routes/borrowedRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import promotionRoutes from "./routes/promotionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
// Load environment variables and connect to database
dotenv.config();
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/income",protect, incomeRoutes);
app.use("/api/expense", protect, expenseRoutes);
app.use("/api/salary", protect, salaryRoutes);
app.use("/api/asset", protect, assetRoutes);
app.use("/api/liability", protect, liabilityRoutes);
app.use("/api/borrowed", protect, borrowedRoutes);
app.use("/api/complaint",protect, complaintRoutes);
app.use("/api/promotion", protect, promotionRoutes);
app.use("/api/dashboard", protect, dashboardRoutes);
app.use("/api/assets", protect, assetRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);