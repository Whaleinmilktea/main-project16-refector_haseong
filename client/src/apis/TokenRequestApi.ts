import axios, { AxiosInstance } from "axios";
import { baseApi } from "./EduApi";
import { getRefreshToken } from "../pages/utils/Auth";

let accessToken: string | null = null;
let tokenRequestApi = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json", // 요청 헤더(content type) 설정
  },
  data: {},
}) as AxiosInstance & { setAccessToken: (token: string | null) => void };

const extendAccessToken = async () => {
  const expirationTime = 4 * 60 * 1000;
  const timeToExpire =
    new Date(Number(new Date()) + expirationTime).getTime() -
    new Date().getTime();

  setTimeout(async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return;

    try {
      const response = await baseApi.post(`/refresh`, null, {
        headers: {
          Refresh: `${refreshToken}`,
        },
      });
      const { authorization: newAccessToken } = response.headers;
      tokenRequestApi.setAccessToken(newAccessToken);
    } catch (error) {}
  }, timeToExpire);
};

tokenRequestApi.setAccessToken = (token: string | null): void => {
  if (token) {
    accessToken = token;
    extendAccessToken();
  }
};

tokenRequestApi.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    if (accessToken) {
      config.headers.authorization = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default tokenRequestApi;
