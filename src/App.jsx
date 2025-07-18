import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './store/authSlice';  // Assuming you're using Redux Toolkit
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

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
const SubscriptionList = React.lazy(() => import('@/components/Billing/SubscriptionList'));
const InvoiceList = React.lazy(() => import('@/components/Billing/InvoiceList'));
const Notifications = React.lazy(() => import('./pages/settings/notifications/Notifications'));
const PrivacyPolicy = React.lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsnConditions = React.lazy(() => import('./pages/legal/TermsnConditions'));
const UserList = React.lazy(() => import('./components/user-management/UserList'));

function App() {
  console.log(conf.devBaseUrl);

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

  // Wrapper for dynamic titles and descriptions
  function PageWrapper({ title, description, children }) {
    const location = useLocation();

    return (
      <>
        <Helmet key={location.pathname}> {/* key forces remount on path change */}
          <title>{`AuthMate - ${title}`}</title>
          {description && <meta name="description" content={description} />}
        </Helmet>
        {children}
      </>
    );
  }

  return (
    <ThemeProvider>
      <HelmetProvider>
        <Router>
          <div>
            <main className="bg-gray-100">
              {/* Default meta tags - keep for fallback */}
              <Helmet>
                <title>AuthMate - Welcome to AuthMate</title>
                <meta
                  name="description"
                  content="Secure authentication with zero backend code. Built for devs."
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
                  content="Secure authentication with zero backend code. Built for devs."
                />
                <meta property="og:image" content="https://authmate.xyz/og.png" />
                <meta property="og:url" content="https://authmate.xyz" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="AuthMate" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="AuthMate" />
                <meta
                  name="twitter:description"
                  content="Secure authentication with zero backend code. Built for devs."
                />
                <meta name="twitter:image" content="https://authmate.xyz/og.png" />
                <meta name="twitter:site" content="@Authmate_dev" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://authmate.xyz" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="author" content="Anmol" />
                <meta property="og:locale" content="en_US" />
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="AuthMate" />
                <link rel="manifest" href="/site.webmanifest" />
              </Helmet>

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
                  {/* Landing page: keep original title */}
                  <Route path="/" element={<Landing />} />

                  {/* Other public routes with dynamic titles */}
                  <Route
                    path="/beta"
                    element={
                      <PageWrapper title="Beta Announcement" description="Join our beta program now!">
                        <BetaAnnouncementPage />
                      </PageWrapper>
                    }
                  />
                  <Route
                    path="/blogs"
                    element={
                      <PageWrapper title="Blogs" description="Read our latest blog posts">
                        <BlogPage />
                      </PageWrapper>
                    }
                  />
                  <Route
                    path="/blog/:slug"
                    element={
                      <PageWrapper title="Blog Post" description="Detailed blog post">
                        <BlogPostPage />
                      </PageWrapper>
                    }
                  />
                  <Route
                    path="/docs"
                    element={
                      <PageWrapper title="Documentation" description="AuthMate documentation and guides">
                        <DocsLayout />
                      </PageWrapper>
                    }
                  />
                  <Route
                    path="/pricing"
                    element={
                      <PageWrapper title="Pricing" description="AuthMate pricing plans">
                        <PricingPage />
                      </PageWrapper>
                    }
                  />
                  <Route
                    path="/auth/signup"
                    element={
                      <PageWrapper title="Sign Up" description="Create your AuthMate account">
                        <Signup />
                      </PageWrapper>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <PageWrapper title="Contact Us" description="Get in touch with AuthMate">
                        <Contact />
                      </PageWrapper>
                    }
                  />
                  <Route
                    path="/privacy"
                    element={
                      <PageWrapper title="Privacy Policy" description="Our privacy practices">
                        <PrivacyPolicy />
                      </PageWrapper>
                    }
                  />
                  <Route
                    path="/terms"
                    element={
                      <PageWrapper title="Terms and Conditions" description="Terms of service and conditions">
                        <TermsnConditions />
                      </PageWrapper>
                    }
                  />

                  {/* Auth/Login routes */}
                  <Route
                    path="/auth/login"
                    element={
                      isAuthenticated ? (
                        <Navigate to="/dashboard" />
                      ) : (
                        <PageWrapper title="Login" description="Access your AuthMate account">
                          <Login />
                        </PageWrapper>
                      )
                    }
                  />
                  <Route
                    path="/users/reset_password/"
                    element={
                      <PageWrapper title="Reset Password" description="Reset your AuthMate password">
                        <ResetPassword />
                      </PageWrapper>
                    }
                  />
                  <Route
                    path="/password/reset/confirm/:uid/:token"
                    element={
                      <PageWrapper title="Confirm Password Reset" description="Confirm your password reset request">
                        <PasswordResetConfirm />
                      </PageWrapper>
                    }
                  />
                  <Route
                    path="/activate/:userId/:token"
                    element={
                      <PageWrapper title="Activate Account" description="Activate your AuthMate account">
                        <ActivateAccount />
                      </PageWrapper>
                    }
                  />

                  {/* Protected Routes with Layout */}
                  <Route
                    element={isAuthenticated ? <Layout /> : <Navigate to="/auth/login" />}
                  >
                    <Route
                      path="/dashboard"
                      element={
                        <PageWrapper title="Dashboard" description="Your AuthMate dashboard">
                          <Dashboard />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/projects"
                      element={
                        <PageWrapper title="Projects" description="Manage your projects">
                          <Projects />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/projects/archived"
                      element={
                        <PageWrapper title="Archived Projects" description="View archived projects">
                          <Archived />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/project/:id"
                      element={
                        <PageWrapper title="Project Details" description="Detailed project info">
                          <ProjectDetails />
                        </PageWrapper>
                      }
                    />

                    <Route
                      path="/user-management"
                      element={
                        <PageWrapper title="User Management" description="Manage users and roles">
                          <UserList />
                        </PageWrapper>
                      }
                    />
                    

                    <Route
                      path="/profile"
                      element={
                        <PageWrapper title="Profile" description="Manage your user profile">
                          <Profile />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/settings/security"
                      element={
                        <PageWrapper title="Security Settings" description="Update your security settings">
                          <ResetPassword />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/settings/notifications"
                      element={
                        <PageWrapper title="Notifications Settings" description="Manage notification preferences">
                          <Notifications />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/settings/organization"
                      element={
                        <PageWrapper title="Organization Settings" description="Manage your organization">
                          <OrganizationSettings />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/settings/organization/accept-invite"
                      element={
                        <PageWrapper title="Accept Invite" description="Accept organization invite">
                          <AcceptInvite />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/settings/billing"
                      element={
                        <PageWrapper title="Billing" description="Manage billing and payments">
                          <Billing />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/settings/billing/invoice"
                      element={
                        <PageWrapper title="Invoices" description="View your invoices">
                          <InvoiceList />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/settings/billing/subscription"
                      element={
                        <PageWrapper title="Subscriptions" description="Manage your subscriptions">
                          <SubscriptionList />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/settings/billing/subscription/cancel"
                      element={
                        <PageWrapper title="Cancel Subscription" description="Cancel your subscription">
                          <CancelSubscriptionButton />
                        </PageWrapper>
                      }
                    />
                  </Route>

                  {/* 404 catch-all */}
                  <Route
                    path="*"
                    element={
                      <PageWrapper title="Page Not Found" description="The requested page was not found">
                        <NotFound />
                      </PageWrapper>
                    }
                  />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
