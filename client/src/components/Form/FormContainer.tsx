// src/components/Form/FormContainer.tsx
import React, { useState } from 'react';
import FormField from './FormField';
import ProgressBar from './ProgressBar';
import { useFormContext } from '@/context/FormContext';
import { submitForm } from '@/services/api';

const FormContainer: React.FC = () => {
    const { formData, isComplete, resetForm } = useFormContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Calculate percentage complete
    const calculateCompletion = () => {
        let completed = 0;
        const fields = ['first_name', 'last_name', 'email', 'reason_of_contact', 'urgency'];

        fields.forEach(field => {
            if (formData[field as keyof typeof formData]) {
                completed++;
            }
        });

        return (completed / fields.length) * 100;
    };

    const handleSubmit = async () => {
        if (!isComplete || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await submitForm(formData as any);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        resetForm();
        setIsSubmitted(false);
    };

    if (isSubmitted) {
        return (
            <div className="p-6 bg-gray-800 shadow-lg overflow-auto h-full">
                <div className="text-center py-10">
                    <svg
                        className="w-16 h-16 text-green-500 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-100 mb-4">Form Submitted Successfully!</h2>
                    <p className="text-gray-300 mb-8">Thank you for your submission. We'll get back to you soon.</p>
                    <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Start New Form
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-800 shadow-lg overflow-auto h-full">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Helpdesk Form</h2>

            <ProgressBar percentage={calculateCompletion()} />

            <div className="space-y-4">
                <FormField
                    label="First Name"
                    value={formData.first_name || ''}
                    helpText="Max 20 characters"
                    required
                />

                <FormField
                    label="Last Name"
                    value={formData.last_name || ''}
                    helpText="Max 20 characters"
                    required
                />

                <FormField
                    label="Email"
                    value={formData.email || ''}
                    type="email"
                    helpText="Must be a valid email format"
                    required
                />

                <FormField
                    label="Reason of Contact"
                    value={formData.reason_of_contact || ''}
                    type="textarea"
                    helpText="Max 100 characters"
                    required
                />

                <FormField
                    label="Urgency Level"
                    value={String(formData.urgency || '')}
                    type="range"
                    required
                />

                <button
                    onClick={handleSubmit}
                    className={`w-full py-3 px-4 mt-6 rounded font-bold ${
                        isComplete && !isSubmitting
                            ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!isComplete || isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                </button>
            </div>
        </div>
    );
};

export default FormContainer;