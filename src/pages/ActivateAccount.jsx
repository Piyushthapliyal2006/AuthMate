import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ActivateAccount = () => {
  const { userId, token } = useParams();
  const [status, setStatus] = useState('Activating...');
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const url = `api/auth/activate/${userId}/${token}`;
        const response = await axios.get(url);
        if (response.status === 200) {
          setStatus('Account activated successfully!');
          setTimeout(() => navigate('/auth/login'), 3000);
        } else {
          setStatus('Activation failed. Please try again.');
        }
      } catch (error) {
        setStatus('Error activating account. Link may be invalid or expired.');
        console.error(error);
      }
    };

    activateAccount();
  }, [userId, token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="text-center px-6 py-8 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Account Activation</h2>
        <p className="text-lg">{status}</p>
      </div>
    </div>
  );
};

export default ActivateAccount;
