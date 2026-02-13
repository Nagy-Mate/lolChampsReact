import axios from "axios";

export const BaseUrl = "http://localhost:8005/api";

export const apiClient = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
