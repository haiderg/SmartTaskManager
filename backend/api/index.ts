import express from "express";
import cors from "cors";
import { PrismaClient } from "../generated/prisma";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Tasks routes
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    
    const newTask = await prisma.task.create({
      data: { title, description },
    });
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, completed },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id },
    });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "SmartTaskManager Backend API" });
});

export default app;