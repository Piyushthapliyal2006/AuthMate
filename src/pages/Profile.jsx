import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { conf } from "@/conf/conf.js";
import Button from '../components/ui/Button';
import { 
  PencilIcon, 
  UserIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  CalendarIcon, 
  CameraIcon, 
  ShieldCheckIcon,
  CheckIcon,
  XMarkIcon,
  KeyIcon,
  ArrowDownTrayIcon,
  Cog6ToothIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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
        setEditData(data);
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

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profile });
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profile });
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert(`File size must be less than 5MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.onerror = (e) => {
        console.error('Error reading file:', e);
        alert('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('profile-picture-input').click();
  };

  const removeProfilePicture = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    // Set profile_picture to empty string or null to indicate removal
    setEditData({ ...editData, profile_picture: '' });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('accessToken');



      // If there's a file to upload, use FormData
      if (selectedFile) {
        const formData = new FormData();

        // Append all the form fields (exclude profile_picture if it's a URL string)
        Object.keys(editData).forEach(key => {
          if (key !== 'profile_picture' && editData[key] !== null && editData[key] !== undefined && editData[key] !== '') {
            formData.append(key, editData[key]);
          }
        });

        // Append the file
        formData.append('profile_picture', selectedFile);

        // Try different endpoints and approaches
        let response;
        try {
          // Try 1: PATCH with current user endpoint
          const url = `${conf.prodBaseUrl}/api/profiles/${profile.id}/`;
          response = await axios.patch(url, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
        } catch (patchError) {
          try {
            // Try 2: PUT method
            const url = `${conf.prodBaseUrl}/api/profiles/${profile.id}/`;
            response = await axios.put(url, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
          } catch (putError) {
            try {
              // Try 3: POST to upload endpoint (if it exists)
              const uploadUrl = `${conf.prodBaseUrl}/api/profiles/${profile.id}/upload/`;
              response = await axios.post(uploadUrl, formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              });
            } catch (postError) {
              // Try 4: Different field name
              const altFormData = new FormData();
              Object.keys(editData).forEach(key => {
                if (key !== 'profile_picture' && editData[key] !== null && editData[key] !== undefined && editData[key] !== '') {
                  altFormData.append(key, editData[key]);
                }
              });
              altFormData.append('image', selectedFile); // Try 'image' instead of 'profile_picture'

              const url = `${conf.prodBaseUrl}/api/profiles/${profile.id}/`;
              response = await axios.patch(url, altFormData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              });
            }
          }
        }
        setProfile(response.data);
      } else if (editData.profile_picture === '') {
        // Handle profile picture removal
        const url = `${conf.prodBaseUrl}/api/profiles/${profile.id}/`;
        const response = await axios.patch(url, { profile_picture: null }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setProfile(response.data);
      } else {
        // Regular JSON update without file
        const url = `${conf.prodBaseUrl}/api/profiles/${profile.id}/`;
        const response = await axios.patch(url, editData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setProfile(response.data);
      }

      setIsEditing(false);
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error updating profile:', error);

      if (error.response?.status === 413) {
        alert('File is too large. Please choose a smaller image (max 5MB).');
      } else if (error.response?.status === 400) {
        alert('Invalid file format. Please choose a valid image file.');
      } else {
        alert(`Failed to update profile: ${error.response?.data?.detail || error.message}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Beautiful Skeleton Loader
  const ProfileSkeleton = () => (
    <div className="min-h-screen p-6 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16">
              <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-white animate-pulse"></div>
              <div className="mt-4 sm:mt-0 flex-1 space-y-3">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="h-12 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {loading ? (
        <ProfileSkeleton />
      ) : profile ? (
        <div className="p-6 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Profile Header Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Cover Image */}
              <div className="relative h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 right-4 z-[5]">
                  {!isEditing ? (
                    <Button 
                      onClick={handleEdit} 
                      icon={<PencilIcon className="w-4 h-4" />}
                      className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        loading={isSaving}
                        icon={<CheckIcon className="w-4 h-4" />}
                        size="sm"
                      >
                        {!isSaving && 'Save'}
                      </Button>
                      <Button 
                        onClick={handleCancel}
                        variant="outline"
                        icon={<XMarkIcon className="w-4 h-4" />}
                        size="sm"
                        className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="px-8 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-20">
                  {/* Profile Picture */}
                  <div className="relative">
                    {/* Hidden file input */}
                    <input
                      type="file"
                      id="profile-picture-input"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    {/* Profile Picture Display */}
                    {isEditing && previewUrl ? (
                      // Show preview of newly selected image
                      <img
                        src={previewUrl}
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                      />
                    ) : isEditing && editData.profile_picture === '' ? (
                      // Show placeholder when profile picture is removed
                      <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 text-white rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white shadow-xl">
                        {profile.email?.charAt(0).toUpperCase()}
                      </div>
                    ) : profile.profile_picture ? (
                      // Show existing profile picture
                      <img
                        src={profile.profile_picture}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                      />
                    ) : (
                      // Show default avatar
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white shadow-xl">
                        {profile.email?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* Camera Button */}
                    {isEditing && (
                      <>
                        <div className="absolute bottom-2 right-2">
                          <Button
                            onClick={triggerFileInput}
                            icon={<CameraIcon className="w-4 h-4" />}
                            size="sm"
                            className="w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg"
                            title="Change profile picture"
                          />
                        </div>

                        {/* Remove Picture Button */}
                        {(profile.profile_picture || previewUrl) && editData.profile_picture !== '' && (
                          <div className="absolute bottom-2 left-2">
                            <Button
                              onClick={removeProfilePicture}
                              icon={<TrashIcon className="w-4 h-4" />}
                              size="sm"
                              className="w-8 h-8 p-0 bg-red-600 hover:bg-red-700 rounded-full shadow-lg"
                              title="Remove profile picture"
                            />
                          </div>
                        )}
                      </>
                    )}

                    {/* File selected indicator */}
                    {selectedFile && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                        ✓
                      </div>
                    )}
                  </div>

                  {/* Profile Header Info */}
                  <div className="mt-4 sm:mt-0 flex-1">
                    {/* File upload guidance when editing */}
                    {isEditing && (
                      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {selectedFile ? (
                            <span className="flex items-center space-x-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span>New profile picture selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)</span>
                            </span>
                          ) : (
                            <span>Click the camera icon to upload a new profile picture (max 5MB, JPEG/PNG/GIF/WebP)</span>
                          )}
                        </p>
                        {/* Debug info in development */}
                        {process.env.NODE_ENV === 'development' && selectedFile && (
                          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                            <p>File type: {selectedFile.type}</p>
                            <p>File size: {selectedFile.size} bytes</p>
                            <p>API URL: {`${conf.prodBaseUrl}/api/profiles/${profile.id}/`}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {profile.first_name && profile.last_name
                        ? `${profile.first_name} ${profile.last_name}`
                        : profile.email}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                      <EnvelopeIcon className="w-5 h-5" />
                      <span>{profile.email}</span>
                    </p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <UserIcon className="w-4 h-4" />
                        <span>ID: {profile.id}</span>
                      </span>
                      {profile.date_joined && (
                        <span className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>Joined {new Date(profile.date_joined).toLocaleDateString()}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                    <UserIcon className="w-6 h-6 text-blue-600" />
                    <span>Personal Information</span>
                  </h2>

                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={editData.first_name || ''}
                            onChange={(e) => setEditData({ ...editData, first_name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={editData.last_name || ''}
                            onChange={(e) => setEditData({ ...editData, last_name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={editData.phone || ''}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Bio
                        </label>
                        <textarea
                          rows={4}
                          value={editData.bio || ''}
                          onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            First Name
                          </h3>
                          <p className="text-lg text-gray-900 dark:text-white">
                            {profile.first_name || 'Not specified'}
                          </p>
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Last Name
                          </h3>
                          <p className="text-lg text-gray-900 dark:text-white">
                            {profile.last_name || 'Not specified'}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center space-x-2">
                          <PhoneIcon className="w-4 h-4" />
                          <span>Phone Number</span>
                        </h3>
                        <p className="text-lg text-gray-900 dark:text-white">
                          {profile.phone || 'Not specified'}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Bio
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {profile.bio || 'No bio available. Click "Edit Profile" to add your bio.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Quick Actions & Stats */}
              <div className="space-y-6">
                {/* Account Status Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                    <span>Account Status</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Email Verified</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100">
                        Verified
                      </span>
                    </div>
                    {profile.last_login && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Last Login</span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {new Date(profile.last_login).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button 
                      className="w-full"
                      icon={<KeyIcon className="w-4 h-4" />}
                      variant="outline"
                    >
                      Change Password
                    </Button>
                    <Button 
                      className="w-full"
                      icon={<ArrowDownTrayIcon className="w-4 h-4" />}
                      variant="ghost"
                    >
                      Download Data
                    </Button>
                    <Button 
                      className="w-full"
                      icon={<Cog6ToothIcon className="w-4 h-4" />}
                      variant="ghost"
                    >
                      Privacy Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-red-200 dark:border-red-800 p-8 text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Failed to Load Profile</h3>
            <p className="text-gray-600 dark:text-gray-400">We couldn't load your profile information. Please try refreshing the page.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
