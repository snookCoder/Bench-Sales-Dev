import { candidateProfileModel } from "../models/candidateProfile.model.js";
import { interviewModel } from "../models/interview.model.js";
import { jobModel } from "../models/job.model.js";
import { interviewRoutes } from "../routes/interview.route.js";
import { response_success } from "../utils/response.utils.js";

const interviewDetails = async (req, res) => {


    try {

        const role = req.refreshVerification.payload.role;
        const recruiterId = req.refreshVerification.payload._id;
        const { jobId, candidateId, interviewDate, feedback } = req.body;

        if (role != "r") {
            return response_success(res, 401, false, "Only recruiter can create interview", null)
        }

        if (!candidateId) {
            return response_success(res, 404, false, "Candidate id needed", null)
        }

        const candidate = await candidateProfileModel.findOne({ _id: candidateId });
        console.log("candidate ", candidate)

        if (!candidate) {
            return response_success(res, 404, false, "Candidate not found", null)
        }

        if (!jobId) {
            return response_success(res, 404, false, "Job id  needed", null)
        }

        //check if this job is assosiate with this candidate or not 
        const job = await jobModel.findOne({ candidateId: candidateId, recruiterId: recruiterId, _id: jobId });

        if (!job) {
            return response_success(res, 400, false, "This job is not assosiate with this candidate (recruiter id , candidate id and jobid both entries needed in job table ) ", null)
        }


        //if that recruiter is assosiate with this candidate or not
        const recruiter_info = await candidate.recruiterDetails.find((recruiter) => recruiter.recruiterId == recruiterId);

        if (!recruiter_info) {
            return response_success(res, 404, false, "This recruiter is not assosiate with this candidate ", null)
        }

        const interview = await interviewModel.create({
            candidateId,
            recruiterId,
            jobId,
            interviewDate,
            feedback
        });

        //increase the count in candidate recruiter details field
        recruiter_info.interviewCount = recruiter_info.interviewCount + 1;
        await candidate.save();

        //change the status in the job model as well 
        job.status = "interview schedule";
        await job.save();


        return response_success(res, 200, true, "Interview created successfully)", interview);


    } catch (error) {

        return response_success(res, 500, false, "Catch Error in interviewDetails controller", error.message)
    }
}

//get all interviews details

const interview_data = async (req, res) => {

    try {
        const role = req.refreshVerification.payload.role;
        const recruiter_id = req.body.recruiterId;
        const recruiterId = req.refreshVerification.payload._id;
        const candidate_id = req.body.candidateId;

        // if you are candiidate you are not able to see the interview list 
        if (role == 'c') {
            return response_success(res, 400, false, "you are not able to see the interview details", null)
        }

        // if you are admin you can see all the interviw details
        if (role == 'a') {

            // if recruiter id there
            if (recruiter_id) {
                //  if candidate id there
                if (candidate_id) {

                    const interviews = await interviewModel.find({ recruiterId: recruiter_id, candidateId: candidate_id });
                    if (!interviews || interviews.length == 0) {
                        return response_success(res, 404, false, "Interview not found", null)
                    }

                    return response_success(res, 200, true, "Interview list", interviews).populate('candidateId').populate('recruiterId').populate('jobId');

                }
                //  if no candidate id there 
                const interviews = await interviewModel.find({ recruiterId: recruiter_id });
                if (!interviews || interviews.length == 0) {
                    return response_success(res, 404, false, "Interview not found", null)
                }
                return response_success(res, 200, true, "Interview list", interviews).populate('candidateId').populate('recruiterId').populate('jobId');
            }

            const interviews = await interviewModel.find();
            if(!interviews || interviews.length == 0){
                return response_success(res, 404, false, "Interview not found", null)
            }
            return response_success(res, 200, true, "Interview list", interviews).populate('candidateId').populate('recruiterId').populate('jobId');
        }

        // if recruiter id there this is for recruiter only
        if (recruiterId) {
            //  if candidate id there
            if (candidate_id) {

                const interviews = await interviewModel.find({ recruiterId: recruiterId, candidateId: candidate_id });
                if (!interviews || interviews.length == 0) {
                    return response_success(res, 404, false, "Interview not found", null)
                }

                return response_success(res, 200, true, "Interview list", interviews).populate('candidateId').populate('recruiterId').populate('jobId');

            }
            //  if no candidate id there 
            const interviews = await interviewModel.find({ recruiterId: recruiterId });
            if (!interviews || interviews.length == 0) {
                return response_success(res, 404, false, "Interview not found", null)
            }
            return response_success(res, 200, true, "Interview list", interviews).populate('candidateId').populate('recruiterId').populate('jobId');
        }


    } catch (error) {
        return response_success(res, 500, false, "Catch Error in interview_data controller", error.message)
    }
}



export { interviewDetails, interview_data };