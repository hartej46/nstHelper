import { apiClient } from "./apiClient";

export const signUp = async (userData) => {
    try {
        const response = await apiClient.post('/user/register', userData);
        return response;
    } catch (error) {
        throw error.response?.data?.message || 'Something went wrong during signup';
    }
}

export const logIn = async (userData) => {
    try {
        const response = await apiClient.post('/user/login', userData);
        return response;
    } catch (error) {
        throw error.response?.data?.message || "SomeThing went wrong during login"
    }
}

export const logOut = async () => {
    try {
        const response = await apiClient.post('/user/logout');
        return response;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong during logout"
    }
}

export const verify = async(userData) => {
     try {
        const response = await apiClient.post('/user/verify', userData);
        return response;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong during verification";
    }
}

export const resendOtp = async(userData) => {
     try {
        const response = await apiClient.post('/user/resend');
        return response;
    } catch (error) {
        throw error.response?.message || "Something went wrong during sending otp";
    }
}

export const reset = async(userData) => {
     try {
        const response = await apiClient.post('/user/reset-password');
        return response;
    } catch (error) {
        throw error.response?.message || "Something went wrong during reset password";
    }
}

export const forgot = async(userData) => {
     try {
        const response = await apiClient.post('/user/forgot-password');
        return response;
    } catch (error) {
        throw error.response?.message || "Something went wrong during send request for resend passowrd";
    }
}

export const userInfo = async() => {
    try {
        const response = await apiClient.get('/user/me');
        return response;
    } catch (error) {
        console.log(error)
        throw error.response?.message || "Something went wrong during userinfo fetch";
    }
}


export const getQuestionsApi = async (subject = "psp", search = "", nextCursor = null) => {
    try {
        const response = await apiClient.get('/question', {
            params: {
                subject: subject,
                search: search || undefined,
                cursor: nextCursor || undefined,
                limit: 15
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong while getting questions";
    }
}

export const getListOfSubject = async () => {
    try {
        const response = await apiClient.get('/question/subject');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong during loading subject";
    }
}

export const questionDetail = async ({id}) => {
    try {
        const response = await apiClient.get(`/question/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong during loading question";
    }
}