import axios from 'axios';
import { useState, useEffect } from 'react';

export default function ProjectCreateForm({ onClose }) {
    const [projectName, setProjectName] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [loading, setLoading] = useState(false); // Loading state to disable the submit button
    const [retrying, setRetrying] = useState(false); // Flag to prevent multiple retries

    // Helper function to get token from localStorage
    const getToken = () => localStorage.getItem('accessToken');

    // Helper function to refresh the access token if expired
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/auth/refresh/', {
                    refresh: refreshToken,
                });
                const newAccessToken = response.data.access;
                localStorage.setItem('accessToken', newAccessToken);
                return newAccessToken;
            } catch (error) {
                console.error('Token refresh failed:', error);
                setMessage('Session expired. Please log in again.');
                setMessageType('error');
                return null;
            }
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getToken();

        if (!token) {
            setMessage('You need to be logged in to create a project.');
            setMessageType('error');
            return;
        }

        if (!projectName.trim()) {
            setMessage('Project name is required.');
            setMessageType('error');
            return;
        }

        setLoading(true); // Set loading state to true while request is in progress
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/projects/',
                { project_name: projectName },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(response.data);
            setMessage('Project created successfully!');
            setMessageType('success');
            setProjectName(''); // Clear the project name input after success
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401 && !retrying) {
                // Token expired, try to refresh the token
                setRetrying(true); // Prevent further retries while waiting for the token refresh
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    // Retry the API request with the new token
                    handleSubmit(e); // We call the submit function again after refreshing token
                }
                setRetrying(false); // Reset retrying flag after the refresh attempt
            } else {
                setMessage(error?.response?.data?.detail || 'Failed to create project. Please try again.');
                setMessageType('error');
            }
        } finally {
            setLoading(false); // Reset loading state after request is done
        }
    };

    const handleCancel = () => {
        setProjectName(''); // Clear project name
        setMessage(''); // Clear any message
        setMessageType(''); // Reset message type
        onClose(); // Close the form
    };

    // Clear message after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 5000);
            return () => clearTimeout(timer); // Cleanup the timer on unmount
        }
    }, [message]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                {message && (
                    <div className={`p-4 rounded-md ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="projname" className="block text-sm font-medium text-gray-900">
                            Project Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="projname"
                                name="project_name"
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        onClick={handleCancel} // Handle cancel click
                        className="text-sm font-semibold text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading} // Disable button when loading
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {loading ? 'Saving...' : 'Save'} {/* Show "Saving..." when loading */}
                    </button>
                </div>
            </div>
        </form>
    );
}
