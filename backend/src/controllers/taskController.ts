import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { CreateTaskSchema, UpdateTaskSchema } from '@smarttask/shared';

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const result = CreateTaskSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: 'Invalid task data' });
    }
    
    const newTask = await prisma.task.create({
      data: result.data,
    });
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, completed },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id },
    });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};