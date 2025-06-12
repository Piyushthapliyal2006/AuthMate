// components/SubscriptionList.jsx
import React, { useEffect, useState } from 'react';
import { getSubscriptions } from '@/api';
import { motion } from 'framer-motion';
import SkeletonSubscriptionList from "@/skeletonComponent/billing/SkeletonSubscriptionList";

export default function SubscriptionList() {
  const [subs, setSubs] = useState(null); // null means loading

  useEffect(() => {
    getSubscriptions().then(setSubs);
  }, []);

  if (subs === null) return <SkeletonSubscriptionList />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Your Subscriptions</h2>

      {subs.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No active subscriptions.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Plan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Ends On</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
              {subs.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100">{s.plan.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`capitalize inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      s.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {new Date(s.current_period_end).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
