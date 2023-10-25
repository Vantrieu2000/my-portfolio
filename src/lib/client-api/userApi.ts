import axios, { AxiosError } from 'axios';
import { ApiResponse, GenericObject } from '../types/common';
import { UserBusinessInformation, UserRegisterDetails, UserTenderInformation } from '@/server/dto/user';

const BASE_API = '/api/users';

export async function checkEmailExistAPI(email: string) {
    try {
        const response = (await axios.post(BASE_API + '/email-check', { email })).data;

        return response as ApiResponse<{
            exist: boolean;
            account_status?: string;
        }>;
    } catch (error) {
        if (error instanceof AxiosError) return error.response?.data || {};
        else console.error(error);
    }
}

export async function registerUserAPI(payload: GenericObject) {
    try {
        const response = (await axios.post(BASE_API + '/sign-up', payload)).data;
        return response as ApiResponse<any>;
    } catch (error) {
        if (error instanceof AxiosError) return error.response?.data || {};
        else console.error(error);
    }
}

export async function userLoginAPI(payload: GenericObject) {
    try {
        const response = (await axios.post(BASE_API + '/sign-in', payload)).data;
        return response as ApiResponse<any>;
    } catch (error) {
        if (error instanceof AxiosError) return error.response?.data || {};
        else console.error(error);
    }
}

export async function updateUserRegisterDetailsAPI(payload: UserRegisterDetails) {
    try {
        const response = (await axios.post(BASE_API + '/update-register', payload)).data;
        return response as ApiResponse<any>;
    } catch (error) {
        if (error instanceof AxiosError) return error.response?.data || {};
        else console.error(error);
    }
}

export async function updateUserBusinessInformationAPI(payload: UserBusinessInformation) {
    try {
        const response = (await axios.put(BASE_API + '/business-information', payload)).data;
        return response as ApiResponse<any>;
    } catch (error) {
        if (error instanceof AxiosError) return error.response?.data || {};
        else console.error(error);
    }
}

export async function updateUserTenderInformationAPI(payload: UserTenderInformation) {
    try {
        const response = (await axios.put(BASE_API + '/tender-information', payload)).data;
        return response as ApiResponse<any>;
    } catch (error) {
        if (error instanceof AxiosError) return error.response?.data || {};
        else console.error(error);
    }
}

export async function updateUserInformationAPI(payload: UserTenderInformation) {
    try {
        const response = (await axios.put(BASE_API + '/update-user-information', payload)).data;
        return response as ApiResponse<any>;
    } catch (error) {
        if (error instanceof AxiosError) return error.response?.data || {};
        else console.error(error);
    }
}

export async function uploadAndSetProfileImageAPI(formData: any) {
    try {
        const response = (
            await axios.post(BASE_API + '/profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        ).data;
        return response as ApiResponse<{ image: string }>;
    } catch (error) {
        if (error instanceof AxiosError) return error.response?.data || {};
        else console.error(error);
    }
}
