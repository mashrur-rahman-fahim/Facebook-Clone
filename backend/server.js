import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/apiRoutes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running `);
});

//routes
