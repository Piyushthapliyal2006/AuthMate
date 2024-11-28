import { createSlice } from '@reduxjs/toolkit';

// Initial state setup based on localStorage
const loadTokensFromLocalStorage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    isAuthenticated: !!accessToken,  // Checks if the access token exists
    accessToken,
    refreshToken,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadTokensFromLocalStorage(), // Initialize with localStorage
  reducers: {
    login: (state, action) => {
      const { access, refresh } = action.payload;
      state.isAuthenticated = true;
      state.accessToken = access;
      state.refreshToken = refresh;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    updateAccessToken: (state, action) => {
      const { access } = action.payload;
      state.accessToken = access;
      localStorage.setItem('accessToken', access); // Update localStorage
    },
  },
});

export const { login, logout, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
