import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordInputField from '../components/PasswordInputField';
import CopyContent from '../components/CopyContent';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteInput, setDeleteInput] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectDetails = async () => {
            const token = localStorage.getItem('accessToken');
            const url = `/api/projects/${id}`;

            try {
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProject(response.data);
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        fetchProjectDetails();
    }, [id]);

    const deleteProject = async () => {
        if (!project || deleteInput !== project.project_name) return;

        const token = localStorage.getItem('accessToken');
        const url = `/api/projects/${id}`;
        setIsDeleting(true);

        try {
            await axios.delete(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/projects');
        } catch (error) {
            console.error('Error deleting project:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (!project) {
        return (
            <div className="dark:bg-gray-900 px-6 sm:px-10 lg:px-12">
            {/* Skeleton loading placeholders */}
            <div className="animate-pulse space-y-6">
                <div className="bg-gray-300 dark:bg-gray-700 h-8 rounded w-3/4 mx-auto"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-10 rounded w-full mx-auto"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-6 rounded w-2/3 mx-auto"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2 mx-auto"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-12 rounded w-full mx-auto"></div>

                {/* Skeleton buttons */}
                <div className="flex justify-between space-x-4 mt-8">
                    <div className="bg-gray-300 dark:bg-gray-700 h-10 w-1/3 rounded"></div>
                    <div className="bg-gray-300 dark:bg-gray-700 h-10 w-1/3 rounded"></div>
                </div>
            </div>
        </div>
        );
    }

    return (
        <div className="dark:bg-gray-900 px-6 sm:px-10 lg:px-12">
            {/* Back Button */}
            <Link to="/projects" className="flex items-center text-blue-600 dark:text-blue-400 mb-6">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Projects
            </Link>

            {/* Project Details */}
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.project_name}</h1>

                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                    <p><strong>Description:</strong> {project.description || 'No description available.'}</p>
                    <p><strong>Project Type:</strong> {project.project_type || 'Not specified'}</p>
                    <p><strong>Status:</strong> {project.is_active ? 'Active' : project.is_archived ? 'Archived' : 'Unknown'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Created at: {new Date(project.created_at).toLocaleString()}
                    </p>
                </div>

                {/* API Key */}
                <div className="mt-6">
                    <PasswordInputField
                        label="API Key"
                        name="api_key"
                        value={project.api_key_value}
                        onChange={() => { }}
                        required={false}
                        autoComplete="off"
                        readOnly
                    />
                    <CopyContent
                        content={project.api_key_value}
                        buttonText="Copy API Key"
                        successText="API Key Copied!"
                        className="mt-2"
                    />
                </div>

                {/* Danger Zone */}
                <div className="mt-10 border-t pt-6 border-red-400">
                    <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Danger Zone</h3>

                    {/* Regenerate API Key */}
                    <div className="mt-4 bg-red-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                        <p className="text-red-800 dark:text-red-300 font-medium">Regenerate API Key</p>
                        <p className="text-sm text-red-600 dark:text-red-400">
                            This action cannot be undone. Your current key will no longer be valid.
                        </p>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-150">
                            Regenerate Key
                        </button>
                    </div>

                    {/* Delete Project */}
                    <div className="mt-6 bg-red-50 dark:bg-gray-700 p-4 rounded-lg space-y-4">
                        <p className="text-red-800 dark:text-red-300 font-medium">Delete Project</p>

                        {!showDeleteConfirm ? (
                            <>
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    This action is irreversible.
                                </p>
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-150"
                                >
                                    Delete Project
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    Type "<span className="font-semibold">{project.project_name}</span>" to confirm deletion.
                                </p>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white"
                                    placeholder={`Type "${project.project_name}" to confirm`}
                                    value={deleteInput}
                                    onChange={(e) => setDeleteInput(e.target.value)}
                                />
                                <div className="flex space-x-2">
                                    <button
                                        onClick={deleteProject}
                                        disabled={deleteInput !== project.project_name || isDeleting}
                                        className={`px-4 py-2 rounded-md text-white ${deleteInput === project.project_name && !isDeleting
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowDeleteConfirm(false);
                                            setDeleteInput('');
                                        }}
                                        className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProjectDetails;
