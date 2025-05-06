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

    // For the progress bar - urgency
    if (type === 'range') {
        return (
            <div className="mb-4">
                <label className="block text-gray-300 font-medium mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-300">1</span>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={Number(value)}
                        readOnly
                        className="w-full accent-blue-500"
                    />
                    <span className="text-gray-300">10</span>
                </div>
                <p className="text-center text-lg font-bold mt-2 text-blue-400">{value}</p>
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