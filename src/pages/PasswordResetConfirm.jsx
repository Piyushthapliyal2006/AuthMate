import React, { useState } from 'react';
import axios from 'axios';
import PasswordInputField from '../components/PasswordInputField';
import { conf } from "@/conf/conf.js";

function PasswordResetConfirm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Extract uid and token from the URL path
  const pathParts = window.location.pathname.split('/');
  const uid = pathParts[4];
  const token = pathParts[5];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);

    const data = {
      uid: uid,
      token: token,
      new_password: newPassword,
      re_new_password: confirmPassword,
    };

    try {
      const url = `${conf.prodBaseUrl}/api/auth/users/reset_password_confirm/`;
      await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage('Password reset successfully! You can now log in with your new password.');
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        'Failed to reset password. Please try again.';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Set New Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <PasswordInputField
            label="New Password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <PasswordInputField
            label="Confirm New Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white rounded-lg focus:outline-none 
              ${loading
                ? 'bg-indigo-400 dark:bg-indigo-500'
                : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500'
              }`}
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.toLowerCase().includes('fail') || message.toLowerCase().includes('match')
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-600 dark:text-green-400'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default PasswordResetConfirm;
