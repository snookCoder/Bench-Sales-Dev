import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
// import { BsNutFill } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";

// Base URL of your API
export const AUTH_LOCAL_STORAGE_KEY = "bs-auth-token";
// const BASE_URL = 'https://betting-app-gold.vercel.app/';  //Live
// export const BASE_URL_RENDER = "https://bank-nft.onrender.com/"; //Local
// export const BASE_URL = "http://localhost:4000/"; //Local
export const BASE_URL = "https://bench-sales-dev.onrender.com/api/v1"; //vercel url

// Get tokens from local storage
// const getAccessToken = (): string | undefined => Cookies.get("ACCESS_TOKEN");
// const getRefreshToken = (): string | undefined => Cookies.get("REFRESH_TOKEN");

const getAccessToken = (): string | undefined => {
  const authData = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!authData) return undefined; // Handle the case when there is no stored data
  return JSON.parse(authData).accessToken;
};

const getRefreshToken = (): string | undefined => {
  const authData = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!authData) return undefined; // Handle the case when there is no stored data
  return JSON.parse(authData).refreshToken;
};

// Set tokens in local storage
const setAccessToken = (token: string) => Cookies.set("ACCESS_TOKEN", token);
// const setRefreshToken = (token: string) => Cookies.set("REFRESH_TOKEN", token);

// Public Axios Instance - No Auth Token Required
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

// Private Axios Instance - Auth Token Required
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Necessary if using cookies for token management
});

// Utility to set headers dynamically based on content type
const setDynamicHeaders = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getAccessToken();
  console.log(token, "token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Set Content-Type based on the request method and data type
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
};

// Add a request interceptor to add the access token and set content type before each request
axiosPrivate.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return setDynamicHeaders(config);
  },
  (error: AxiosError) => Promise.reject(error)
);

// Refresh Token Logic
const refreshAccessToken = async (): Promise<string> => {
  // const navigation = useNavigate();
  try {
    const response: AxiosResponse<{
      accessToken: string;
    }> = await axiosPublic.post("api/v1/refresh", null, {
      headers: { Authorization: `Bearer ${getRefreshToken()}` },
    });
    console.log(response);
    const { accessToken } = response.data;

    // Update tokens in local storage
    setAccessToken(accessToken);
    // setRefreshToken(refreshToken);

    return accessToken;
  } catch (error) {
    // Handle token refresh failure (e.g., logout the user)
    console.error("Unable to refresh access token", error);
    throw error;
    // navigation("/login");
  }
};

// Response Interceptor for Handling 401 Unauthorized Errors
axiosPrivate.interceptors.response.use(
  (response: AxiosResponse) => response, // Pass through if successful
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        axiosPrivate.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        // Retry the original request with the new access token
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
