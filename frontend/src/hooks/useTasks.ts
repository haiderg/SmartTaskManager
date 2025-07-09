import { useState, useEffect } from "react";
import type { Task, CreateTask, UpdateTask } from "@smarttask/shared";
import { taskService } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await taskService.getAllTasks();
      if (result.success && result.data) {
        setTasks(result.data);
      } else {
        setError(result.error || "Failed to fetch tasks");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: CreateTask) => {
    try {
      const result = await taskService.createTask(task);
      if (result.success && result.data) {
        setTasks((prev) => [...prev, result.data!]);
        return result.data;
      } else {
        setError(result.error || "Failed to create task");
        throw new Error(result.error || "Failed to create task");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task");
      throw err;
    }
  };

  const updateTask = async (id: string, updates: UpdateTask) => {
    try {
      const result = await taskService.updateTask(id, updates);
      if (result.success && result.data) {
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? result.data! : task))
        );
        return result.data;
      } else {
        setError(result.error || "Failed to update task");
        throw new Error(result.error || "Failed to update task");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const result = await taskService.deleteTask(id);
      if (result.success) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } else {
        setError(result.error || "Failed to delete task");
        throw new Error(result.error || "Failed to delete task");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task");
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};
