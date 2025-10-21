import React, { useState } from 'react';

function PersonalData({ fullName, email, phoneNumber, department }) {
    const [selectedField, setSelectedField] = useState('');

    const handleFocus = (field) => {
        setSelectedField(field);
    };

    const handleBlur = () => {
        setSelectedField('');
    };

    return (
        <div className="step-container bg-white p-8 rounded-md shadow-md mt-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Your Details</h2>

            <div className="space-y-6">
                {[
                    { label: 'Full Name', value: fullName, id: 'fullName' },
                    { label: 'Email Address', value: email, id: 'email' },
                    { label: 'Phone Number', value: phoneNumber, id: 'phoneNumber' },
                    { label: 'Department', value: department, id: 'department' },
                ].map(({ label, value, id }) => (
                    <div className="w-full" key={id}>
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                        <input
                            type="text"
                            id={id}
                            value={value || ""}
                            className={`w-full p-3 rounded-md border ${selectedField === id ? 'border-custom-red' : 'border-gray-300'} bg-gray-100 focus:outline-none`}
                            readOnly
                            onFocus={() => handleFocus(id)}
                            onBlur={handleBlur}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PersonalData;
