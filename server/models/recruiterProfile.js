import { text } from "express";
import mongoose, { mongo } from "mongoose";

const recruiterSchema = new mongoose.Schema({
    firstName:{
        type:String,
        default:'test'
    },
    lastName:{
        type:String,
        default:'test'
    },
    email:{
        type:String,
        default:'test@gmail.com'
    },
    username:{
        type:String,
        default:'test1112'
    },
    password:{
        type:String,
        default:'***'
    },
    gender:{
        type:String,
        enum:['M',"F"]
    },
    refreshToken:{
       token:{
          type:String,
          default:""
       },
       expiryDate:{
         type:Number,
         default:()=>Math.floor(Date.now()/1000)
       }
    },
    role:{
        type:String,
        enum:['r','a','c'],
        default:'r'
    },
    totalSubmissions: { type: Number, default: 0 },
    successfulPlacements: { type: Number, default: 0 },
    performanceScore: { type: Number, default: 0 }, // Score based on performance

  
    createdAt:{
        type:Number,
        default:()=>Math.floor(Date.now()/1000)
    },
    updatedAt:{
        type:Number,
        default:()=>Math.floor(Date.now()/1000)
    }
})



recruiterSchema.pre('save',function(next){
    this.updatedAt = Math.floor(Date.now() / 1000);
    next();
})

export const recruiterModel = mongoose.model('recruiter',recruiterSchema);