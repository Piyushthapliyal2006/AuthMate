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
        const token = localStorage.getItem('accessToken');  // Assuming the token is stored with the key 'token'

        if (!token) {
          console.error('No token found in localStorage');
          return;
        }
        const url = `${conf.prodBaseUrl}/profiles/`;
        // Make the API request with the token from localStorage
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`  // Include the token dynamically
          }
        });

        // Assuming the response data is in the form of an array
        setProfile(response.data[0]);  // Set the first profile if it's an array
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <div className="bg-black shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white-900">Profile</h1>
        </div>
      </div>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {profile ? (
            <div>
              <p className="text-lg font-medium text-white-900">User Email: {profile.user_email}</p>
              <p className="text-lg font-medium text-white-900">Name: {profile.user_full_name}</p>
              <p className="text-lg font-medium text-white-900">Phone: {profile.phone}</p>
              <p className="text-lg font-medium text-white-900">Address: {profile.address}</p>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;
