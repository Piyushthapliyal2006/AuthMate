import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { conf } from "@/conf/conf.js";
import SkeletonProfile from '@/skeletonComponent/profile/SkeletonProfile';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        window.location.href = '/auth/login';
        return;
      }

      try {
        const url = `${conf.prodBaseUrl}/api/profiles/`;
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Handle array or single object response
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        setProfile(data);
      } catch (error) {
        if (error.response?.status === 401) {
          window.location.href = '/auth/login';
        } else {
          console.error('Error fetching profile data:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="min-h-screen">
      <main>
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          {loading ? (
            <SkeletonProfile />
          ) : profile ? (
            <div className="
              bg-white/70 dark:bg-gray-800/30
              backdrop-blur-md
              border border-gray-200 dark:border-white/20
              shadow-lg dark:shadow-black/30
              rounded-xl p-6
              transition-all
            ">
              <div className="flex items-center space-x-4">
                {profile.profile_picture ? (
                  <img
                    src={profile.profile_picture}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border border-white shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {profile.email?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{profile.email}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">User ID: {profile.id}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Personal Information</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Phone:</strong> {profile.phone || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Address:</strong> {profile.address || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Date of Birth:</strong> {profile.date_of_birth || 'N/A'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Bio</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{profile.bio || 'No bio available.'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-red-500">Failed to load profile.</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;
