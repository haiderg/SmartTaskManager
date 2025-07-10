import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/api/tasks", (req, res) => {
  res.json({ message: "Backend is working!", tasks: [] });
});

app.get("/", (req, res) => {
  res.json({ message: "SmartTaskManager Backend API" });
});

export default app;