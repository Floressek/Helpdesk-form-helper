import React, {useState, useRef, useEffect} from "react";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

// ChatInput component for sending messages
const ChatInput: React.FC<ChatInputProps> = ({onSendMessage, disabled = false}) => {
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!disabled && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disabled]);

    // Handle input change
    const handleSend = () => {
        // Check if the message is not empty or if the input is disabled
        if (!message.trim() || disabled) return;

        onSendMessage(message);
        setMessage("");
    };

    return (
        <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-1 p-3 border border-gray-600 rounded bg-gray-800 text-white"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSend();
                        }
                    }}
                    disabled={disabled}></input>
                <button
                    type="button"
                    onClick={handleSend}
                    className={`px-4 py-2 rounded ${
                        disabled
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled={disabled}>
                    Send
                </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
                Chat with the AI to complete your helpdesk form.
            </p>
        </div>
    )
}

export default ChatInput;