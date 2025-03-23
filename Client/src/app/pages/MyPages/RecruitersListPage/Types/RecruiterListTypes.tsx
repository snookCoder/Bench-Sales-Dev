export interface IRefreshToken {
  token: string;
  expiryDate: number; // Timestamp (seconds or milliseconds)
}

export interface IRecruiterList {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string; // Hashed password
  role: "r"; // Assuming "r" stands for recruiter
  totalSubmissions: number;
  successfulPlacements: number;
  performanceScore: number;
  createdAt: number; // Timestamp (seconds or milliseconds)
  updatedAt: number; // Timestamp (seconds or milliseconds)
  refreshToken: IRefreshToken;
  __v: number;
}

export interface IRecruiterListResponse {
  success: boolean;
  message: string;
  payload: IRecruiterList[];
}

export interface IRecruiterResponse {
  success: boolean;
  message: string;
  payload: IRecruiterList;
}
