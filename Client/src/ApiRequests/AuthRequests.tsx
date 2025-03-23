import { AxiosResponse } from "axios";
import { axiosPrivate, axiosPublic } from "../ApiServices/Axios";
import { AuthResponse, UserModel } from "../app/modules/auth";
// import { axiosPublic, axiosPrivate } from "../../../../ApiServices/Axios";
// import { AuthResponse, UserModel } from "./_models";

// API Endpoints
export const GET_USER_BY_ACCESSTOKEN_URL = "/verify_token";
export const LOGIN_URL = "/loginRecruiter";
export const REGISTER_URL = "/createRecruiter";
export const REQUEST_PASSWORD_URL = "/forgot_password";

// 🔹 Login (Public API)
export function login(email: string, password: string) {
  return axiosPublic.post<AuthResponse>(LOGIN_URL, { email, password });
}

// 🔹 Register (Public API)
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string
) {
  return axiosPublic.post(REGISTER_URL, {
    email,
    firstName: firstname,
    lastName: lastname,
    password,
  });
}

// 🔹 Forgot Password (Public API)
export function requestPassword(email: string) {
  return axiosPublic.post<{ result: boolean }>(REQUEST_PASSWORD_URL, { email });
}

// 🔹 Get User by Access Token (Protected API)
export function getUserByToken() {
  return axiosPrivate.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL);
}
