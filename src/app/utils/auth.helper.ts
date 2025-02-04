import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axios.helper";
import { User } from "next-auth";

export const login = async (credentials: Partial<Record <string, unknown>>)  => {
    const response = await axiosInstance.post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      const data = response.data;
      const user = jwtDecode(data.token) as User
      user.access_token = data.token
      return user
}