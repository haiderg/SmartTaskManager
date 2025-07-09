import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { validateTask } from "../middleware/validation";

const router = Router();

router.get("/", getTasks);
router.post("/", validateTask, createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
