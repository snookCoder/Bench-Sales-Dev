import { text } from "express";
import mongoose from "mongoose";

const candidateProfile = new mongoose.Schema({
  firstName: {
    type: String,
    default: "test",
  },
  lastName: {
    default: "test",
    type: String,
  },
  email: {
    type: String,
    default: "test@gmail.com",
  },
  phoneNumber: {
    type: Number,
    default: 12345,
  },
  skills: {
    type: String,
    default: "html,css,js,Marketing",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
  },
  resumeUpload: {
    type: String,
    default: "",
  },
  createdAt: {
    type:Number,
    default: () => Math.floor(Date.now() / 1000),
  },
  updatedAt: {
    type:Number,
    default: () => Math.floor(Date.now() / 1000),
  },
});



candidateProfile.pre("save", function (next) {
  this.updatedAt = Math.floor(Date.now() / 1000);
  next();
});

export const candidateProfileModel = mongoose.model(
  "candidateProfile",
  candidateProfile
);
