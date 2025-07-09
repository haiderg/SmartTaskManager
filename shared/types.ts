import { z } from 'zod';
// Reference Prisma types (optional)
// import { Task as PrismaTask } from '../backend/generated/prisma';

// Zod schemas (manual but matches Prisma)
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  completed: z.boolean(),
  createdAt: z.string(), // Prisma generates Date, API sends string
  updatedAt: z.string(),
});

export const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
});

export const UpdateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  completed: z.boolean().optional(),
});

// TypeScript types
export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;

// Arrays
export const TaskArraySchema = z.array(TaskSchema);