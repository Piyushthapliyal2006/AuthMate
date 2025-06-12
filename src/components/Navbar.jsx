import React from 'react';
import {
  FiSearch,
  FiSun,
  FiMoon,
  FiUser,
  FiMenu,
  FiLogOut,
} from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Link } from 'react-router-dom';

const Navbar = ({
  darkMode,
  toggleSidebar,
  searchQuery,
  setSearchQuery,
  toggleTheme,
}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(logout());
    window.location.href = '/auth/login';
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-10 shadow-md transition-all duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Sidebar Toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden transition"
              aria-label="Toggle Sidebar"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <div className="lg:hidden">
              <Link to="/dashboard" className="flex items-center">
                <img
                  src="/favicon.svg"
                  alt="AuthMate Logo"
                  className="h-10 w-auto mr-2"
                />
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  AuthMate
                </span>
              </Link>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-lg mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
              <FiSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Right: Theme & User */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition"
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <FiSun className="w-6 h-6 text-yellow-400" />
              ) : (
                <FiMoon className="w-6 h-6 text-gray-600" />
              )}
            </button>

            {/* User Dropdown */}
            <div className="relative group">
              <div className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" />
                </svg>
              </div>

              {/* Dropdown Content */}
              <div className="absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 invisible group-hover:visible transition-all transform duration-200">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <CgProfile className="text-lg" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 transition"
                >
                  <FiLogOut className="text-lg" />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
