import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";

export const createAccount = async (formData: UserRegistrationForm) => {
    try {
        const url = "/auth/create-account";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
        }
    }
}
export const confirmAccount = async (formData: ConfirmToken) => {
    try {
        const url = "/auth/confirm-account";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
        }
    }
}

export const generateNewToken = async (formData: RequestConfirmationCodeForm) => {
    try {
        const url = "/auth/request-code";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
        }
    }
}

export const authenticateUser = async (formData: UserLoginForm) => {
    try {
        const url = "/auth/login";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
        }
    }
}