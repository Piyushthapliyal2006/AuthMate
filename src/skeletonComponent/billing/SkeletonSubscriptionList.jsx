// components/SkeletonSubscriptionList.jsx
import React from 'react';

export default function SkeletonSubscriptionList() {
  return (
    <div className="animate-pulse p-6">
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-56 mb-6"></div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(4)].map((_, i) => (
              <tr key={i} className="border-b dark:border-gray-700">
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-40"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
