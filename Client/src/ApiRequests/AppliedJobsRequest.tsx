import { axiosPrivate } from "../ApiServices/Axios";
import { ICandidateListResponse } from "../Types/CandidatesInterface";
// import { axiosPublic, axiosPrivate } from "../../../../ApiServices/Axios";
// import { AuthResponse, UserModel } from "./_models";

// API Endpoints
export const GET_APPLIEDJOBS = "/getCandidate";
export const CREATE_APPLIED_JOB = "/createjob";

// 🔹 Get Candidates (Protected API)
export function getappliedJobss() {
  return axiosPrivate.get<ICandidateListResponse>(GET_APPLIEDJOBS, {
    params: {
      // Pass recruiterId in params
    },
  });
}

export function createAppliedJob(request: any) {
  return axiosPrivate.post<any>(CREATE_APPLIED_JOB, request);
}
