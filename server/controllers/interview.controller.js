import { candidateProfileModel } from "../models/candidateProfile.model.js";
import { interviewModel } from "../models/interview.model.js";
import { jobModel } from "../models/job.model.js";
import { response_success } from "../utils/response.utils.js";

const interviewDetails = async(req,res)=>{

  
    try {
        
        const role = req.refreshVerification.payload.role;
        const recruiterId = req.refreshVerification.payload._id;
        const {jobId,candidateId,interviewDate,feedback} = req.body;

        if(role != "r"){
            return response_success(res,401,false,"Only recruiter can create interview",null)
        }

        if(!candidateId){
            return response_success(res,404,false,"Candidate id needed",null)
        }
        
        const candidate = await candidateProfileModel.findOne({_id:candidateId});
        console.log("candidate ",candidate)
        
        if(!candidate){
            return response_success(res,404,false,"Candidate not found",null)
        }

        if(!jobId){
            return response_success(res,404,false,"Job id  needed",null)
        }

        //check if this job is assosiate with this candidate or not 
        const job = await jobModel.findOne({candidateId:candidateId});

        if(!job){
            return response_success(res,400,false,"This job is not assosiate with this candidate ",null)
        }


        //if that recruiter is assosiate with this candidate or not
        const recruiter_info = await candidate.recruiterDetails.find((recruiter)=>recruiter.recruiterId == recruiterId);

        if(!recruiter_info){
            return response_success(res,404,false,"This recruiter is not assosiate with this candidate ",null)
        }

        const interview = await interviewModel.create({
            candidateId,
            recruiterId,
            jobId,
            interviewDate,
            feedback
        });
        
        //increase the count in candidate recruiter details field
        recruiter_info.interviewCount =  recruiter_info.interviewCount + 1;
        await candidate.save();
        
        //change the status in the job model as well 
        job.status = "interview schedule";
        await job.save();


        return response_success(res,200,true,"Interview created successfully)",interview);

        
    } catch (error) {
        
        return response_success(res,500,false,"Catch Error in interviewDetails controller",error.message)
    }
}



export {interviewDetails};