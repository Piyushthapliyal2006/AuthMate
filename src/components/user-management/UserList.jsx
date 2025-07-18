import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';
import axios from 'axios';
import SkeletonUserList from '@/skeletonComponent/user-management/SkeletonUserList';

export default function ExternalUserDashboard() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = localStorage.getItem('accessToken');
    axios.get('http://127.0.0.1:8000/api/dashboard/external-users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => setUsers(res.data));
  };

  const handleToggle = async (userId, field, currentValue) => {
    // Optimistically update UI
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, [field]: !currentValue } : user
      )
    );

    try {
      // Perform API request
      await axios.patch(
        `http://127.0.0.1:8000/api/dashboard/external-users/${userId}/toggle_field/`,
        { field, value: !currentValue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );
    } catch (err) {
      console.error('Toggle failed:', err);
      // Revert optimistic update on failure
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, [field]: currentValue } : user
        )
      );
    }
  };

  if (users === null) return <div className="p-6"><SkeletonUserList /></div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Your Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No users available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Active</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Blocked</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Last Login</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Switch
                      checked={user.is_active}
                      onChange={() => handleToggle(user.id, 'is_active', user.is_active)}
                      className={`${user.is_active ? 'bg-green-600' : 'bg-gray-300'} 
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                    >
                      <span
                        className={`${user.is_active ? 'translate-x-6' : 'translate-x-1'} 
                          inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                      />
                    </Switch>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Switch
                      checked={user.is_blocked}
                      onChange={() => handleToggle(user.id, 'is_blocked', user.is_blocked)}
                      className={`${user.is_blocked ? 'bg-red-600' : 'bg-gray-300'} 
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                    >
                      <span
                        className={`${user.is_blocked ? 'translate-x-6' : 'translate-x-1'} 
                          inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                      />
                    </Switch>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {new Date(user.created_at).toLocaleDateString()}
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
