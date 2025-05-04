import React, { useState } from 'react';

const PasswordInputField = ({ label, name, value, onChange, required, autoComplete, readOnly = false }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-800 dark:text-gray-200">
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
                    readOnly={readOnly}
                    className={`block w-full rounded-md py-1.5 pr-10 pl-3 sm:text-sm
                        bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-gray-100 
                        border border-gray-300 dark:border-gray-600 
                        placeholder:text-gray-400 dark:placeholder:text-gray-500
                        focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
        </div>
    );
};

export default PasswordInputField;
