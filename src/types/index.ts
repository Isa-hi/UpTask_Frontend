import { z } from "zod";

/** AUTH */
export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});
type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type UpdateCurrentPasswordForm = Pick<Auth, "current_password" | "password" | "password_confirmation">;
export type ConfirmToken = Pick<Auth, "token">;
export type checkPasswordForm = Pick<Auth, "password">;

/** USER */
export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });
  export type User = z.infer<typeof userSchema>;
  export type UserProfileData = Pick<User, "name" | "email">;
  
/** Notes */
export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema.pick({ _id: true, name: true }),
  task: z.string(),
  createdAt: z.string(),
});
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;

/** TASKS */

export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const TaskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  completedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema,
      status: taskStatusSchema,
    })
  ),
  notes: z.array(
    noteSchema.extend({
      createdBy: userSchema,
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const taskProjectSchema = TaskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true,
});
export type Task = z.infer<typeof TaskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
export type TaskProject = z.infer<typeof taskProjectSchema>;

/** Team */
export const teamMemberSchema = userSchema.pick({
  _id: true,
  name: true,
  email: true,
});
export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;

/** PROJECTS */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  projectDescription: z.string(),
  clientName: z.string(),
  manager: z.string(userSchema.pick({ _id: true, name: true })),
  tasks: z.array(taskProjectSchema),
  team: z.array(z.string(teamMemberSchema.pick({ _id: true}))),
});

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    projectDescription: true,
    clientName: true,
    manager: true,
  })
);
export const EditProjectSchema = projectSchema.pick({
  projectName: true,
  projectDescription: true,
  clientName: true,
});
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  "projectName" | "projectDescription" | "clientName"
>;

