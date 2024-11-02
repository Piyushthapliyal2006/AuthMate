import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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

export default function Login() {
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        const data = JSON.stringify({
            email: formData.email,
            password: formData.password,
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/auth/jwt/create/',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        try {
            const response = await axios.request(config);
            const { refresh, access } = response.data; // Get tokens from response
            localStorage.setItem('refreshToken', refresh); // Store refresh token
            localStorage.setItem('accessToken', access);   // Store access token
            setMessage('Login successful!'); // Display success message
            navigate('/dashboard'); // Redirect to dashboard
        } catch (err) {
            const errorMsg = err.response?.data?.non_field_errors?.[0] || 'An error occurred. Please try again.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full bg-white">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Log In to Your Account
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
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                        <div className="text-sm">
                            <Link to="/users/reset_password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </Link>
                        </div>

                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={loading}
                            >
                                {loading ? 'Logging In...' : 'Log In'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
