import axios from "axios";
import { AuthModel, AuthResponse, UserModel } from "./_models";
import { BASE_URL } from "../../../../ApiServices/Axios";

export const GET_USER_BY_ACCESSTOKEN_URL = `${BASE_URL}/verify_token`;
export const LOGIN_URL = `${BASE_URL}/loginRecruiter`;
export const REGISTER_URL = `${BASE_URL}/createRecruiter`;
export const REQUEST_PASSWORD_URL = `${BASE_URL}/forgot_password`;

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthResponse>(LOGIN_URL, {
    email,
    password,
  });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    firstName: firstname,
    lastName: lastname,
    password,
    // password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}
