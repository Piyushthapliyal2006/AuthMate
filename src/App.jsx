import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './store/authSlice';  // Assuming you're using Redux Toolkit
import { Helmet, HelmetProvider } from 'react-helmet-async';

import './App.css';
import Layout from './layout/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import PasswordResetConfirm from './pages/PasswordResetConfirm';
import NotFound from './pages/NotFound';
import BetaAnnouncementPage from './pages/beta/Beta';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Archived from './pages/Archived';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import ProjectDetails from './pages/ProjectDetails';
import DocsLayout from './pages/docs/Docs';
import PricingPage from './pages/payment/Pricing';
import BlogPage from './pages/blogs/BlogPage';
import BlogPostPage from './pages/blogs/[slug]/BlogPostPage';
import { ThemeProvider } from './components/contexts/theme-context';

import { conf } from "@/conf/conf.js";

function App() {
  console.log(conf.devBaseUrl)

  // Access the authentication state from Redux
  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Check for the token in localStorage on app load (when page is refreshed)
  useEffect(() => {
    if (!accessToken) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // Dispatch login action if accessToken is available
        dispatch(login({ access: token, refresh: localStorage.getItem('refreshToken') }));
      }
    }
  }, [dispatch, accessToken]);

  return (

    <ThemeProvider>
      <HelmetProvider> {/* Wrap your app in HelmetProvider */}
        <Router>
          <div>
            <main className="bg-gray-100">
              <Helmet>
                <title>AuthMate - Welcome to AuthMate</title>
                <meta
                  name="description"
                  content="Authmate provides the secured authentication with 0 backend code."
                />
                <meta
                  name="keywords"
                  content="Authmate, secured, authentication, 0 backend code, Auth Mate, authmate, Auth mate, auth mate, authmate.xyz, authmatedev, authmate dev, authmate development"
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
                <meta name="twitter:image" content="https://authmate.xyz/twitter-image.jpg" />
                <meta name="twitter:site" content="@Authmate_dev" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://authmate.xyz" />
                <link rel="icon" href="/favicom.ico" />
                <meta name="author" content="Anmol" />
                <meta property="og:locale" content="en_US" />


                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="AuthMate" />
                <link rel="manifest" href="/site.webmanifest" />
              </Helmet>

              {/* Add a button to test API request manually */}
              {/* <button onClick={handleApiRequest}>Test API Request</button> */}

              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/beta" element={<BetaAnnouncementPage />} />
                <Route path="/blogs" element={<BlogPage />} />
                <Route path="/blogs/:slug" element={<BlogPostPage />} />
                <Route path="/docs" element={<DocsLayout />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/auth/signup" element={<Signup />} />

                <Route path="/about" element={<h1>About Page lorem900</h1>} />
                <Route path="/services" element={<h1>Services Page</h1>} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/auth/login"
                  element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
                />
                <Route path="/users/reset_password/" element={<ResetPassword />} />
                <Route path="/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm />} />

                {/* Protected Routes (with Layout) */}
                <Route element={isAuthenticated ? <Layout /> : <Navigate to="/auth/login" />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/archived" element={<Archived />} />
                  <Route path="/project/:id" element={<ProjectDetails />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
                {/* 404 Route (Catch-All for undefined routes) */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
