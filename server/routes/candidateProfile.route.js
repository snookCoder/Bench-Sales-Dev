import express from "express";
import { createCandidateManully, createCandidateProfile } from "../controllers/candidateProfile.controller.js";
import multer from "multer";

const candidateRoute = express.Router();

// Multer disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Fix: Ensure the field name matches exactly with the frontend input name
candidateRoute.post(
  "/createCandidateProfile",
  upload.fields([{ name: "csvFile", maxCount: 1 }]), // Using fields method
  createCandidateProfile
);


//create the caniddate profile manually 
candidateRoute.post("/createCandidateManually",upload.single('resumeUpload'),createCandidateManully)

export { candidateRoute };
