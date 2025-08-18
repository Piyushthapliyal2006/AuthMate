import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { conf } from "@/conf/conf.js";

const ActivateAccount = () => {
  const { userId, token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('activating');
  const [message, setMessage] = useState('Activating your account...');

  useEffect(() => {
    const activateAccount = async () => {
      // Extract userId and token from current URL if not available in params
      let currentUserId = userId;
      let currentToken = token;
      
      if (!currentUserId || !currentToken) {
        // Parse from pathname if params are missing
        const pathParts = location.pathname.split('/');
        const activateIndex = pathParts.indexOf('activate');
        if (activateIndex !== -1 && pathParts.length > activateIndex + 2) {
          currentUserId = pathParts[activateIndex + 1];
          currentToken = pathParts[activateIndex + 2];
        }
      }

      if (!currentUserId || !currentToken) {
        setStatus('error');
        setMessage('Invalid activation link. Missing user ID or token.');
        return;
      }

      try {
        setStatus('activating');
        setMessage('Activating your account...');
        
        // Prepare data exactly as in Postman
        const data = JSON.stringify({
          uid: currentUserId,
          token: currentToken
        });

        // Configure request exactly as in Postman
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${conf.prodBaseUrl}/api/auth/users/activation/`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data: data
        };

        const response = await axios.request(config);
        
        if (response.status === 204) {
          setStatus('success');
          setMessage('Account activated successfully! Redirecting to login...');
          setTimeout(() => navigate('/auth/login'), 3000);
        } else {
          setStatus('error');
          setMessage('Activation failed. Please try again or contact support.');
        }
      } catch (error) {
        setStatus('error');
        if (error.response?.status === 400) {
          setMessage('Invalid activation link or token has expired.');
        } else if (error.response?.status === 404) {
          setMessage('User not found or activation link is invalid.');
        } else if (error.response?.status >= 500) {
          setMessage('Server error. Please try again later.');
        } else {
          setMessage('Error activating account. Link may be invalid or expired.');
        }
      }
    };

    activateAccount();
  }, [userId, token, location.pathname, navigate]);

  const getStatusIcon = () => {
    switch (status) {
      case 'activating':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mx-auto"
          >
            <ArrowPathIcon className="h-16 w-16 text-blue-500" />
          </motion.div>
        );
      case 'success':
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mx-auto"
          >
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </motion.div>
        );
      case 'error':
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mx-auto"
          >
            <ExclamationTriangleIcon className="h-16 w-16 text-red-500" />
          </motion.div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'activating': return 'text-blue-600 dark:text-blue-400';
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400/60 to-purple-400/60 dark:from-blue-600/40 dark:to-purple-600/40 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.4, 0.15]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 -right-40 h-96 w-96 rounded-full bg-gradient-to-l from-purple-400/60 to-pink-400/60 dark:from-purple-600/40 dark:to-pink-600/40 blur-3xl"
        />
      </div>

      <div className="relative z-10 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl px-8 py-12 shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-600/50 rounded-3xl border border-white/30 dark:border-gray-600/30">
            
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <img
                alt="AuthMate Logo"
                src="/favicon.svg"
                className="h-16 w-auto drop-shadow-lg"
              />
            </motion.div>

            {/* Status Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center mb-6"
            >
              {getStatusIcon()}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4"
            >
              Account Activation
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className={`text-center text-lg font-medium ${getStatusColor()}`}
            >
              {message}
            </motion.p>

            {/* Additional Actions */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-8 text-center"
              >
                <button
                  onClick={() => navigate('/auth/login')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
                >
                  Go to Login
                  <span>→</span>
                </button>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-8 text-center space-y-4"
              >
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  Try Again
                </button>
                <div>
                  <button
                    onClick={() => navigate('/auth/signup')}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    Need a new account? Sign up here
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ActivateAccount;
