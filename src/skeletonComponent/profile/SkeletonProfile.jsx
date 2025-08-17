import React from 'react';

function SkeletonProfile() {
  return (
    <div className="min-h-screen p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-20">
              <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-white animate-pulse"></div>
              <div className="mt-4 sm:mt-0 flex-1 space-y-3">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
              <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(2)].map((_, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="space-y-6">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, subIdx) => (
                    <div key={subIdx} className="h-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonProfile;
