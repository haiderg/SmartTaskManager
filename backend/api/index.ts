import express from "express";
import cors from "cors";
import taskRoutes from "../src/routes/taskRoutes";
import { logRequests } from "../src/middleware/logger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRequests);

// Routes
app.use("/api/tasks", taskRoutes);

export default app;