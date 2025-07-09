import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import { logRequests } from "./middleware/logger";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(logRequests);

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
