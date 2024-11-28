import React from 'react';
import { MagnifyingGlassIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch the logout action
import { logout } from '../store/authSlice'; // Import logout action
import { Link } from 'react-router-dom';

const Navbar = ({
  darkMode,
  toggleSidebar,
  searchQuery,
  setSearchQuery,
  toggleTheme,
  showProfileDropdown,
  setShowProfileDropdown
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
    <nav className={`fixed top-0 right-0 left-0 z-50 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="logo">
              <Link to={"/dashboard"}>
                <span className='text-3xl font-bold tracking-tight text-gray-900'>AuthMate</span>
              </Link>
            </div>
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${darkMode ? "text-white" : "text-gray-600"}`}
              aria-label="Toggle Sidebar"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Right Nav Items */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <SunIcon className="w-6 h-6 text-yellow-400" />
              ) : (
                <MoonIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <FiChevronDown className={`w-4 h-4 ${darkMode ? "text-white" : "text-gray-600"}`} />
              </button>

              {showProfileDropdown && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  <Link to="/profile" className={`block px-4 py-2 text-sm ${darkMode ? "text-white hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>Your Profile</Link>
                  <Link to="/settings" className={`block px-4 py-2 text-sm ${darkMode ? "text-white hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>Settings</Link>
                  <Link
                    onClick={handleLogout} // Attach the logout handler to the logout button
                    className={`block px-4 py-2 text-sm ${darkMode ? "text-white hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
