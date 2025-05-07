import axios from 'axios';
import type {FormData, ApiResponse, InitialMessageResponse, ChatMessage} from '@/types';

// Vite proxy configuration
const API_URL = '/api';

// This whole module is responsible for making API calls to the backend
export const getInitialMessage = async (): Promise<string> => {
    try {
        const response = await axios.get<InitialMessageResponse>(`${API_URL}/initial-message/`);
        return response.data.message;
    } catch (error) {
        console.error('Error fetching initial message:', error);
        throw error;
    }
};

export const sendMessage = async (
    message: string,
    formData: Partial<FormData>,
    chatHistory: ChatMessage[]
): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(`${API_URL}/chat/`, {
            message,
            form_data: formData,
            chat_history: chatHistory
        });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const submitForm = async (formData: FormData): Promise<void> => {
    try {
        // Ready code for connection to db or smth
        // const response = await axios.post<FormData>(`${API_URL}/forms/`, formData);
        // return response.data;
        // For testing purposes, we will just return the formData in an alert in json
        alert(JSON.stringify(formData, null, 2));
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
};