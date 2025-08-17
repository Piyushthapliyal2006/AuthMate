import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FiCalendar, FiGrid, FiList, FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { conf } from "@/conf/conf.js";
import Button from '../components/ui/Button';
import SecondaryButton from '../components/ui/secondary-button';
import { MagnifyingGlassIcon, PlusIcon, Squares2X2Icon, ListBulletIcon, CalendarIcon, GlobeAltIcon, UserIcon } from '@heroicons/react/24/outline';
import { ProjectCreate } from "../components/ProjectCreate";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [sortOrder, setSortOrder] = useState('latest'); // 'latest' or 'oldest'
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [loading, setLoading] = useState(true); // Manage loading state
    const [searchTerm, setSearchTerm] = useState(''); // Search functionality
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'archived'

    // Fetch the projects from the API
    const fetchProjects = async () => {
        const token = localStorage.getItem('accessToken');
        const url = `${conf.prodBaseUrl}/api/projects/`;
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProjects(response.data); // Store the fetched projects
            setLoading(false); // Set loading to false after fetching data
        } catch (error) {
            console.error("Error fetching projects:", error);
            setLoading(false); // Set loading to false in case of an error
        }
    };

    // Fetch projects when the component mounts
    useEffect(() => {
        fetchProjects();
    }, []);

    // Sorting and filtering the projects
    const filteredAndSortedProjects = useMemo(() => {
        let filtered = projects;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(project =>
                project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.owner_email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (filterStatus !== 'all') {
            filtered = filtered.filter(project => {
                if (filterStatus === 'active') return project.is_active;
                if (filterStatus === 'archived') return project.is_archived;
                return true;
            });
        }

        // Sort projects
        return [...filtered].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
        });
    }, [projects, sortOrder, searchTerm, filterStatus]);

    // Load saved settings from localStorage
    useEffect(() => {
        const savedSortOrder = localStorage.getItem('sortOrder');
        const savedViewMode = localStorage.getItem('viewMode');

        if (savedSortOrder) {
            setSortOrder(savedSortOrder);
        }
        if (savedViewMode) {
            setViewMode(savedViewMode);
        }
    }, []);

    // Save settings to localStorage when they change
    const handleSortOrderChange = (e) => {
        const newSortOrder = e.target.value;
        setSortOrder(newSortOrder);
        localStorage.setItem('sortOrder', newSortOrder); // Save to localStorage
    };

    const handleViewModeToggle = () => {
        const newViewMode = viewMode === 'grid' ? 'list' : 'grid';
        setViewMode(newViewMode);
        localStorage.setItem('viewMode', newViewMode); // Save to localStorage
    };

    // Beautiful Skeleton Loader
    const Skeleton = () => (
        <div className="min-h-screen p-6 sm:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Skeleton */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="space-y-3">
                        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-64 animate-pulse"></div>
                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-80 animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-32 animate-pulse"></div>
                        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-24 animate-pulse"></div>
                    </div>
                </div>

                {/* Search and Filter Skeleton */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 h-12 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-40 animate-pulse"></div>
                        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-32 animate-pulse"></div>
                    </div>
                </div>

                {/* Project Cards Skeleton */}
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                    {[...Array(6)].map((_, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="h-32 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
                            <div className="p-6 space-y-4">
                                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            {loading ? (
                <Skeleton />
            ) : (
                <div className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Header Section */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div className="space-y-2">
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    Manage and organize your projects with ease
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span>{filteredAndSortedProjects.filter(p => p.is_active).length} Active</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                        <span>{filteredAndSortedProjects.filter(p => p.is_archived).length} Archived</span>
                                    </span>
                                    <span>Total: {filteredAndSortedProjects.length}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <ProjectCreate />
                                <SecondaryButton
                                    onClick={handleViewModeToggle}
                                    className="p-3"
                                >
                                    {viewMode === 'grid' ? <ListBulletIcon className="w-5 h-5" /> : <Squares2X2Icon className="w-5 h-5" />}
                                </SecondaryButton>
                            </div>
                        </div>

                        {/* Search and Filter Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Search Bar */}
                                <div className="flex-1 relative">
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search projects by name, description, or owner..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 placeholder-gray-400"
                                    />
                                </div>

                                {/* Filter Dropdown */}
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                >
                                    <option value="all">All Projects</option>
                                    <option value="active">Active Only</option>
                                    <option value="archived">Archived Only</option>
                                </select>

                                {/* Sort Dropdown */}
                                <select
                                    value={sortOrder}
                                    onChange={handleSortOrderChange}
                                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                >
                                    <option value="latest">Latest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                            </div>
                        </div>

                        {/* Projects Grid */}
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {filteredAndSortedProjects.length > 0 ? (
                                filteredAndSortedProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out ${viewMode === 'list' ? 'md:flex md:items-center' : ''
                                            }`}
                                    >
                                        {/* Project Header with Gradient */}
                                        <div className={`relative ${viewMode === 'list' ? 'md:w-48 md:h-full' : 'h-32'} bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 p-6 flex items-center justify-center`}>
                                            <div className="absolute inset-0 bg-black/20"></div>
                                            <div className="relative z-10 text-center">
                                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                                    <span className="text-2xl font-bold text-white">
                                                        {project.project_name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                {viewMode !== 'list' && (
                                                    <span className="text-white/80 text-xs font-medium">
                                                        {project.project_type || 'Project'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Project Content */}
                                        <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''} space-y-4`}>
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    <Link to={`/project/${project.id}`} className="hover:underline">
                                                        {project.project_name}
                                                    </Link>
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                                    {project.description && project.description.length > 100
                                                        ? `${project.description.substring(0, 100)}...`
                                                        : project.description || 'No description available'}
                                                </p>
                                            </div>

                                            {/* Project Meta Information */}
                                            <div className="space-y-3">
                                                {project.project_url && (
                                                    <div className="flex items-center space-x-2 text-sm">
                                                        <GlobeAltIcon className="w-4 h-4 text-gray-400" />
                                                        <a
                                                            href={project.project_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 dark:text-blue-400 hover:underline truncate"
                                                        >
                                                            {project.project_url}
                                                        </a>
                                                    </div>
                                                )}

                                                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <UserIcon className="w-4 h-4" />
                                                    <span className="truncate">{project.owner_email}</span>
                                                </div>

                                                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <CalendarIcon className="w-4 h-4" />
                                                    <span>{new Date(project.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>

                                            {/* Status and Actions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${project.is_active
                                                            ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100'
                                                            : project.is_archived
                                                                ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                                                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100'
                                                        }`}
                                                >
                                                    <div className={`w-2 h-2 rounded-full mr-2 ${project.is_active ? 'bg-green-500' : project.is_archived ? 'bg-gray-500' : 'bg-yellow-500'
                                                        }`}></div>
                                                    {project.is_active ? 'Active' : project.is_archived ? 'Archived' : 'Unknown'}
                                                </span>

                                                <Link
                                                    to={`/project/${project.id}`}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                                                >
                                                    View Details →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full">
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Squares2X2Icon className="w-12 h-12 text-gray-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            No projects found
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                                            {searchTerm || filterStatus !== 'all'
                                                ? 'Try adjusting your search or filter criteria.'
                                                : 'Get started by creating your first project.'}
                                        </p>
                                        {!searchTerm && filterStatus === 'all' && (
                                            <ProjectCreate />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
