/* eslint-disable @typescript-eslint/no-explicit-any */
import { AUTH_LOCAL_STORAGE_KEY } from "../../../../ApiServices/Axios";
import { AuthModel, AuthTokens } from "./_models";
import Cookies from "js-cookie";

// const AUTH_LOCAL_STORAGE_KEY = "kt-auth-react-v";
const AUTH_LOCAL_ACCESS_TOKEN_KEY = "bs-auth-access-token";
const AUTH_LOCAL_REFRESH_TOKEN_KEY = "bs-auth-refresh-token";
const getAuth = (): AuthTokens | undefined => {
  if (!localStorage) {
    return;
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) {
    return;
  }

  try {
    const auth: AuthTokens = JSON.parse(lsValue) as AuthTokens;
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

const setAuth = (auth: AuthTokens) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth();
      if (auth && auth.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }

      return config;
    },
    (err: any) => Promise.reject(err)
  );
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY };
