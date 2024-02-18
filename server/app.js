import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
dotenv.config();
const app = express();

// Middelware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.REACT_APP_SERVER_HOST, //localhost:3000
  credentials: true
}
));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

// Error Handing Middelware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Port Number
const port = 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(
      port,
      console.log(`Server is Listing to port : ${port} & DB Connected!`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();