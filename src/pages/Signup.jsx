import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { conf } from "@/conf/conf.js";

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

// Enhanced Input Field Component
const InputField = ({ 
    label, 
    type, 
    name, 
    value, 
    onChange, 
    required, 
    autoComplete, 
    error,
    showPasswordStrength = false,
    passwordStrength = null
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
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
                    type={inputType}
                    required={required}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    className={`block w-full px-4 py-3 rounded-xl border-0 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 shadow-lg ring-1 ring-inset ${
                        error 
                            ? 'ring-red-400 dark:ring-red-400 focus:ring-red-500 dark:focus:ring-red-400' 
                            : 'ring-gray-200 dark:ring-gray-500 focus:ring-blue-500 dark:focus:ring-blue-400'
                    } placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-inset transition-all duration-300 sm:text-sm hover:shadow-xl ${
                        type === 'password' ? 'pr-12' : ''
                    }`}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                />
                
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                )}
                
                {error && !showPassword && (
                    <ExclamationTriangleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                )}
            </div>

            {/* Password Strength Indicator */}
            {showPasswordStrength && passwordStrength && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 space-y-2"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            Password Strength:
                        </span>
                        <span className={`text-xs font-bold ${
                            passwordStrength.score === 0 ? 'text-red-500 dark:text-red-400' :
                            passwordStrength.score === 1 ? 'text-red-400 dark:text-red-300' :
                            passwordStrength.score === 2 ? 'text-yellow-500 dark:text-yellow-400' :
                            passwordStrength.score === 3 ? 'text-blue-500 dark:text-blue-400' :
                            'text-green-500 dark:text-green-400'
                        }`}>
                            {passwordStrength.label}
                        </span>
                    </div>
                    
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                            <div
                                key={level}
                                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                    level <= passwordStrength.score + 1
                                        ? passwordStrength.score === 0 ? 'bg-red-500 dark:bg-red-400' :
                                          passwordStrength.score === 1 ? 'bg-red-400 dark:bg-red-300' :
                                          passwordStrength.score === 2 ? 'bg-yellow-500 dark:bg-yellow-400' :
                                          passwordStrength.score === 3 ? 'bg-blue-500 dark:bg-blue-400' :
                                          'bg-green-500 dark:bg-green-400'
                                        : 'bg-gray-200 dark:bg-gray-600'
                                }`}
                            />
                        ))}
                    </div>
                    
                    {passwordStrength.suggestions.length > 0 && (
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                            {passwordStrength.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-amber-500 dark:text-amber-400 mt-0.5">•</span>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </motion.div>
            )}

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
};

// Password strength validation function
const checkPasswordStrength = (password) => {
    if (!password) return { score: 0, label: 'Very Weak', suggestions: [] };
    
    let score = 0;
    const suggestions = [];
    
    // Length check
    if (password.length >= 8) score++;
    else suggestions.push('Use at least 8 characters');
    
    // Uppercase check
    if (/[A-Z]/.test(password)) score++;
    else suggestions.push('Include uppercase letters');
    
    // Lowercase check
    if (/[a-z]/.test(password)) score++;
    else suggestions.push('Include lowercase letters');
    
    // Number check
    if (/\d/.test(password)) score++;
    else suggestions.push('Include numbers');
    
    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    else suggestions.push('Include special characters (!@#$%^&*)');
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    
    return {
        score: Math.min(score, 4),
        label: labels[Math.min(score, 4)],
        suggestions: suggestions.slice(0, 3) // Limit to 3 suggestions
    };
};

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        rePassword: '',
    });
    
    const [fieldErrors, setFieldErrors] = useState({});
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(null);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!validateEmail(value)) return 'Please enter a valid email address';
                return '';
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters long';
                return '';
            case 'password':
                if (!value) return 'Password is required';
                if (value.length < 8) return 'Password must be at least 8 characters long';
                return '';
            case 'rePassword':
                if (!value) return 'Password confirmation is required';
                if (value !== formData.password) return 'Passwords do not match';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: '' }));
        }
        
        // Real-time password strength checking
        if (name === 'password') {
            setPasswordStrength(checkPasswordStrength(value));
        }
        
        // Real-time password match validation
        if (name === 'rePassword' || (name === 'password' && formData.rePassword)) {
            const passwordToCheck = name === 'password' ? value : formData.password;
            const confirmPassword = name === 'rePassword' ? value : formData.rePassword;
            
            if (confirmPassword && passwordToCheck !== confirmPassword) {
                setFieldErrors(prev => ({ ...prev, rePassword: 'Passwords do not match' }));
            } else {
                setFieldErrors(prev => ({ ...prev, rePassword: '' }));
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) errors[key] = error;
        });
        
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert(null);
        
        if (!validateForm()) {
            setAlert({
                type: 'error',
                message: 'Please fix the errors above before submitting.'
            });
            return;
        }
        
        setLoading(true);

        const { email, name, password, rePassword } = formData;

        try {
            const url = `${conf.prodBaseUrl}/api/auth/users/`;
            await axios.post(url, {
                email,
                name,
                password,
                re_password: rePassword,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            setAlert({
                type: 'success',
                message: 'Account created successfully! Please check your email to verify your account.'
            });
            setFormData({ email: '', name: '', password: '', rePassword: '' });
            setPasswordStrength(null);
            
            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);
            
        } catch (err) {
            console.error('Signup error:', err);
            
            let errorMessage = 'An unexpected error occurred. Please try again.';
            
            if (err.response?.status === 400) {
                const errorData = err.response.data;
                
                if (errorData.email) {
                    setFieldErrors(prev => ({ ...prev, email: errorData.email[0] }));
                    errorMessage = 'Please check your email address and try again.';
                } else if (errorData.name) {
                    setFieldErrors(prev => ({ ...prev, name: errorData.name[0] }));
                    errorMessage = 'Please check your name and try again.';
                } else if (errorData.password) {
                    setFieldErrors(prev => ({ ...prev, password: errorData.password[0] }));
                    errorMessage = 'Please check your password requirements.';
                } else if (errorData.non_field_errors) {
                    errorMessage = errorData.non_field_errors[0];
                }
            } else if (err.response?.status === 429) {
                errorMessage = 'Too many signup attempts. Please try again later.';
            } else if (err.response?.status >= 500) {
                errorMessage = 'Server error. Please try again later.';
            } else if (!err.response) {
                errorMessage = 'Network error. Please check your connection and try again.';
            }
            
            setAlert({
                type: 'error',
                message: errorMessage
            });
        } finally {
            setLoading(false);
        }
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
                        Create Your Account
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-3 text-center text-gray-600 dark:text-gray-300"
                    >
                        Join AuthMate and start building amazing projects
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
                            {alert && alert.type === 'error' && (
                                <div className="mb-6">
                                    <Alert type="error" message={alert.message} onClose={() => setAlert(null)} />
                                </div>
                            )}
                            {alert && alert.type === 'success' && (
                                <div className="mb-6">
                                    <Alert type="success" message={alert.message} onClose={() => setAlert(null)} />
                                </div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <InputField
                                label="Full Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                                error={fieldErrors.name}
                            />

                            <InputField
                                label="Email Address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                error={fieldErrors.email}
                            />

                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                error={fieldErrors.password}
                                showPasswordStrength={true}
                                passwordStrength={passwordStrength}
                            />

                            <InputField
                                label="Confirm Password"
                                type="password"
                                name="rePassword"
                                value={formData.rePassword}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                error={fieldErrors.rePassword}
                            />

                            {/* Submit Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center items-center gap-3 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden transition-all duration-500 transform hover:scale-[1.03] active:scale-[0.97]"
                                >
                                    {/* Animated background gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-110 group-hover:scale-100"></div>
                                    
                                    {/* Shimmer effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                                    
                                    {/* Shadow glow effect */}
                                    <div className="absolute inset-0 rounded-xl shadow-2xl shadow-purple-500/50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                                    
                                    {/* Content */}
                                    <div className="relative z-10 flex items-center gap-3">
                                        {loading ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                                                />
                                                <span>Creating Account...</span>
                                            </>
                                        ) : (
                                            <>
                                                <motion.span
                                                    className="group-hover:transform group-hover:translate-x-1 transition-transform duration-300"
                                                >
                                                    Create Account
                                                </motion.span>
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-10px] transition-all duration-300"
                                                >
                                                    →
                                                </motion.span>
                                            </>
                                        )}
                                    </div>
                                    
                                    {/* Ripple effect on click */}
                                    <div className="absolute inset-0 rounded-xl bg-white/30 opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-200"></div>
                                </button>
                            </motion.div>
                        </form>

                        {/* Login Link */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-8 text-center"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Already have an account?{' '}
                                <Link 
                                    to="/auth/login" 
                                    className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 hover:underline underline-offset-4"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
