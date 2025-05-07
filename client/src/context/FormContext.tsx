import React, {createContext, useContext, useState, type ReactNode, useCallback} from 'react';
import type {FormData, ChatMessage} from '@/types';

interface FormContextType {
    formData: Partial<FormData>;
    chatHistory: ChatMessage[];
    updateFormData: (data: Partial<FormData>) => void; // Function to update form data
    addChatMessage: (message: ChatMessage) => void; // Function to add a chat message
    isComplete: boolean;
    resetForm: () => void; // Function to reset the form
}

// Create a context for the form data
const FormContext = createContext<FormContextType | undefined>(undefined);

// Create a provider component
export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};

interface FormProviderProps {
    children: ReactNode;
}

// The FormProvider component wraps the application and provides the form data context
export const FormProvider: React.FC<FormProviderProps> = ({children}) => {
    // Basic form data state
    const [formData, setFormData] = useState<Partial<FormData>>({
        first_name: '',
        last_name: '',
        email: '',
        reason_of_contact: '',
        urgency: NaN,
    });

    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

    const updateFormData = (updates: Partial<FormData>) => {
        setFormData((prev) => ({
            ...prev,
            ...updates
        }));
    };

    const addChatMessage = (message: ChatMessage) => {
        setChatHistory((prev) => [
            ...prev,
            message
        ]);
    };

    const resetForm = useCallback(() => {
        window.location.reload();
    }, []);

    const isComplete = Boolean(
        formData.first_name &&
        formData.last_name &&
        formData.email &&
        formData.reason_of_contact &&
        formData.urgency
    );

    return (
        <FormContext.Provider
            value={{
                formData,
                chatHistory,
                updateFormData,
                addChatMessage,
                isComplete,
                resetForm
            }}
        >
            {children}
        </FormContext.Provider>
    );
};