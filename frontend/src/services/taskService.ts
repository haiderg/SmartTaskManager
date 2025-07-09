import axios, { AxiosResponse, AxiosError } from "axios";
import {
  TaskArraySchema,
  CreateTaskSchema,
  UpdateTaskSchema,
} from "@smarttask/shared";
import type { Task, CreateTask, UpdateTask } from "@smarttask/shared";
import { API_CONFIG, MESSAGES } from "../utils/constants";

// API Response type
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

class TaskService {
  private handleError(error: unknown): ApiResponse<never> {
    console.error("TaskService Error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response:", error.response?.data);
      console.error("Status:", error.response?.status);
      return {
        success: false,
        error:
          error.response?.data?.message || error.message || "Network error",
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }

  async getAllTasks(): Promise<ApiResponse<Task[]>> {
    try {
      console.log("Fetching tasks from:", `${API_CONFIG.BASE_URL}/tasks`);

      const response = await axios.get(`${API_CONFIG.BASE_URL}/tasks`);
      console.log("Tasks response:", response.data);

      // Validate with Zod
      const validationResult = TaskArraySchema.safeParse(response.data);
      if (!validationResult.success) {
        console.error("Validation failed:", validationResult.error);
        return {
          success: false,
          error: MESSAGES.ERROR.INVALID_DATA,
        };
      }

      return {
        success: true,
        data: validationResult.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createTask(taskData: CreateTask): Promise<ApiResponse<Task>> {
    try {
      console.log("Creating task:", taskData);
      // Validate input
      const validationResult = CreateTaskSchema.safeParse(taskData);
      if (!validationResult.success) {
        console.error("Create validation failed:", validationResult.error);
        return {
          success: false,
          error: "Invalid task data",
        };
      }

      const response = await axios.post(
        `${API_CONFIG.BASE_URL}/tasks`,
        validationResult.data
      );
      console.log("Task created:", response.data);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateTask(
    id: string,
    taskData: UpdateTask
  ): Promise<ApiResponse<Task>> {
    try {
      // Validate input
      const validationResult = UpdateTaskSchema.safeParse(taskData);
      if (!validationResult.success) {
        return {
          success: false,
          error: "Invalid task data",
        };
      }

      const response = await axios.put(
        `${API_CONFIG.BASE_URL}/tasks/${id}`,
        validationResult.data
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteTask(id: string): Promise<ApiResponse<void>> {
    try {
      await axios.delete(`${API_CONFIG.BASE_URL}/tasks/${id}`);

      return {
        success: true,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}

// Export singleton instance
export const taskService = new TaskService();
