import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AcceptInvite = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(null); // 'success' | 'error'
  const [accepting, setAccepting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    if (!token) {
      setMessage('No invitation token provided.');
      setMessageType('error');
    }
  }, [token]);

  const acceptInvitation = async () => {
    if (!token) {
      setMessage('Token is missing.');
      setMessageType('error');
      return;
    }

    setAccepting(true);
    try {
      // ✅ Pass token in query string (backend expects it this way)
      const response = await axios.post(`/api/invitations/accept/?token=${token}`);

      if (response.status === 200) {
        setMessage('Invitation accepted successfully!');
        setMessageType('success');
        setTimeout(() => navigate('/dashboard'), 1500); // UX delay before redirect
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Error accepting the invitation.';
      setMessage(errorMsg);
      setMessageType('error');
    } finally {
      setAccepting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Accept Invitation</h2>

      {message && (
        <p className={`mt-4 text-sm ${messageType === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {message}
        </p>
      )}

      <button
        onClick={acceptInvitation}
        disabled={accepting || !token}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {accepting ? 'Accepting...' : 'Accept Invitation'}
      </button>
    </div>
  );
};

export default AcceptInvite;
