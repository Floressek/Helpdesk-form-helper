import React from "react";

interface ProgressBarProps {
    percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    // Ensure percentage is a valid number between 0-100
    const safePercentage = isNaN(percentage) ? 0 : Math.max(0, Math.min(100, percentage));

    // Color based on completion
    let barColor = "bg-red-500";
    if (safePercentage >= 80) {
        barColor = "bg-green-500";
    } else if (safePercentage >= 40) {
        barColor = "bg-yellow-500";
    } else if (safePercentage >= 20) {
        barColor = "bg-orange-500";
    }

    return (
        <div className="w-full bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
            <div
                className={`${barColor} h-4 rounded-full transition-all duration-500`}
                style={{width: `${safePercentage}%`}}
            />
            <div className="text-xs text-gray-300 text-right mt-1">
                {Math.round(safePercentage)}% Complete
            </div>
        </div>
    )
}

export default ProgressBar;