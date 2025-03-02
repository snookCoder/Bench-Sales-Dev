import { candidateProfileModel } from "../models/candidateProfile.model.js";
import { interviewModel } from "../models/interview.model.js";
import { jobModel } from "../models/job.model.js";
import { placement_model } from "../models/placement.model.js";
import { recruiterModel } from "../models/recruiterProfile.js";
import { job } from "../routes/job.route.js";
import { response_success } from "../utils/response.utils.js";

const placement_controller = async(req,res)=> {
 
try {
        const role = req.refreshVerification.payload.role;
    
        if(role!='r'){
            return response_success(res,400,false,"Only recruiter can create placement",null)
        }
    
        const recruiterId = req.refreshVerification.payload._id;
    
        const {candidateId,jobId,position,salary,startDate} = req.body;
    
        // if candiidate id , job id is not there then reutrn error
        if(!candidateId){
            return response_success(res,400,false,"Candidate id needed",null)
        }
    
        const candidate  = await candidateProfileModel.findOne({_id:candidateId});
    
        const recruiter_details = candidate.recruiterDetails.find((recruiter)=> recruiter.recruiterId == recruiterId);
    
        //if recruiter is not assosiate with this candidate then return error
        if(!recruiter_details){
            return response_success(res,400,false,"This recruiter is not assosiate with this candidate",null)
        }

        //change the status in interview model 
        const interview = await interviewModel.findOne({candidateId:candidateId,recruiterId:recruiterId,jobId:jobId});
        
        if(!interview){
            return response_success(res,400,false,"Interview not scheduled",null)
        }

        interview.status = 'pass';
        await interview.save();


        //change the pass count in job model
        recruiter_details.interviewPassCount = recruiter_details.interviewPassCount + 1;
        await candidate.save();

        //change the pass count in recruiter model as well 
        const recruiter = await recruiterModel.findOne({_id:recruiterId});
        recruiter.successfulPlacements = recruiter.successfulPlacements + 1;

        await recruiter.save();

        //change the status of the job as well 
        const job = await jobModel.findOne({_id:jobId});
        job.status = 'offer';
        await job.save();
    
        const placement = await placement_model.create({
            candidateId,
            recruiterId,
            jobId,
            position,
            salary,
            startDate
        });
    
        return response_success(res,200,true,"Placement created successfully",placement);
} catch (error) {
    return response_success(res,500,false,"error in catch api of placement",error.message)
}


}


export {placement_controller}