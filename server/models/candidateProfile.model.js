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
    unique:true,
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
    enum: ["Bench", "Active","Placed"],
    default:"Bench"
  },
  resumeUpload: {
    type: String,
    default: "",
  },
 
  recruiterDetails:[
    {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recruiter", // Reference to the recruiterModel
      
    },
    job_submission:{type:Number,default:0},
    interviewCount: { type: Number, default: 0 },
    interviewPassCount: { type: Number, default: 0 },
    interviewFailCount: { type: Number, default: 0 },
    isActive:{type:Boolean,default:false},
    assignDate:{type:Number,default:()=>Math.floor(Date.now())}
  }
  ],

  role:{type:String,enum:['r','c','a'],default:'c'},
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
