import React from "react";

interface ProgressBarProps {
    percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    return (
        <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
            <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-500"
            style={{width: `${percentage}%`}}/>
        </div>
    )
}

export default ProgressBar;