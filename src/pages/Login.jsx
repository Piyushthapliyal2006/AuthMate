import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import PasswordInputField from '../components/PasswordInputField'; // Import the new PasswordInputField

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [authState, setAuthState] = useState({ message: '', error: '', loading: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear any previous error messages when user starts typing
        if (authState.error) {
            setAuthState((prev) => ({ ...prev, error: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthState({ message: '', error: '', loading: true });

        try {
            const { email, password } = formData;

            // Send API request to authenticate the user
            const response = await axios.post('http://127.0.0.1:8000/auth/jwt/create/', { email, password });

            const { access, refresh } = response.data;

            if (!access || !refresh) {
                throw new Error('Access or Refresh token is missing in the response');
            }

            // Dispatch login action with both tokens
            dispatch(login({ access, refresh }));

            setAuthState({ message: 'Login successful!', error: '', loading: false });
            navigate('/dashboard');
        } catch (err) {
            const errorMsg = err?.response?.data?.non_field_errors?.[0] || 'An error occurred. Please try again.';
            setAuthState({ message: '', error: errorMsg, loading: false });
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

                        {/* Replaced Password Input with the new PasswordInputField */}
                        <PasswordInputField
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />

                        {authState.error && <p className="mt-2 text-sm text-red-600">{authState.error}</p>}
                        {authState.message && <p className="mt-2 text-sm text-green-600">{authState.message}</p>}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={authState.loading}
                            >
                                {authState.loading ? 'Logging In...' : 'Log In'}
                            </button>
                        </div>
                    </form>

                    {/* Additional links */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/users/reset_password/"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    </div>

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
