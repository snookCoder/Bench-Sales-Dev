import { AxiosResponse } from "axios";
import { axiosPrivate } from "../ApiServices/Axios";
import {
  ICandidateResponse,
  ICandidateListResponse,
} from "../Types/CandidatesInterface";

// API Endpoints
export const GET_CANDIDATE_ADMIN = "/getCandidate";
export const CREATE_CANDIDATE = "/createCandidateManually"; // New API endpoint
export const UPDATE_CANDIDATE = "/updateCandidate"; // New API endpoint

// 🔹 Get Candidates (Protected API)
export function getCandidates(recruiterId: string = "") {
  return axiosPrivate.get<ICandidateListResponse>(GET_CANDIDATE_ADMIN, {
    params: {
      recruiterID: recruiterId,
    },
  });
}

// 🔹 Get Candidate By ID
export function getCandidateByID(candidateID: string = "") {
  return axiosPrivate.get<ICandidateResponse>(GET_CANDIDATE_ADMIN, {
    params: {
      candidateID,
    },
  });
}

// 🔹 Create Candidate (FormData)
export function createCandidate(formData: FormData) {
  return axiosPrivate.post<any>(CREATE_CANDIDATE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function updatCandidate(request: any) {
  return axiosPrivate.patch<any>(UPDATE_CANDIDATE, request, {});
}
