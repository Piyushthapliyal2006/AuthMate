import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; // Heroicons for the back button

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // For navigation to login page

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            await axios.post('http://127.0.0.1:8000/auth/users/reset_password/', { email }, {
                headers: { 'Content-Type': 'application/json' }
            });
            setMessage('Password reset link sent! Please check your email.');
        } catch (error) {
            setMessage('Failed to send reset link. Please try again.');
        } finally {
            setLoading(false); // Stop loading after request completes
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/auth/login')}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Login
                </button>

                <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full px-4 py-2 font-semibold text-white rounded-lg focus:outline-none 
                        ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;
