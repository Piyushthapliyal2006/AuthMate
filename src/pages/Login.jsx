import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { login } from '../store/authSlice';
import { ArrowLeftIcon, ExclamationTriangleIcon, CheckCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import PasswordInputField from '../components/PasswordInputField';
import { conf } from "@/conf/conf.js";

// Enhanced InputField with animations
const InputField = ({ label, type, name, value, onChange, required, autoComplete, error }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <label htmlFor={name} className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {label}
        </label>
        <div className="relative">
            <input
                id={name}
                name={name}
                type={type}
                required={required}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className={`block w-full px-4 py-3 rounded-xl border-0 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 shadow-lg ring-1 ring-inset ${
                    error 
                        ? 'ring-red-400 dark:ring-red-400 focus:ring-red-500 dark:focus:ring-red-400' 
                        : 'ring-gray-200 dark:ring-gray-500 focus:ring-blue-500 dark:focus:ring-blue-400'
                } placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-inset transition-all duration-300 sm:text-sm hover:shadow-xl`}
                placeholder={`Enter your ${label.toLowerCase()}`}
            />
            {error && (
                <ExclamationTriangleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
            )}
        </div>
        <AnimatePresence>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                >
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
    </motion.div>
);

// Enhanced Alert Component
const Alert = ({ type, message, onClose }) => {
    const isError = type === 'error';
    const Icon = isError ? ExclamationTriangleIcon : CheckCircleIcon;
    
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className={`p-4 rounded-xl border backdrop-blur-sm ${
                    isError 
                        ? 'bg-red-50/80 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                        : 'bg-green-50/80 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                }`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${isError ? 'text-red-500' : 'text-green-500'}`} />
                        <span className="text-sm font-medium">{message}</span>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className={`ml-4 text-sm font-medium ${
                                isError ? 'text-red-600 hover:text-red-500' : 'text-green-600 hover:text-green-500'
                            } transition-colors`}
                        >
                            ×
                        </button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [authState, setAuthState] = useState({ message: '', error: '', loading: false });
    const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return '';
    };

    const validatePassword = (password) => {
        if (!password) return 'Password is required';
        if (password.length < 6) return 'Password must be at least 6 characters';
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear errors when user starts typing
        if (authState.error) {
            setAuthState((prev) => ({ ...prev, error: '' }));
        }
        
        // Real-time field validation
        let fieldError = '';
        if (name === 'email') {
            fieldError = validateEmail(value);
        } else if (name === 'password') {
            fieldError = validatePassword(value);
        }
        
        setFieldErrors((prev) => ({ ...prev, [name]: fieldError }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const emailError = validateEmail(formData.email);
        // const passwordError = validatePassword(formData.password);
        
        // if (emailError || passwordError) {
        //     setFieldErrors({ email: emailError, password: passwordError });
        //     return;
        // }

        setAuthState({ message: '', error: '', loading: true });
        setFieldErrors({ email: '', password: '' });

        try {
            const { email, password } = formData;
            const url = `${conf.prodBaseUrl}/api/auth/jwt/create/`;
            
            const response = await axios.post(url, { email, password });
            
            const { access, refresh } = response.data;

            if (!access || !refresh) {
                throw new Error('Authentication tokens are missing. Please try again.');
            }

            dispatch(login({ access, refresh }));
            setAuthState({ message: 'Login successful! Redirecting to dashboard...', error: '', loading: false });
            
            // Delay navigation to show success message
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (err) {
            let errorMsg = 'An unexpected error occurred. Please try again.';
            
            if (err?.response?.status === 401) {
                errorMsg = 'Invalid email or password. Please check your credentials and try again.';
            } else if (err?.response?.status === 429) {
                errorMsg = 'Too many login attempts. Please wait a moment and try again.';
            } else if (err?.response?.status >= 500) {
                errorMsg = 'Server error. Please try again later.';
            } else if (err?.response?.data?.non_field_errors?.[0]) {
                errorMsg = err.response.data.non_field_errors[0];
            } else if (err?.message) {
                errorMsg = err.message;
            }
            
            setAuthState({ message: '', error: errorMsg, loading: false });
        }
    };

    const clearAlert = () => {
        setAuthState((prev) => ({ ...prev, message: '', error: '' }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400/60 to-purple-400/60 dark:from-blue-600/40 dark:to-purple-600/40 blur-3xl"
                />
                <motion.div
                    animate={{ 
                        rotate: -360,
                        scale: [1.2, 1, 1.2],
                        opacity: [0.15, 0.4, 0.15]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 -right-40 h-96 w-96 rounded-full bg-gradient-to-l from-purple-400/60 to-pink-400/60 dark:from-purple-600/40 dark:to-pink-600/40 blur-3xl"
                />
            </div>

            <div className="relative z-10 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {/* Back Button */}
                {location.pathname === '/auth/login' && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <button
                            onClick={() => navigate('/')}
                            className="group flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-white/95 dark:bg-gray-700/95 backdrop-blur-sm rounded-xl border border-blue-200 dark:border-blue-600 hover:shadow-lg transition-all duration-300"
                        >
                            <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                            <span className="font-medium">Back to Home</span>
                        </button>
                    </motion.div>
                )}

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="sm:mx-auto sm:w-full sm:max-w-md"
                >
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            <img
                                alt="AuthMate Logo"
                                src="/favicon.svg"
                                className="h-20 w-auto drop-shadow-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                        </div>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-8 text-center text-3xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
                    >
                        Welcome Back
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-3 text-center text-gray-600 dark:text-gray-300"
                    >
                        Sign in to your AuthMate account
                    </motion.p>
                </motion.div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-10 sm:mx-auto sm:w-full sm:max-w-md"
                >
                    <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl px-8 py-10 shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-600/50 rounded-3xl border border-white/30 dark:border-gray-600/30">
                        {/* Alert Messages */}
                        <AnimatePresence>
                            {authState.error && (
                                <div className="mb-6">
                                    <Alert type="error" message={authState.error} onClose={clearAlert} />
                                </div>
                            )}
                            {authState.message && (
                                <div className="mb-6">
                                    <Alert type="success" message={authState.message} onClose={clearAlert} />
                                </div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <InputField
                                label="Email address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                error={fieldErrors.email}
                            />
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <PasswordInputField
                                    label="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                    classNameInput="px-4 py-3 rounded-xl bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                                    error={fieldErrors.password}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <button
                                    type="submit"
                                    disabled={authState.loading}
                                    className="group relative w-full flex justify-center items-center gap-3 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {/* Animated background gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Content */}
                                    <div className="relative z-10 flex items-center gap-2">
                                        {authState.loading ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                                                />
                                                <span>Signing In...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Sign In</span>
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                                            </>
                                        )}
                                    </div>
                                </button>
                            </motion.div>
                        </form>

                        {/* Links Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="mt-8 space-y-4"
                        >
                            <div className="text-center">
                                <Link
                                    to="/users/reset_password/"
                                    className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-500"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white/95 dark:bg-gray-800/95 px-4 text-gray-500 dark:text-gray-300">
                                        New to AuthMate?
                                    </span>
                                </div>
                            </div>

                            <div className="text-center">
                                <Link 
                                    to="/auth/signup" 
                                    className="group inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-300"
                                >
                                    <span>Create an account</span>
                                    <motion.span
                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        →
                                    </motion.span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
