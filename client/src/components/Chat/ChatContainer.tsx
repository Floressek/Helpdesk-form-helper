import React, {useState, useRef, useEffect} from "react";
import ChatBubble from "@/components/Chat/ChatBubble";
import ChatInput from "@/components/Chat/ChatInput";
import {useFormContext} from "@/context/FormContext";
import {getInitialMessage, sendMessage} from "@/services/api";

const ChatContainer: React.FC = () => {
    // const {formData, chatHistory, addChatMessage, updateFormData, isComplete} = useFormContext();
    const {formData, chatHistory, addChatMessage, updateFormData} = useFormContext();
    const [isPending, setIsPending] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null); // Reference to the chat container will be used to scroll to the bottom
    const initRef = useRef(false); // Reference to check if the component has mounted

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]); // Scroll to the bottom whenever chat history changes

    // Initial message
    useEffect(() => {
        const initializeChat = async () => {
            if (chatHistory.length === 0 && !initRef.current) {
                initRef.current = true; // Set the reference to true to prevent re-initialization
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
            // console.log("Sending message:", message);
            // console.log("Form data:", formData);
            // console.log("Chat history:", message);
            const response = await sendMessage(message, formData, chatHistory);

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
        <div className="flex flex-col h-full bg-gray-900 border-l border-gray-700">
            <div className="bg-blue-600 p-4 text-white">
                <h2 className="text-xl font-semibold">AI Helpdesk Assistant</h2>
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
                            <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded">
                                Ai is typing...
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ChatInput
                onSendMessage={handleSendMessage}
                disabled={isPending}></ChatInput>
        </div>
    )
};

export default ChatContainer;