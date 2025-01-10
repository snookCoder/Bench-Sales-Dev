import express from "express";
import { createCandidateProfile } from "../controllers/candidateProfile.controller.js";
import multer from "multer";

const candidateRoute = express.Router();

//memeory storage for cloud upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

//using multer disk storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

candidateRoute.post(
  "/createCandidateProfile",
  upload.single("resumeUpload"),
  createCandidateProfile
);

export { candidateRoute };
