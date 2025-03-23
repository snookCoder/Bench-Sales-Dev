interface ICandidateListRecruiterList {
  recruiterId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    gender: string;
    role: string;
    totalSubmissions: number;
    successfulPlacements: number;
    performanceScore: number;
    createdAt: number; // Timestamp (seconds)
    updatedAt: number; // Timestamp (seconds)
    __v: number;
  };
  job_submission: number;
  interviewCount: number;
  interviewPassCount: number;
  interviewFailCount: number;
  _id: string;
  assignDate: number; // Timestamp (seconds)
}

// Enum for Candidate Status
enum CandidateStatus {
  BENCH = "Bench",
  ACTIVE = "Active",
  PLACED = "Placed",
}

// Enum for Candidate Role (if "c" always means Candidate)
enum UserRole {
  CANDIDATE = "c",
}

export interface ICandidateList {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  skills: string; // Assuming skills are stored as a comma-separated string
  status: CandidateStatus;
  resumeUpload: string; // URL of the uploaded resume
  recruiterDetails: ICandidateListRecruiterList[];
  password?: string; // Optional if not used in frontend
  role: UserRole;
  createdAt: number; // Timestamp (seconds)
  updatedAt: number; // Timestamp (seconds)
  __v: number;
}

// Response when fetching multiple candidates
export interface ICandidateListResponse {
  success: boolean;
  message: string;
  payload: ICandidateList[];
}

// Response when fetching a single candidate
export interface ICandidateResponse {
  success: boolean;
  message: string;
  payload: ICandidateList;
}
