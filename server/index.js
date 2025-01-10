import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { candidateRoute } from "./routes/candidateProfile.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(fileName);

// Middleware to serve static files
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
// Serve static files from the 'upload' folder
app.use("/uploads", express.static(path.join(__dirName, "uploads"))); // Static file serving route
app.use(express.json()); // use for the JSON data
app.use(express.urlencoded({ extended: true })); // use for form data

// All APIs
app.use("/api/v1", candidateRoute);

// Server started and database connectivity
const PORT = process.env.PORT || 5000; // default to port 5000 if not set

app.listen(PORT, async () => {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGO_URL);
    if (dbConnect) {
      console.log(
        `Server started at http://localhost:${PORT} and database connected successfully`
      );
    } else {
      console.log("Error in connectivity of database");
    }
  } catch (error) {
    console.log(`Error in connectivity: ${error.message}`);
  }
});
