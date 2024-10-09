import { z } from "zod";

/** TASKS */

export const TaskStatus = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);

export const TaskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: TaskStatus,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;

/** PROJECTS */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  projectDescription: z.string(),
  clientName: z.string(),
});

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    projectDescription: true,
    clientName: true,
  })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  "projectName" | "projectDescription" | "clientName"
>;
