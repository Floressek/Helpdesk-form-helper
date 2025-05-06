import React from "react";
import type {ChatMessage} from "@/types";

interface ChatBubbleProps {
    message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({message}) => {
    const isUser = message.sender === "user"; // Check if the message is from the user

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
        >
            <div
                className={`p-3 rounded-lg md:max-w-md max-w-xs ${
                    isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-700 text-gray-200 rounded-bl-none'
                }`}
            >
                {message.message}
            </div>
        </div>
    );
}
export default ChatBubble;
