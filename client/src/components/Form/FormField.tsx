import React from 'react';

interface FormFieldProps {
    label: string;
    value: string;
    type?: string;
    helpText?: string; // Optional help text
    required?: boolean; // Optional required field indicator
}

const FormField: React.FC<FormFieldProps> = ({
                                                 label, value, type, helpText, required
                                             }) => {
    // For textboxes
    if (type === 'textarea') {
        return (
            <div className="mb-4">
                <label className="block text-gray-300 font-medium mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <textarea
                    value={String(value)}
                    readOnly
                    className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white h-24 focus:ring-2 focus:ring-blue-500"
                    placeholder="AI will fill it for you."
                />
                {helpText && <p className="text-xs text-gray-400 mt-1">{helpText}</p>}
            </div>
        );
    }

    // For the urgency level - range
    if (type === 'range') {
        // Ensure the value is a valid number
        const numericValue = Number(value) || 5;
        const safeValue = Math.max(1, Math.min(10, numericValue));

        // Color gradient based on urgency
        let valueColor = "text-green-400";
        if (safeValue >= 8) {
            valueColor = "text-red-500";
        } else if (safeValue >= 6) {
            valueColor = "text-orange-400";
        } else if (safeValue >= 4) {
            valueColor = "text-yellow-400";
        }

        return (
            <div className="mb-4">
                <label className="block text-gray-300 font-medium mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-300">1</span>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{width: `${(safeValue / 10) * 100}%`}}
                        />
                    </div>
                    <span className="text-gray-300">10</span>
                </div>
                <p className={`text-center text-lg font-bold mt-2 ${valueColor}`}>{safeValue}</p>
                <p className="text-center text-xs text-gray-400">
                    {safeValue <= 3 ? 'Low' : safeValue <= 6 ? 'Medium' : safeValue <= 8 ? 'High' : 'Critical'}
                </p>
            </div>
        );
    }


    return (
        <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                value={String(value)}
                readOnly
                className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                placeholder="AI will fill this for you"
            />
            {helpText && <p className="text-xs text-gray-400 mt-1">{helpText}</p>}
        </div>
    );
};

export default FormField;