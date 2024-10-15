import { z } from "zod";

/** AUTH */
export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string()
})
type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, "email" | "password">
export type UserRegistrationForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">
export type RequestConfirmationCodeForm = Pick<Auth, "email" >
export type ForgotPasswordForm = Pick<Auth, "email" >
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation" >

export type ConfirmToken = Pick<Auth, "token">

/** TASKS */

export const TaskStatus = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);
export type TaskStatus = z.infer<typeof TaskStatus>;

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
