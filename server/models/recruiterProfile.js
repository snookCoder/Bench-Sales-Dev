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