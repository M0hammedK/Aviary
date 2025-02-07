// lib/auth.ts
import axios from "axios";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post(
    `${API_URL}/auth/signup`,
    { name, email, password },
    { withCredentials: true }
  );
  console.log(response.data)
  return response.data;
};

export const logout = async () => {
  const token = getCookie("accessToken");
  await axios.get(`${API_URL}/auth/logout`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  deleteCookie("accessToken");
  deleteCookie("userRole");
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/refresh`,
      {},
      { withCredentials: true }
    );
    return response.data.accessToken;
  } catch (err) {}
};
