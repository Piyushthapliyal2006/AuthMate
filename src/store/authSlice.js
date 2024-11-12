import { createSlice } from '@reduxjs/toolkit';

// Get initial authentication state from localStorage if available
const initialState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

// Initialize state based on localStorage
const loadTokensFromLocalStorage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    isAuthenticated: accessToken ? true : false,
    accessToken,
    refreshToken,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadTokensFromLocalStorage(), // Load from localStorage on app initialization
  reducers: {
    login: (state, action) => {
      const { access, refresh } = action.payload;

      // Save tokens to Redux state and localStorage
      state.isAuthenticated = true;
      state.accessToken = access;
      state.refreshToken = refresh;
      localStorage.setItem('accessToken', access); // Save access token
      localStorage.setItem('refreshToken', refresh); // Save refresh token
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken'); // Remove access token
      localStorage.removeItem('refreshToken'); // Remove refresh token
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
