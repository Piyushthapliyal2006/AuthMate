import React, { useState } from 'react';

const PasswordInputField = ({ label, name, value, onChange, required, autoComplete }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-2 relative">
                <input
                    id={name}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    required={required}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500"
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
        </div>
    );
};

export default PasswordInputField;
