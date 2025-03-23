// import { axiosPrivate } from "./Axios";

import { axiosPrivate } from "../ApiServices/Axios";
import {
  IRecruiterListResponse,
  IRecruiterResponse,
} from "../app/pages/MyPages/RecruitersListPage/Types/RecruiterListTypes";

const GET_RECRUITERS_URL = "/getRecruiters";

export const getRecruiters = async () => {
  const response = await axiosPrivate.get<IRecruiterListResponse>(
    GET_RECRUITERS_URL
  );
  return response.data;
};

export const getRecruitersByID = async (
  recruiterId: string = "",
  itemsPerPage: number = 10
) => {
  const response = await axiosPrivate.get<IRecruiterResponse>(
    GET_RECRUITERS_URL,
    {
      params: { recruiterID: recruiterId },
    }
  );
  return response.data;
};
