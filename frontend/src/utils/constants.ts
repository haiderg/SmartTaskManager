// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  TIMEOUT: 10000, // 10 seconds
} as const;

// UI Messages
export const MESSAGES = {
  SUCCESS: {
    TASK_CREATED: "Task created successfully",
    TASK_UPDATED: "Task updated successfully",
    TASK_DELETED: "Task deleted successfully",
  },
  ERROR: {
    NETWORK_ERROR: "Network error occurred",
    INVALID_DATA: "Invalid data format from server",
    TASK_CREATE_FAILED: "Failed to create task",
    TASK_UPDATE_FAILED: "Failed to update task",
    TASK_DELETE_FAILED: "Failed to delete task",
    TASK_FETCH_FAILED: "Failed to load tasks",
  },
} as const;

// UI Constants
export const UI_CONFIG = {
  ALERT_TIMEOUT: 5000, // 5 seconds
} as const;

// Alert Types
export const ALERT_TYPES = {
  SUCCESS: "bg-green-100 border-green-300",
  WARNING: "bg-yellow-100 border-yellow-300",
  DANGER: "bg-red-100 border-red-300",
} as const;

export type AlertType = (typeof ALERT_TYPES)[keyof typeof ALERT_TYPES];
