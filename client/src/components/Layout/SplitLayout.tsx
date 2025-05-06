import React from "react";
import ChatContainer from "@/components/Chat/ChatContainer";
import FormContainer from "@/components/Form/FormContainer.tsx";

const SplitLayout: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-gray-100">
            <div className="w-full md:w-1/2 h-1/2 md:h-full">
                {/*<p>Placeholder</p>*/}
                <FormContainer />
            </div>

            <div className="w-full md:w-1/2 h-1/2 md:h-full">
                <ChatContainer/>
            </div>
        </div>
    );
};

export default SplitLayout;