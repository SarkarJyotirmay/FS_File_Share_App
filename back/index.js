import express from "express";
import FileRouter from "./routes/files.route.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRouter from "./routes/user.route.js";

dotenv.config();

const app = express();

// DB connection
// File DB Connection
mongoose
  .connect(process.env.ATLAS_CONNECTION_STRING)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("Error in connecting DB", err));

// Middlewares
app.use(
  cors({
    origin: "*", //! will be changed
  })
);
app.use(express.json());
app.use(express.urlencoded());

// API routes
app.use(UserRouter);
app.use(FileRouter);

app.listen(8080, () => console.log("Server is up and running"));
