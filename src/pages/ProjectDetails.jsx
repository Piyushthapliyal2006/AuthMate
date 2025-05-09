import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordInputField from '../components/PasswordInputField';
import CopyContent from '../components/CopyContent';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';

function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteInput, setDeleteInput] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
    const [regenerateInput, setRegenerateInput] = useState('');
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [apiKey, setApiKey] = useState(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({ project_name: '', description: '', project_type: '' });
    const [isSavingEdit, setIsSavingEdit] = useState(false);
    const [editError, setEditError] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await axios.get(`/api/projects/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProject(response.data);
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        fetchProjectDetails();
    }, [id]);

    const openEditModal = () => {
        setEditData({
            project_name: project.project_name || '',
            description: project.description || '',
            project_type: project.project_type || '',
        });
        setEditError(null);
        setIsEditModalOpen(true);
    };

    const saveProjectChanges = async () => {
        const token = localStorage.getItem('accessToken');
        setIsSavingEdit(true);
        setEditError(null);
        try {
            const response = await axios.put(`/api/projects/${id}/`, editData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProject(response.data);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error updating project:', error);
            if (error.response && error.response.data) {
                const messages = Object.values(error.response.data).flat().join(' ');
                setEditError(messages || 'Failed to update project.');
            } else {
                setEditError('An unexpected error occurred.');
            }
        } finally {
            setIsSavingEdit(false);
        }
    };

    const deleteProject = async () => {
        if (!project || deleteInput !== project.project_name) return;
        const token = localStorage.getItem('accessToken');
        setIsDeleting(true);
        try {
            await axios.delete(`/api/projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/projects');
        } catch (error) {
            console.error('Error deleting project:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const regenerateApiKey = async () => {
        if (regenerateInput !== project.project_name) return;
        const token = localStorage.getItem('accessToken');
        setIsRegenerating(true);
        try {
            const response = await axios.post(`/api/projects/${id}/regenerate-api-key/`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setApiKey(response.data.api_key_value);
        } catch (error) {
            console.error('Error regenerating API key:', error);
        } finally {
            setIsRegenerating(false);
        }
    };

    if (!project) {
        return (
            <div className="dark:bg-gray-900 px-6 sm:px-10 lg:px-12">
                <div className="animate-pulse space-y-6">Loading...</div>
            </div>
        );
    }

    return (
        <div className="dark:bg-gray-900 px-6 sm:px-10 lg:px-12">
            {/* === Edit Modal === */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Edit Project</h2>
                        {editError && (
                            <p className="text-sm text-red-600 dark:text-red-400 mb-2">{editError}</p>
                        )}
                        <input
                            type="text"
                            placeholder="Project Name"
                            value={editData.project_name}
                            onChange={(e) => setEditData({ ...editData, project_name: e.target.value })}
                            className="w-full mb-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                        />
                        <textarea
                            placeholder="Description"
                            value={editData.description}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                            className="w-full mb-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                        />
                        <select
                            value={editData.project_type}
                            onChange={(e) => setEditData({ ...editData, project_type: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">Select Project Type</option>
                            <option value="web">Web</option>
                            <option value="mobile">Mobile</option>
                            <option value="desktop">Desktop</option>
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={saveProjectChanges}
                                disabled={isSavingEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                {isSavingEdit ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* === Regenerate API Key Modal === */}
            {isRegenerateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Regenerate API Key</h2>
                            <button onClick={() => {
                                setIsRegenerateModalOpen(false);
                                setRegenerateInput('');
                                setApiKey(null);
                            }}>
                                <span className="text-gray-600 dark:text-gray-300">✕</span>
                            </button>
                        </div>

                        {!apiKey ? (
                            <>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    Please type <strong>{project.project_name}</strong> to confirm regeneration.
                                </p>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                                    placeholder={`Type "${project.project_name}" to confirm`}
                                    value={regenerateInput}
                                    onChange={(e) => setRegenerateInput(e.target.value)}
                                />
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        disabled={regenerateInput !== project.project_name || isRegenerating}
                                        onClick={regenerateApiKey}
                                        className={`px-4 py-2 text-white rounded-md transition-all ${regenerateInput === project.project_name && !isRegenerating
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {isRegenerating ? 'Regenerating...' : 'Confirm'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsRegenerateModalOpen(false);
                                            setRegenerateInput('');
                                        }}
                                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <PasswordInputField
                                    label="New API Key"
                                    name="new_api_key"
                                    value={apiKey}
                                    onChange={() => { }}
                                    required={false}
                                    autoComplete="off"
                                    readOnly={true}
                                />
                                <CopyContent
                                    content={apiKey}
                                    buttonText="Copy API Key"
                                    successText="Copied!"
                                    className="mt-2"
                                />
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => {
                                            setIsRegenerateModalOpen(false);
                                            setApiKey(null);
                                            setRegenerateInput('');
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Done
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <Link to="/projects" className="flex items-center text-blue-600 dark:text-blue-400">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Projects
                </Link>
                <button
                    onClick={openEditModal}
                    className="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    Edit Project
                </button>
            </div>

            {/* Project Info */}
            <div className="space-y-6">
                <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">{project.project_name}</h1>

                <div className="space-y-4">
                    <div className="text-lg text-gray-700 dark:text-gray-300">
                        <p><strong className="text-gray-900 dark:text-gray-100">Description:</strong> {project.description || 'No description available.'}</p>
                    </div>

                    <div className="text-lg text-gray-700 dark:text-gray-300">
                        <p><strong className="text-gray-900 dark:text-gray-100">Project Type:</strong> {project.project_type || 'Not specified'}</p>
                    </div>

                    <div className="text-lg text-gray-700 dark:text-gray-300">
                        <p>
                            <span
                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium transition-all duration-200 ease-in-out ${project.is_active
                                    ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100'
                                    : project.is_archived
                                        ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100'
                                    }`}>
                                {project.is_active ? 'Active' : project.is_archived ? 'Archived' : 'Unknown'}
                            </span>
                        </p>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        <strong className="text-gray-900 dark:text-gray-100">Created at:</strong> {new Date(project.created_at).toLocaleString()}
                    </p>
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
                        <button
                            onClick={() => setIsRegenerateModalOpen(true)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-150"
                        >
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
