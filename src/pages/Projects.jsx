import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [sortOrder, setSortOrder] = useState('latest'); // 'latest' or 'oldest'
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Function to fetch projects from the API
    const fetchProjects = useCallback(async () => {
        const token = localStorage.getItem('accessToken'); // Replace 'yourTokenKey' with your actual key
        const config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/projects/',
            headers: {
                'Authorization': `Bearer ${token}` // Use the token from local storage
            }
        };

        try {
            const response = await axios.request(config);
            setProjects(response.data); // Store the projects in state
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // Memoized filtering and sorting logic
    const filteredProjects = useMemo(() => {
        return projects
            .filter(project => project.project_name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
            });
    }, [projects, searchTerm, sortOrder]);

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

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Search Bar */}
            <div className="mb-6 flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* Sorting Dropdown */}
            <div className="mb-6 flex items-center space-x-4">
                <label htmlFor="sortOrder" className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={handleSortOrderChange}
                    className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="latest">Latest to Oldest</option>
                    <option value="oldest">Oldest to Latest</option>
                </select>
            </div>

            {/* Toggle Switch for View Mode */}
            <div className="mb-6 flex items-center space-x-4">
                <label htmlFor="viewMode" className="text-sm font-medium text-gray-700">View Mode:</label>
                <button
                    onClick={handleViewModeToggle}
                    className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    {viewMode === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}
                </button>
            </div>

            {/* Project List/Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <div key={project.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900">{project.project_name}</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Created at: {new Date(project.created_at).toLocaleString()}
                                </p>
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
    );
}
