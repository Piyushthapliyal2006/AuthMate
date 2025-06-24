import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './store/authSlice';  // Assuming you're using Redux Toolkit
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';

import { ThemeProvider } from './components/contexts/theme-context';
import Layout from './layout/Layout';


import { conf } from "@/conf/conf.js";
import CancelSubscriptionButton from './components/Billing/CancelSubscriptionButton';

// Lazy Load Pages
const Landing = React.lazy(() => import('./pages/Landing'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const PasswordResetConfirm = React.lazy(() => import('./pages/PasswordResetConfirm'));
const ActivateAccount = React.lazy(() => import('./pages/ActivateAccount'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const BetaAnnouncementPage = React.lazy(() => import('./pages/beta/Beta'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Archived = React.lazy(() => import('./pages/Archived'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Contact = React.lazy(() => import('./pages/Contact'));
const ProjectDetails = React.lazy(() => import('./pages/ProjectDetails'));
const OrganizationSettings = React.lazy(() => import('./pages/settings/OrganizationSettings'));
const AcceptInvite = React.lazy(() => import('./pages/settings/AcceptInvite'));
const DocsLayout = React.lazy(() => import('./pages/docs/Docs'));
const PricingPage = React.lazy(() => import('./pages/payment/Pricing'));
const Billing = React.lazy(() => import('./pages/payment/Billing'));
const BlogPage = React.lazy(() => import('./pages/blogs/BlogPage'));
const BlogPostPage = React.lazy(() => import('./pages/blogs/[slug]/BlogPostPage'));
const SubscriptionList = React.lazy(() => import('@/components/billing/SubscriptionList'));
const InvoiceList = React.lazy(() => import('@/components/billing/InvoiceList'));
const Notifications = React.lazy(() => import('./pages/settings/notifications/Notifications'));
const PrivacyPolicy = React.lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsnConditions = React.lazy(() => import('./pages/legal/TermsnConditions'));

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

  console.log("Rendering App");

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

              <Suspense
                fallback={
                  <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
                    <div className="relative">
                      <img
                        alt="AuthMate Logo"
                        src="/favicon.svg"
                        className="mx-auto h-28 w-auto opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer" />
                    </div>
                  </div>
                }
              >


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

                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsnConditions />} />


                <Route
                  path="/auth/login"
                  element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
                />
                <Route path="/users/reset_password/" element={<ResetPassword />} />
                <Route path="/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm />} />
                <Route path="/activate/:userId/:token" element={<ActivateAccount />} />

                {/* Protected Routes (with Layout) */}
                <Route element={isAuthenticated ? <Layout /> : <Navigate to="/auth/login" />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/archived" element={<Archived />} />
                  <Route path="/project/:id" element={<ProjectDetails />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings/security" element={<ResetPassword />} />
                  <Route path="/settings/notifications" element={<Notifications />} />
                  <Route path="/settings/organization" element={<OrganizationSettings />} />
                  <Route path="/settings/organization/accept-invite" element={<AcceptInvite />} />
                  <Route path="/settings/billing" element={<Billing />} />
                  <Route path="/settings/billing/invoice" element={<InvoiceList />} />
                  <Route path="/settings/billing/subscription" element={<SubscriptionList />} />
                  <Route path="/settings/billing/subscription/cancel" element={<CancelSubscriptionButton />} />

                </Route>
                {/* 404 Route (Catch-All for undefined routes) */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </HelmetProvider>
    </ThemeProvider >
  );
}

export default App;
