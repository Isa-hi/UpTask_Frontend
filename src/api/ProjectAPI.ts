import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  dashboardProjectSchema,
  Project,
  ProjectFormData,
} from "@/types/index";

export const createProject = async (formData: ProjectFormData) => {
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getProjects = async () => { 
  try {
    const { data } = await api.get("/projects");
    const response = dashboardProjectSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getProjectById = async (projectId: Project["_id"]) => {
  try {
    const { data } = await api.get(`/projects/${projectId}`);    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

type EditProjectFormProps = {
  data: ProjectFormData;
  projectId: Project["_id"];
};

export const updateProject = async ({data, projectId} : EditProjectFormProps) => {
  try {
    const { data: response } = await api.put(`/projects/${projectId}`, data);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const deleteProject = async (projectId: Project["_id"]) => {
  try {
    const { data } = await api.delete(`/projects/${projectId}`);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}