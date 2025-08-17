import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordInputField from '../components/PasswordInputField';
import CopyContent from '../components/CopyContent';
import Button from '../components/ui/Button';
import SecondaryButton from '../components/ui/secondary-button';
import { ArrowLeftIcon, PencilIcon, GlobeAltIcon, CalendarIcon, UserIcon, ShieldCheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { conf } from "@/conf/conf.js";

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
                const response = await axios.get(`${conf.prodBaseUrl}/api/projects/${id}`, {
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
            project_url: project.project_url || '',
            project_type: project.project_type || '',
            description: project.description || '',
        });
        setEditError(null);
        setIsEditModalOpen(true);
    };

    const saveProjectChanges = async () => {
        const token = localStorage.getItem('accessToken');
        setIsSavingEdit(true);
        setEditError(null);
        try {
            const response = await axios.put(`${conf.prodBaseUrl}/api/projects/${id}/`, editData, {
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
            await axios.delete(`${conf.prodBaseUrl}/api/projects/${id}`, {
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
            const response = await axios.post(`${conf.prodBaseUrl}/api/projects/${id}/regenerate-api-key/`, {}, {
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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 sm:px-10 lg:px-12 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="animate-pulse space-y-8">
                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/3"></div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
                            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-2/3"></div>
                            <div className="space-y-4">
                                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 sm:px-10 lg:px-12 py-8">
            <div className="max-w-6xl mx-auto">
                {/* === Edit Modal === */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Project</h2>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {editError && (
                                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <p className="text-sm text-red-600 dark:text-red-400">{editError}</p>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="projectName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Project Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter project name"
                                        id='projectName'
                                        value={editData.project_name}
                                        onChange={(e) => setEditData({ ...editData, project_name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="projectUrl" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Project URL</label>
                                    <input
                                        type="url"
                                        placeholder="https://example.com"
                                        id='projectUrl'
                                        value={editData.project_url}
                                        onChange={(e) => setEditData({ ...editData, project_url: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Project Type</label>
                                    <select
                                        value={editData.project_type}
                                        id='projectType'
                                        onChange={(e) => setEditData({ ...editData, project_type: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                    >
                                        <option value="">Select Project Type</option>
                                        <option value="web">Web Application</option>
                                        <option value="mobile">Mobile App</option>
                                        <option value="desktop">Desktop Application</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="projectDescription" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                    <textarea
                                        placeholder="Describe your project..."
                                        id='projectDescription'
                                        rows={4}
                                        value={editData.description}
                                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-8">
                                <SecondaryButton
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-2"
                                >
                                    Cancel
                                </SecondaryButton>
                                <Button
                                    onClick={saveProjectChanges}
                                    disabled={isSavingEdit}
                                    className="px-6 py-2"
                                >
                                    {isSavingEdit ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* === Regenerate API Key Modal === */}
                {isRegenerateModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Regenerate API Key</h2>
                                <button
                                    onClick={() => {
                                        setIsRegenerateModalOpen(false);
                                        setRegenerateInput('');
                                        setApiKey(null);
                                    }}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {!apiKey ? (
                                <>
                                    <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                            <p className="font-semibold text-yellow-800 dark:text-yellow-200">Warning</p>
                                        </div>
                                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                            This action cannot be undone. Your current API key will no longer be valid.
                                        </p>
                                    </div>

                                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                        Please type <span className="font-bold text-gray-900 dark:text-white">{project.project_name}</span> to confirm regeneration.
                                    </p>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                        placeholder={`Type "${project.project_name}" to confirm`}
                                        value={regenerateInput}
                                        onChange={(e) => setRegenerateInput(e.target.value)}
                                    />
                                    <div className="mt-6 flex justify-end space-x-3">
                                        <SecondaryButton
                                            onClick={() => {
                                                setIsRegenerateModalOpen(false);
                                                setRegenerateInput('');
                                            }}
                                        >
                                            Cancel
                                        </SecondaryButton>
                                        <button
                                            disabled={regenerateInput !== project.project_name || isRegenerating}
                                            onClick={regenerateApiKey}
                                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${regenerateInput === project.project_name && !isRegenerating
                                                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                                                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {isRegenerating ? 'Regenerating...' : 'Confirm Regeneration'}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                        <p className="text-green-800 dark:text-green-200 font-semibold">New API Key Generated!</p>
                                        <p className="text-sm text-green-600 dark:text-green-400">Make sure to copy and store it securely.</p>
                                    </div>

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
                                        className="mt-4"
                                    />
                                    <div className="flex justify-end mt-6">
                                        <Button
                                            onClick={() => {
                                                setIsRegenerateModalOpen(false);
                                                setApiKey(null);
                                                setRegenerateInput('');
                                            }}
                                        >
                                            Done
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Header with breadcrumb and action */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/dashboard"
                            className="group flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                            <ArrowLeftIcon className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Back to Projects</span>
                        </Link>
                    </div>
                    <Button
                        onClick={openEditModal}
                        className="self-start sm:self-auto"
                    >
                        <PencilIcon className="w-4 h-4 mr-2" />
                        Edit Project
                    </Button>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Project Information Card */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Hero Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="relative z-10">
                                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">{project.project_name}</h1>
                                    <div className="flex items-center space-x-4">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${project.is_active
                                                    ? 'bg-green-500/20 text-green-100 border border-green-400/30'
                                                    : project.is_archived
                                                        ? 'bg-gray-500/20 text-gray-100 border border-gray-400/30'
                                                        : 'bg-yellow-500/20 text-yellow-100 border border-yellow-400/30'
                                                }`}
                                        >
                                            <div className={`w-2 h-2 rounded-full mr-2 ${project.is_active ? 'bg-green-400' : project.is_archived ? 'bg-gray-400' : 'bg-yellow-400'
                                                }`}></div>
                                            {project.is_active ? 'Active' : project.is_archived ? 'Archived' : 'Unknown'}
                                        </span>

                                        {project.project_type && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30">
                                                {project.project_type.charAt(0).toUpperCase() + project.project_type.slice(1)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                {project.description && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {project.project_url && (
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                                <GlobeAltIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Project URL</p>
                                                <a
                                                    href={project.project_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors break-all"
                                                >
                                                    {project.project_url}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                            <UserIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Owner</p>
                                            <p className="text-gray-900 dark:text-white font-medium">{project.owner_email || 'Not specified'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                            <CalendarIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</p>
                                            <p className="text-gray-900 dark:text-white font-medium">{new Date(project.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* API Key Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                                    <ShieldCheckIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Access</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Manage your project's API key for authentication.
                            </p>
                            <Button
                                onClick={() => setIsRegenerateModalOpen(true)}
                                className="w-full"
                            >
                                Regenerate API Key
                            </Button>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-red-200 dark:border-red-800 overflow-hidden">
                            <div className="bg-red-50 dark:bg-red-900/20 px-6 py-4 border-b border-red-200 dark:border-red-800">
                                <div className="flex items-center space-x-2">
                                    <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    <h3 className="text-lg font-bold text-red-700 dark:text-red-400">Danger Zone</h3>
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Delete Project */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Delete Project</h4>
                                    {!showDeleteConfirm ? (
                                        <>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                This action is irreversible and will permanently delete your project.
                                            </p>
                                            <button
                                                onClick={() => setShowDeleteConfirm(true)}
                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                                            >
                                                Delete Project
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                                <p className="text-sm text-red-700 dark:text-red-300">
                                                    Type <span className="font-bold">{project.project_name}</span> to confirm deletion.
                                                </p>
                                            </div>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 border border-red-300 dark:border-red-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white mb-4 transition-all duration-200"
                                                placeholder={`Type "${project.project_name}" to confirm`}
                                                value={deleteInput}
                                                onChange={(e) => setDeleteInput(e.target.value)}
                                            />
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={deleteProject}
                                                    disabled={deleteInput !== project.project_name || isDeleting}
                                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${deleteInput === project.project_name && !isDeleting
                                                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                                                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                                        }`}
                                                >
                                                    {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                                                </button>
                                                <SecondaryButton
                                                    onClick={() => {
                                                        setShowDeleteConfirm(false);
                                                        setDeleteInput('');
                                                    }}
                                                >
                                                    Cancel
                                                </SecondaryButton>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProjectDetails;
