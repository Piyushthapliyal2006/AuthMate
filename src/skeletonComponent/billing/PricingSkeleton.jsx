import React from "react";

export default function PricingSkeleton() {
  return (
    <div className="animate-pulse flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
      <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-6" />
      <div className="space-y-2 mb-6">
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
      <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded mt-auto" />
    </div>
  );
}
