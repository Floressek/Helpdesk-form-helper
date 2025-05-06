import React, {useState, useRef, useEffect} from "react";
import ChatBubble from "@/components/Chat/ChatBubble";
import ChatInput from "@/components/Chat/ChatInput";
import {useFormContext} from "@/context/FormContext";
import { getInitialMessage, sendMessage} from "@/services/api";

const ChatContainer: React.FC = () => {
    const {formData, chatHistory, addChatMessage, updateFormData, isComplete} = useFormContext();
    const [isPending, setIsPending] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null); // Reference to the chat container will be used to scroll to the bottom

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]); // Scroll to the bottom whenever chat history changes

    // Initial message
    useEffect(() => {
        const initializeChat = async () => {
            if (chatHistory.length === 0) {
                setIsPending(true);
                try {
                    const message = await getInitialMessage();
                    addChatMessage({
                        sender: 'assistant',
                        message: message
                    });
                } catch (error) {
                    console.error("Error fetching initial message:", error);
                    addChatMessage({
                        sender: 'assistant',
                        message: "Hello! How can I assist you today?"
                    });
                } finally {
                    setIsPending(false);
                }
            }
        };
        initializeChat();
    }, [])

    const handleSendMessage = async (message: string) => {
        addChatMessage({
            sender: 'user',
            message: message
        });
        setIsPending(true);
        try {
            // Ai response
            const response = await sendMessage(message, formData);

            if (response.form_updates) {
                updateFormData(response.form_updates);
            }

            // Response from the AI
            addChatMessage({
                sender: 'assistant',
                message: response.ai_response
            });
        } catch (error) {
            console.error("Error sending message:", error);
            addChatMessage({
                sender: 'assistant',
                message: "Sorry, I couldn't process your request. Please try again."
            });
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="">
                <h2 className="">AI Helpdesk Assistant</h2>
            </div>

            <div
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                    {chatHistory.map((msg, index) => (
                        <ChatBubble key={index} message={msg}></ChatBubble>
                    ))}

                    {isPending && (
                        <div className="flex justify-center">
                            <div className="">
                                Ai is typing...
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isPending || isComplete}></ChatInput>
        </div>
    )
};

export default ChatContainer;