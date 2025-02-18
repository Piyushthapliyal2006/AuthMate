import React from 'react';
// import { MagnifyingGlassIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { FiSearch, FiSun, FiMoon, FiUser, FiMenu } from 'react-icons/fi';
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch the logout action
import { logout } from '../store/authSlice'; // Import logout action
import { Link } from 'react-router-dom';

const Navbar = ({
  darkMode,
  toggleSidebar,
  searchQuery,
  setSearchQuery,
  toggleTheme,
}) => {
  const dispatch = useDispatch(); // Get the dispatch function

  // Handle the logout action
  const handleLogout = () => {
    // Clear the access and refresh tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Dispatch the logout action to clear the auth state in Redux
    dispatch(logout());

    // Optionally, you can redirect the user to the login page
    window.location.href = '/auth/login'; // This will reload the page and redirect to login
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-10 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} shadow-lg transition-all duration-300 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden transition-colors duration-200"
              aria-label="Toggle Sidebar"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            {/* Only show logo in mobile view when sidebar is collapsed */}
            <div className="lg:hidden">
              <Link to="/dashboard" className="flex items-center">
                <img src="/logo.png" alt="AuthMate Logo" className="h-8 w-auto mr-2" />
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-200">
                  AuthMate
                </span>
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out`}
              />
              <FiSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <FiSun className="w-6 h-6 text-yellow-400 transition-colors duration-200" />
              ) : (
                <FiMoon className="w-6 h-6 text-gray-600 transition-colors duration-200" />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out"
            >
              <FiUser className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
