import express from "express";
import { createCandidateManully, createCandidateProfile, deleteCandidate, getCandidate, getIndCandidate, updateCandidate } from "../controllers/candidateProfile.controller.js";
import { verifyToken } from '../middleware/verifyToken.js';
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
candidateRoute.post("/createCandidateManually",upload.single('resume'),verifyToken,createCandidateManully)

//get all candidate
candidateRoute.get("/getCandidate",verifyToken,getCandidate)
//get indivdual candidate --> please send it throush params 
candidateRoute.get("/getIndiCandidate/:id",verifyToken,getIndCandidate)
//update the candidate  record
candidateRoute.patch("/updateCandidate",verifyToken,updateCandidate)
//delete candidate
candidateRoute.delete("/deleteCandidate/:id",verifyToken,deleteCandidate)

export { candidateRoute };
