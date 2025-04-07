export const UserRolesEnum = {
  Admin: "a",
  Recruiter: "r",
};

export interface IRecruiterProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
  totalSubmissions: number;
  successfulPlacements: number;
  performanceScore: number;
  createdAt: number;
  updatedAt: number;
  __v: number;
}

export interface IProfileResponse {
  success: boolean;
  message: string;
  payload: IRecruiterProfile;
}
