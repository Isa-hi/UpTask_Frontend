import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { Project, Task, TaskFormData } from '@/types/index';

 type CreateTaskProps = {
    formData: TaskFormData;
    projectId: Project['_id'];
}

export const createTask = async ({ formData, projectId} : Pick<CreateTaskProps, 'formData' | 'projectId'>) => {
    console.log(formData, projectId);
    
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