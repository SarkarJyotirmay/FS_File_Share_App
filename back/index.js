import express from "express";
import router from "./routes/files.route.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// DB connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("DB conected successfully"))
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
app.use(router);

app.listen(8080, () => console.log("Server is up and running"));
