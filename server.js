import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import imageRoutes from './routes/imageRoutes.js'; 
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import couponRoutes from './routes/couponRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; 

import cors from "cors";

const corsOptions = {
  origin: ["https://your-netlify-app.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));


// Configure environment variables
dotenv.config();

// Database connection
connectDB();

// Get __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, './client/build')));

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/coupon", couponRoutes);
app.use('/api/v1/images', imageRoutes);

// Catch-all route for serving the React frontend
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Set up server port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
