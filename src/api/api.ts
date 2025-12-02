// axios
import { APIConfiguration } from "@/config/api.config";
import axios from "axios";

export const apiInstance = axios.create({
  baseURL: APIConfiguration.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});