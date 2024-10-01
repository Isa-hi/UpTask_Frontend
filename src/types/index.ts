import { z } from 'zod';

/** PROJECTS */
export const projectSchema = z.object({
    id: z.string(),
    projectName: z.string(),
    projectDescription: z.string(),
    clientName: z.string(),
})
export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'projectDescription' | 'clientName'>