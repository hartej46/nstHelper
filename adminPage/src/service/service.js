import { apiClient } from "./apiClient";

export const addquestion = async (question) => {
    try {
        const response = await apiClient.post('/question/addquestion', question);
        return response;
    } catch (error) {
         throw error.response?.data?.message || 'Something went wrong while adding question';
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

export const userInfo = async() => {
    try {
        
        const response = await apiClient.get('/user/me');
        return response;
    } catch (error) {
        console.log(error)
        throw error.response?.message || "Something went wrong during userinfo fetch";
    }
}