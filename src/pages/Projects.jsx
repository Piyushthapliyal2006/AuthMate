import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [sortOrder, setSortOrder] = useState('latest'); // 'latest' or 'oldest'
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <div>
            {/* Search Bar */}
            <div className="mb-4 p-8">
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>

            {/* Sorting Dropdown */}
            <div className="mb-4 p-8">
                <label htmlFor="sortOrder" className="mr-2">Sort by:</label>
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="latest">Latest to Oldest</option>
                    <option value="oldest">Oldest to Latest</option>
                </select>
            </div>

            {/* Project List */}
            <ul role="list" className="divide-y divide-gray-100 p-8">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <li key={project.id} className="flex justify-between gap-x-6 py-5">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold text-gray-900">{project.project_name}</p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Created at: {new Date(project.created_at).toLocaleString()}
                                </p>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="py-5 text-gray-500">No projects found.</li>
                )}
            </ul>
        </div>
    );
}
