import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { Project, Task, TaskFormData } from '@/types/index';

 type TaskAPI = {
    formData: TaskFormData;
    projectId: Project['_id'];
    taskId: Task['_id'];
}

export const createTask = async ({ formData, projectId} : Pick<TaskAPI, 'formData' | 'projectId'>) => {   
    try {
        const {data} = await api.post(`/projects/${projectId}/tasks`, formData);
        console.log(data);
        return data;
        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getTaskById = async ({projectId, taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const {data} = await api.get(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const editTaskById = async ({formData, projectId, taskId} : Pick<TaskAPI, 'formData' | 'projectId' | 'taskId'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const {data} = await api.put<string>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const deleteTask = async ({projectId, taskId} : Pick<TaskAPI,  | 'projectId' | 'taskId'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const {data} = await api.delete<string>(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}