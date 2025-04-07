import { AUTH_LOCAL_STORAGE_USER_PROFILE_KEY } from "../../ApiServices/Axios";

export const getUserProfileFromLocalStorage = () => {
  return JSON.parse(
    localStorage.getItem(AUTH_LOCAL_STORAGE_USER_PROFILE_KEY) ?? "{}"
  );
};
