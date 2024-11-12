import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './store/authSlice';  // Assuming you're using Redux Toolkit
import { Helmet, HelmetProvider } from 'react-helmet-async';

import './App.css';
import Layout from './layout/Layout';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import PasswordResetConfirm from './pages/PasswordResetConfirm';

function App() {
  // Access the authentication state from Redux
  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Check for the token in localStorage on app load (when page is refreshed)
  useEffect(() => {
    // If we are not authenticated, we don't need to do anything
    if (!accessToken) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // Dispatch login action if accessToken is available
        dispatch(login({ access: token, refresh: localStorage.getItem('refreshToken') }));
      }
    }
  }, [dispatch, accessToken]);

  return (
    <HelmetProvider> {/* Wrap your app in HelmetProvider */}
      <Router>
        <div>
          <main className="bg-gray-100">
            <Helmet>
              <title>AuthMate</title>
              <meta
                name="description"
                content="Authmate provides the secured authentication with 0 backend code."
              />
              <meta
                name="keywords"
                content="Authmate, secured, authentication, 0 backend code, Auth Mate, authmate, Auth mate, auth mate"
              />
              <meta charSet="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />

              <meta property="og:title" content="AuthMate" />
              <meta
                property="og:description"
                content="Authmate provides the secured authentication with 0 backend code."
              />
              <meta property="og:image" content="https://authmate.xyz/og-image.jpg" />
              <meta property="og:url" content="https://authmate.xyz" />
              <meta property="og:type" content="website" />
              <meta property="og:site_name" content="AuthMate" />

              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="AuthMate" />
              <meta
                name="twitter:description"
                content="Authmate provides the secured authentication with 0 backend code."
              />
              <meta name="twitter:image" content="https://www.devdisplay.org/twitter-image.jpg" />
              <meta name="twitter:site" content="@devdisplay_" />

              <meta name="robots" content="index, follow" />

              <link rel="canonical" href="https://www.devdisplay.org" />
              <link rel="icon" href="/DevDisplay ICON.png" />
              <link rel="apple-touch-icon" sizes="180x180" href="/DevDisplay ICON.png" />
              <meta name="theme-color" content="#317EFB" />
              <meta name="author" content="Anmol" />
              <meta property="og:locale" content="en_US" />
            </Helmet>

            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
              />
              <Route path="/users/reset_password/" element={<ResetPassword />} />
              <Route path="/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm />} />

              {/* Protected Routes (with Layout) */}
              <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<h1>About Page lorem900</h1>} />
                <Route path="/services" element={<h1>Services Page</h1>} />
                <Route path="/contact" element={<h1>Contact Page</h1>} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
