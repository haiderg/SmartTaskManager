export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const API_ENDPOINTS = {
  TASKS: "/tasks",
} as const;
