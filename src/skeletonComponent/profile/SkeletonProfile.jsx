import React from 'react';

function SkeletonProfile() {
  return (
    <div className="bg-gray-800 shadow rounded-lg p-6 animate-pulse space-y-6">
      {/* Skeleton Header */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full" />
        <div className="space-y-2">
          <div className="w-48 h-4 bg-gray-700 rounded" />
          <div className="w-32 h-3 bg-gray-600 rounded" />
        </div>
      </div>

      {/* Skeleton Personal Info */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="w-40 h-4 bg-gray-700 rounded" />
          <div className="w-full h-3 bg-gray-600 rounded" />
          <div className="w-full h-3 bg-gray-600 rounded" />
          <div className="w-full h-3 bg-gray-600 rounded" />
        </div>

        <div className="space-y-2">
          <div className="w-32 h-4 bg-gray-700 rounded" />
          <div className="w-full h-3 bg-gray-600 rounded" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonProfile;
