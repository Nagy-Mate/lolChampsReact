import axios from "axios";
import type { User } from "../types/User";

export const BaseUrl = "http://localhost:8005/api";

const auth: User = JSON.parse(localStorage.getItem("credentials") ?? "{}");

export const apiClient = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  auth,
});
