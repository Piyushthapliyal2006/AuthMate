import React, { useState } from 'react';
import { FiChevronLeft, FiChevronDown, FiHome, FiUsers, FiFolder, FiSettings, FiBook } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MenuItem = ({ icon: Icon, title, items, isOpen, link }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const handleClick = () => {
    if (items) {
      setIsSubmenuOpen(!isSubmenuOpen); // Toggle submenu if items exist
    }
  };

  return (
    <div className="mb-2 transition-all duration-200 ease-in-out">
      {/* Parent Menu Item */}
      {isOpen && (
          <Link
            to={link}
            className="hover:text-blue-600 dark:hover:text-blue-400"
            onClick={(e) => {
              if (items) e.preventDefault(); // Prevent navigation if submenu exists
            }}
          >
      <div
        className={`flex items-center justify-between p-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md ${isSubmenuOpen ? 'bg-blue-100 dark:bg-blue-900' : ''
          }`}
        onClick={handleClick}
      >
       
            <div className="flex items-center">
              <Icon className="w-5 h-5 mr-2" />
              {title}
            </div>
         
       
        {items && isOpen && (
          <FiChevronDown
            className={`w-4 h-4 transition-transform ${isSubmenuOpen ? 'transform rotate-180' : ''}`}
          />
        )}
      </div>
      </Link>
      )}

      {/* Submenu Items */}
      {items && isSubmenuOpen && isOpen && (
        <div className="ml-4 mt-2">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="block py-2 px-4 text-sm text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-800 rounded-md transition-all duration-200 ease-in-out"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: FiHome, title: 'Dashboard', link: '/dashboard' },
    {
      icon: FiUsers,
      title: 'User Management',
      link: '#',
      items: [
        { title: 'User List', link: '/user-management' },
        { title: 'User Roles', link: '/roles' },
        { title: 'Permissions', link: '/permissions' },
      ],
    },
    {
      icon: FiFolder,
      title: 'Projects',
      link: '#',
      items: [
        { title: 'Active Projects', link: '/projects' },
        { title: 'Archived Projects', link: '/projects/archived' },
      ],
    },
    {
      icon: FiSettings,
      title: 'Settings',
      link: '#',
      items: [
        { title: 'General', link: '/settings/general' },
        { title: 'Security', link: '/settings/security' },
        { title: 'Notifications', link: '/settings/notifications' },
        { title: 'Organization', link: '/settings/organization' },
        { title: 'Billing', link: '/settings/billing' },
      ],
    },
    { icon: FiBook, title: 'Docs', link: 'https://docs.authmate.xyz' },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg z-20 transition-all duration-300 ease-in-out ${isOpen ? 'w-60' : 'w-16'
        }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {isOpen && <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">AuthMate</h1>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none transition-all duration-200 ease-in-out"
        >
          <FiChevronLeft
            className={`w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform ${isOpen ? '' : 'transform rotate-180'}`}
          />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-4 px-2">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} isOpen={isOpen} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

