import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams from react-router-dom
import axios from 'axios';
import PasswordInputField from '../components/PasswordInputField';  // Import the PasswordInputField component
import CopyContent from '../components/CopyContent';  // Import the CopyContent component
import { conf } from "@/conf/conf.js";

function ProjectDetails() {
    const { id } = useParams();  // Get the project ID from the URL
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            const token = localStorage.getItem('accessToken');
            // const url = `${conf.prodBaseUrl}/projects/${id}`;
            const url = `${conf.devBaseUrl}/projects/${id}`;      // Use the local URL for development 
            const config = {
                method: 'get',
                url: url,
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

    if (!project) return <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 w-60">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <h1 className="text-3xl font-semibold text-gray-900">{project.project_name}</h1>
            <p className="mt-4 text-lg text-gray-600">
                <strong>Description:</strong> {project.description || 'No description available.'}
            </p>
            <p className="mt-4 text-lg text-gray-600">
                <strong>Project type:</strong> {project.project_type || 'Project type not set.'}
            </p>
            {project.is_active || project.is_archived ? (
                <p className="mt-4 text-lg text-gray-600">
                    <strong>Project status:</strong> {project.is_active ? 'Active' : 'Archived'}
                </p>
            ) : null}
            <p className="mt-4 text-sm text-gray-500">
                Created at: {new Date(project.created_at).toLocaleString()}
            </p>

            {/* Add the CopyContent for API Key */}
            <div className="mt-4">
                <PasswordInputField
                    label="API Key"
                    name="api_key"
                    value={project.api_key_value}
                    onChange={() => { }}
                    required={false}
                    autoComplete="off"
                    readOnly={true}  // Make it read-only for the project details page
                />

                {/* Use the CopyContent component */}
                <CopyContent
                    content={project.api_key_value}
                    buttonText="Copy API Key"
                    successText="API Key Copied!"
                    className="mt-2"  // Optional: Add margin for better spacing
                />
            </div>

            {/* Add more project details as needed */}
        </div>
    );
}

export default ProjectDetails;
