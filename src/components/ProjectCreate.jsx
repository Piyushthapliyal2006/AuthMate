import React, { useState, useEffect } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import axios from 'axios';
import PasswordInputField from '../components/PasswordInputField';  // Import the PasswordInputField component
import CopyContent from '../components/CopyContent';
import { conf } from "@/conf/conf.js";

export const ProjectCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false); // Loading state for the submit button
  const [retrying, setRetrying] = useState(false); // Flag to prevent multiple retries
  const [data, setData] = useState({}); // State to hold the project data
  const [projectCreated, setProjectCreated] = useState(false);


  // Helper function to get token from localStorage
  const getToken = () => localStorage.getItem('accessToken');

  // Helper function to refresh the access token if expired
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const url = `${VITE_PROD_BASE_URL}/api/refresh/`;
        const response = await axios.post(url, {
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
      const url = `${conf.prodBaseUrl}/api/projects/`;
      const response = await axios.post(
        url,
        {
          project_name: projectName,
          project_type: projectType,
          description: description,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
      setData(response.data);// Assuming the response contains the project data

      setProjectCreated(true); // ✅ Set this flag

      setMessage('Project created successfully!');
      setMessageType('success');
      setProjectName(''); // Clear the project name input after success
      setProjectType(''); // Reset project type dropdown
      setDescription(''); // Clear description
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
    setProjectType(''); // Reset project type dropdown
    setDescription(''); // Clear description
    setMessage(''); // Clear any message
    setMessageType(''); // Reset message type
    setIsModalOpen(false); // Close the form
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

  console.log('ProjectCreate component rendered');

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        <FiPlus className="mr-2" />
        Create Project
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 transition-opacity duration-300 ease-in-out">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {projectCreated ? 'Project Created' : 'Create New Project'}
              </h2>
              <button
                onClick={() => {
                  handleCancel();
                  setProjectCreated(false); // reset for next time
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {projectCreated ? (
              <div className="mt-4">
                <PasswordInputField
                  label="API Key"
                  name="api_key"
                  value={data.api_key_value}
                  onChange={() => { }}
                  required={false}
                  autoComplete="off"
                  readOnly={true}
                />
                <CopyContent
                  content={data.api_key_value}
                  buttonText="Copy API Key"
                  successText="API Key Copied!"
                  className="mt-2"
                />
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setProjectCreated(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 ease-in-out"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                {message && (
                  <div className={`p-4 rounded-md ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 ease-in-out"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 ease-in-out"
                    >
                      <option value="">Select Type</option>
                      <option value="web">Web</option>
                      <option value="mobile">Mobile</option>
                      <option value="desktop">Desktop</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 ease-in-out"
                      rows="4"
                    ></textarea>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProjectName('');
                        setProjectType('');
                        setDescription('');
                        setMessage('');
                        setMessageType('');
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 ease-in-out"
                    >
                      {loading ? 'Creating...' : 'Create'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out" style={{ display: isModalOpen ? 'block' : 'none' }}></div>
    </>
  );
};;

