import axios from 'axios';
import { updateAccessToken } from './authSlice';  // Redux action
import { store } from './store';  // Redux store

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const data = JSON.stringify({
    refresh: refreshToken,
  });

  const config = {
    method: 'post',
    url: '/api/auth/jwt/refresh/',  // Your API endpoint
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);

    if (response.data.access) {
      store.dispatch(updateAccessToken({ access: response.data.access }));
      return response.data.access;  // Return new access token
    } else {
      throw new Error('Failed to refresh token');
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export default refreshAccessToken;
