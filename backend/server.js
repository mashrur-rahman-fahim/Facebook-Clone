import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/apiRoutes.js";
// import cloudinary from "cloudinary";
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// const clientURLs = process.env.FRONTEND_URL.split(",");
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
 
};
app.use(cors(corsOptions));

// const corsOptions = {
//   origin: (origin, callback) => {
//     // console.log(clientURLs.indexOf(origin));
//     if (true || !origin) {
//       callback(null, true); // Allow the request
//     } else {
//       callback(new Error("Not allowed by CORS")); // Block the request
//     }
//   },
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// };

// app.use(cors(corsOptions));

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
    
// })
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.get("/hello", (req, res) => {
  return res.send("hello");
});
app.listen(port, () => {
  console.log(`Server is running `);
});

//routes
