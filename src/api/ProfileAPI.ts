import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { UpdateCurrentPasswordForm, UserProfileData } from "../types";

export const updateProfile = async (formData: UserProfileData) => {
  try {
    const url = "/auth/profile";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const changePassword = async (formData: UpdateCurrentPasswordForm) => {
  try {
    const url = "/auth/update-password";
    const {data} = await api.post(url, formData);
    console.log(data);
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
