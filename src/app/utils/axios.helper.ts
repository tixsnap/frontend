import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      try {
        const session = await getSession();
        if (session?.user.access_token) {
          config.headers.Authorization = `Bearer ${session?.user.access_token}`;
        }
      } catch (error) {
        console.log("Error Setting auth token", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
