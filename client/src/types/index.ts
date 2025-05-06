export interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    reason_of_contact: string;
    urgency: number;
}

export interface ChatMessage {
    sender: 'user' | 'assistant';
    message: string;
}

export interface ApiResponse {
    ai_response: string;
    form_updates?: Partial<FormData>; // Optional updates to the form data
}

export interface InitialMessageResponse {
    message: string;
}