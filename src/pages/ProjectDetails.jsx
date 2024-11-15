import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams from react-router-dom
import axios from 'axios';

function ProjectDetails() {
    const { id } = useParams();  // Get the project ID from the URL
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            const token = localStorage.getItem('accessToken');
            const config = {
                method: 'get',
                url: `http://127.0.0.1:8000/projects/${id}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            try {
                const response = await axios.request(config);
                setProject(response.data);  // Set the project details in state
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        fetchProjectDetails();
    }, [id]);  // Refetch the project when the ID changes

    if (!project) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold text-gray-900">{project.project_name}</h1>
            <p className="mt-4 text-lg text-gray-600">
                <strong>Description:</strong> {project.description || 'No description available.'}
            </p>
            <p className="mt-4 text-sm text-gray-500">
                Created at: {new Date(project.created_at).toLocaleString()}
            </p>
            <p className="mt-4 text-sm text-gray-500">
                Last updated: {new Date(project.updated_at).toLocaleString()}
            </p>

            {/* Add more project details as needed */}
        </div>
    );
}

export default ProjectDetails;
