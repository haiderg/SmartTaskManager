import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Prisma client lazily
let prisma: any = null;

const getPrismaClient = async () => {
  if (!prisma) {
    const { PrismaClient } = await import("../generated/prisma");
    prisma = new PrismaClient();
  }
  return prisma;
};

// Tasks routes
app.get("/api/tasks", async (req, res) => {
  try {
    const client = await getPrismaClient();
    const tasks = await client.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    
    const client = await getPrismaClient();
    const newTask = await client.task.create({
      data: { title, description },
    });
    res.json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const client = await getPrismaClient();
    const updatedTask = await client.task.update({
      where: { id },
      data: { title, description, completed },
    });
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await getPrismaClient();
    await client.task.delete({
      where: { id },
    });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "SmartTaskManager Backend API" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API test route working", timestamp: new Date().toISOString() });
});

app.get("/api/db-test", async (req, res) => {
  try {
    const client = await getPrismaClient();
    await client.$connect();
    res.json({ message: "Database connection successful" });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: "Database connection failed", details: error.message });
  }
});

export default app;