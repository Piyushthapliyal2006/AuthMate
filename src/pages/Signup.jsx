import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import PasswordInputField from '../components/PasswordInputField'; // Import PasswordInputField component
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; // Import the back arrow icon
import { conf } from "@/conf/conf.js";

const InputField = ({ label, type, name, value, onChange, required, autoComplete }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-900">
            {label}
        </label>
        <div className="mt-2">
            <input
                id={name}
                name={name}
                type={type}
                required={required}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
        </div>
    </div>
);

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        rePassword: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        const { email, name, password, rePassword } = formData;

        try {
            const url = `auth/users/`;
            await axios.post(url, {
                email,
                name,
                password,
                re_password: rePassword,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            setMessage('Signup successful!');
            setFormData({ email: '', name: '', password: '', rePassword: '' });
        } catch (err) {
            const errorMsg = err.response?.data?.email?.[0] ||
                err.response?.data?.non_field_errors?.[0] ||
                'An error occurred. Please try again.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full bg-white">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')} // Navigate back to the login page
                    className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back
                </button>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Sign Up for an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField
                            label="Email address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                        <InputField
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                        />
                        {/* Replace password and confirm password inputs with PasswordInputField */}
                        <PasswordInputField
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                        <PasswordInputField
                            label="Confirm Password"
                            name="rePassword"
                            value={formData.rePassword}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />

                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={loading}
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already Registered?{' '}
                        <Link to="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
