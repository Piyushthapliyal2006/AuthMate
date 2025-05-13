import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FiCalendar, FiGrid, FiList } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [sortOrder, setSortOrder] = useState('latest'); // 'latest' or 'oldest'
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [loading, setLoading] = useState(true); // Manage loading state

    // Fetch the projects from the API
    const fetchProjects = async () => {
        const token = localStorage.getItem('accessToken');
        const url = `/api/projects/`;
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

    // Sorting the projects based on the selected sort order
    const sortedProjects = useMemo(() => {
        return [...projects].sort((a, b) => {
            const dateA = new Date(a.created_at); // Use created_at instead of createdAt
            const dateB = new Date(b.created_at); // Use created_at instead of createdAt

            // Ensure we compare dates correctly based on the sort order
            return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
        });
    }, [projects, sortOrder]);

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

    // Skeleton Loader
    const Skeleton = () => (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="space-y-1 mb-4 sm:mb-0">
                    <div className="bg-gray-300 dark:bg-gray-700 h-8 w-2/3 rounded"></div>
                    <div className="bg-gray-300 dark:bg-gray-700 h-4 w-1/3 rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-gray-300 dark:bg-gray-700 h-8 w-16 rounded"></div>
                    <div className="bg-gray-300 dark:bg-gray-700 h-8 w-16 rounded"></div>
                    <div className="bg-gray-300 dark:bg-gray-700 h-8 w-16 rounded"></div>
                </div>
            </div>
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
                        <div className="p-6">
                            <div className="bg-gray-300 dark:bg-gray-700 h-6 w-3/4 rounded mb-2"></div>
                            <div className="bg-gray-300 dark:bg-gray-700 h-4 w-2/3 rounded mb-4"></div>
                            <div className="bg-gray-300 dark:bg-gray-700 h-4 w-1/2 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {loading ? (
                <Skeleton />
            ) : (
                <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Projects</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage and organize your projects</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <select
                                value={sortOrder}
                                onChange={handleSortOrderChange}
                                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 ease-in-out"
                            >
                                <option value="latest">Latest to Oldest</option>
                                <option value="oldest">Oldest to Latest</option>
                            </select>
                            <button
                                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out dark:text-white"
                                onClick={handleViewModeToggle}
                            >
                                {viewMode === 'grid' ? <FiList className="w-5 h-5" /> : <FiGrid className="w-5 h-5" />}
                            </button>
                            <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out dark:text-white">
                                <FiCalendar className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {sortedProjects.length > 0 ? (
                            sortedProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102 ${viewMode === 'list' ? 'flex items-center' : ''
                                        }`}
                                >
                                    <div className={`p-6 ${viewMode === 'list' ? 'flex-grow' : ''}`}>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            <Link to={`/project/${project.id}`} className="hover:text-indigo-600">
                                                {project.project_name}
                                            </Link>
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Owned by : {project.owner_email}</p>
                                        <div className={`mt-4 flex items-center ${viewMode === 'list' ? 'justify-between' : ''}`}>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(project.created_at).toLocaleString()}</span>
                                            <span
                                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium transition-all duration-200 ease-in-out ${project.is_active
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100'
                                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100'
                                                    }`}
                                            >
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 p-6">
                                <p>No projects found. Try adjusting your search or sorting criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
