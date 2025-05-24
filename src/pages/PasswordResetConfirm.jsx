import React, { useState } from 'react';
import axios from 'axios';
import PasswordInputField from '../components/PasswordInputField';  // Import PasswordInputField
import { conf } from "@/conf/conf.js"; // Import configuration


function PasswordResetConfirm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Extract uid and token from URL path
  const pathParts = window.location.pathname.split('/');
  const uid = pathParts[4]; // Assuming 'MQ' is in this position
  const token = pathParts[5]; // Assuming the token is in this position

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true); // Set loading to true while submitting request

    const data = JSON.stringify({
      uid: uid,
      token: token,
      new_password: newPassword,
      re_new_password: confirmPassword
    });

    const url = `${conf.prodBaseUrl}/api/auth/users/reset_password_confirm/`;
    const config = {
      method: 'post',
      url: url, // Endpoint for password reset
      headers: { 'Content-Type': 'application/json' },
      data: data
    };

    try {
      const response = await axios.request(config);
      setMessage('Password reset successfully! You can now log in with your new password.');
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Failed to reset password. Please try again.';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Set New Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reusing PasswordInputField for New Password */}
          <PasswordInputField
            label="New Password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          {/* Reusing PasswordInputField for Confirm Password */}
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
            ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
      </div>
    </div>
  );
}

export default PasswordResetConfirm;
