import { axiosPrivate } from "../ApiServices/Axios";
import { ICandidateListResponse } from "../Types/CandidatesInterface";
// import { axiosPublic, axiosPrivate } from "../../../../ApiServices/Axios";
// import { AuthResponse, UserModel } from "./_models";

// API Endpoints
export const GET_INTERVIEWS = "/getCandidate";
export const SCHEDULE_INTERVIEW = "/interviewCreate";

// 🔹 Get Candidates (Protected API)
export function getInterviews() {
  return axiosPrivate.get<ICandidateListResponse>(GET_INTERVIEWS, {
    params: {
      // Pass recruiterId in params
    },
  });
}

export function scheduleInterview(request: any) {
  return axiosPrivate.post<any>(SCHEDULE_INTERVIEW, request);
}
