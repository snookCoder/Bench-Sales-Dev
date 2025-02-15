import mongoose, { mongo } from 'mongoose';

const jobSchema = new mongoose.Schema({

    candidateId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"candidateProfile"
    },
    recruiterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"recruiter"
    },
    submissionDate:{
        type:Number,
        default:()=>Math.floor(Date.now()/1000)
    },
    clientNotes:{
        type:String,
        default:"test dataa from the client sides"
    },
    jobTitle:{
        type:String,
        default:'Assisate Developer'
    },
    company:{
       type:String,
       default:'Test Company'
    },
    industry:{
        type:String,
        default:"It Comapny"
    },
    status:{
      type:String,
      enum:['submit','interview schedule','offer','reject'],
      default:'submit'
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

jobSchema.pre('save',function(next){
    this.updatedAt = Math.floor(Date.now()/1000);
    next();
})


export const jobModel = mongoose.model("Job",jobSchema)