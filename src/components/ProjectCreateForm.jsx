import axios from 'axios';
import { useState, useEffect } from 'react';

export default function ProjectCreateForm({ onClose }) {
    const [projectName, setProjectName] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken'); // Replace with your actual key

        try {
            const response = await axios.post('http://127.0.0.1:8000/projects/', {
                project_name: projectName,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Use the token from local storage
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);
            setMessage('Project created successfully!');
            setMessageType('success');
            setProjectName(''); // Clear input
        } catch (error) {
            console.error(error);
            setMessage('Failed to create project. Please try again.');
            setMessageType('error');
        }
    };

    const handleCancel = () => {
        setProjectName(''); // Clear the project name input
        setMessage(''); // Clear any displayed message
        setMessageType(''); // Reset the message type
        onClose(); // Close the form if a callback is provided
    };

    // Clear message after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 5000);

            return () => clearTimeout(timer);
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
                        onClick={handleCancel} // Call handleCancel on click
                        className="text-sm font-semibold text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}
