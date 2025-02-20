import mongoose, { mongo } from "mongoose";
import { response_success } from "../utils/response.utils.js"
import { jobModel } from "../models/job.model.js";
import { recruiterModel } from "../models/recruiterProfile.js";
import { candidateProfileModel } from "../models/candidateProfile.model.js";

const jobSubmit = async(req,res)=>{
 try {
   console.log(req.refreshVerification.payload)

   //check the role if not recruiter then throws error
   if(req.refreshVerification.payload.role!='r'){
     return response_success(res,400,false,'contact to recruiter  for create the job application',null)
   }

   const {candidateId,clientNotes,jobTitle,company,industry} = req.body;


   const candidateIdObject = new mongoose.Types.ObjectId(`${candidateId}`);
   const recruiterIdObject = new mongoose.Types.ObjectId(`${req.refreshVerification.payload._id}`)
   
   console.log(candidateIdObject);
   console.log(recruiterIdObject);


   //first check if this candidate is assign to this recruiter or not
   const assign_candidate = await candidateProfileModel.findOne({_id:`${candidateIdObject}`});
   if(!assign_candidate){
     return response_success(res,400,false,'Ther is no candidate of this id please create it first  ',null)
   }

   const recruiter_present = assign_candidate.recruiterDetails.find((recruiter)=>recruiter.recruiterId.toString()==recruiterIdObject.toString())
     
   // if recruiter is not present then say there is not recruiter assosiate with this candidate to create the job
   if(!recruiter_present){
    return response_success(res,400,false,"There is no recruiter assign to this paticular candidate",null)
   }


   const jobCreate = await jobModel.create({
       candidateId:candidateIdObject,
       recruiterId:recruiterIdObject,
       clientNotes,
       jobTitle,
       company,
       industry

   })
   
   // total recruiter submission
   const recruiter = await recruiterModel.findOne({_id:`${recruiterIdObject}`});
   recruiter.totalSubmissions =  recruiter.totalSubmissions + 1;
   recruiter.save();
   
   //increase the particular recruiter count 
   recruiter_present.job_submission+=1;
   await assign_candidate.save();
   

   return response_success(res,200,true,"job create succesfully",jobCreate)

 } catch (error) {
    return response_success(res,500,false,"error in job submit api",error.message)
 }
}


export {jobSubmit}