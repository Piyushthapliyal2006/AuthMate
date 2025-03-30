import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { conf } from "@/conf/conf.js";

function Profile() {
  const [profile, setProfile] = useState(null);

  // Fetch profile data from the API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('accessToken');

        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        const url = `${conf.prodBaseUrl}/profiles/`;
        // const url = `${conf.devBaseUrl}/profiles/`;
        // Make the API request with the token from localStorage
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Assuming the response data is a single object
        setProfile(response.data); // Set the profile data
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
     
      {/* Main Content */}
      <main>
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          {profile ? (
            <div className="bg-gray-800 shadow rounded-lg p-6">
              {/* Profile Header */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {profile.email}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{profile.email}</h2>
                  <p className="text-sm text-gray-400">User ID: {profile.id}</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-300">Personal Information</h3>
                  <p className="text-sm text-gray-400">
                    <strong className="text-white">Phone:</strong> {profile.phone || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong className="text-white">Address:</strong> {profile.address || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong className="text-white">Date of Birth:</strong> {profile.date_of_birth || 'N/A'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-300">Bio</h3>
                  <p className="text-sm text-gray-400">{profile.bio || 'No bio available.'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-400">Loading profile...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;
