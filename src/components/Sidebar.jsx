import React, { useState } from 'react';
import { 
  FiChevronLeft, 
  FiChevronDown, 
  FiHome, 
  FiUsers, 
  FiSettings, 
  FiBook,
  FiActivity
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ icon: Icon, title, items, isOpen, link }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if current path matches this menu item or its subitems
  const isActive = location.pathname === link || 
    (items && items.some(item => location.pathname === item.link));

  const handleClick = () => {
    if (items) {
      setIsSubmenuOpen(!isSubmenuOpen);
    }
  };

  return (
    <div className="mb-1.5 group">
      {/* Parent Menu Item */}
      <div className="relative">
        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full"></div>
        )}
        
        <Link
          to={items ? '#' : link}
          className="block"
          onClick={(e) => {
            if (items) {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          <div
            className={`
              flex items-center justify-between p-3 mx-2 cursor-pointer rounded-xl transition-all duration-300 ease-in-out transform
              ${isActive 
                ? 'bg-gradient-to-r from-blue-500/10 to-purple-600/10 dark:from-blue-400/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400 shadow-lg' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400'
              }
              hover:scale-[1.02] hover:shadow-md group-hover:translate-x-1
            `}
          >
            <div className="flex items-center space-x-3">
              <div className={`
                p-2 rounded-lg transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50'
                }
              `}>
                <Icon className="w-4 h-4" />
              </div>
              {isOpen && (
                <span className={`font-medium transition-all duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                  {title}
                </span>
              )}
            </div>

            {items && isOpen && (
              <div className={`
                p-1 rounded-lg transition-all duration-300
                ${isSubmenuOpen ? 'bg-blue-100 dark:bg-blue-900/50' : 'group-hover:bg-gray-200 dark:group-hover:bg-gray-600'}
              `}>
                <FiChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isSubmenuOpen ? 'rotate-180' : ''}`}
                />
              </div>
            )}
          </div>
        </Link>

        {/* Tooltip for collapsed sidebar */}
        {!isOpen && (
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
            {title}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-r-4 border-r-gray-900 dark:border-r-gray-700 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        )}
      </div>

      {/* Submenu Items */}
      {items && isSubmenuOpen && isOpen && (
        <div className="mt-2 ml-6 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`
                block py-2.5 px-4 text-sm rounded-lg transition-all duration-200 group relative
                ${location.pathname === item.link
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-600 dark:text-blue-400 font-medium shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400'
                }
                hover:translate-x-1 hover:shadow-sm
              `}
            >
              <div className="flex items-center space-x-2">
                <div className={`
                  w-1.5 h-1.5 rounded-full transition-all duration-200
                  ${location.pathname === item.link 
                    ? 'bg-blue-500' 
                    : 'bg-gray-400 group-hover:bg-blue-500'
                  }
                `}></div>
                <span>{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { 
      icon: FiHome, 
      title: 'Dashboard', 
      link: '/dashboard' 
    },
    {
      icon: FiUsers,
      title: 'User Management',
      link: '#',
      items: [
        { title: 'User List', link: '/user-management' },
        { title: 'Projects', link: '/projects' },
      ],
    },
    {
      icon: FiSettings,
      title: 'Settings',
      link: '#',
      items: [
        { title: 'General', link: '/settings/general' },
        { title: 'Notifications', link: '/settings/notifications' },
        { title: 'Organization', link: '/settings/organization' },
        { title: 'Billing', link: '/settings/billing' },
      ],
    },
    { 
      icon: FiBook, 
      title: 'Documentation', 
      link: 'https://docs.authmate.xyz'
    },
  ];

  return (
    <div className="relative">
      {/* Sidebar Container */}
      <div
        className={`
          fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out
          ${isOpen ? 'w-72' : 'w-20'}
        `}
      >
        {/* Background with blur effect */}
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
            {isOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <img src="/Logo.webp" alt="AuthMate" className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AuthMate
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Auth Management</p>
                </div>
              </div>
            )}
            
            {!isOpen && (
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mx-auto">
                <img src="/Logo.webp" alt="AuthMate" className="w-6 h-6" />
              </div>
            )}

            <button
              onClick={toggleSidebar}
              className="p-2.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-700/50 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 group"
              aria-label="Toggle Sidebar"
            >
              <FiChevronLeft
                className={`w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 ${
                  isOpen ? '' : 'rotate-180'
                }`}
              />
            </button>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 py-6 px-2 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {menuItems.map((item, index) => (
              <MenuItem key={index} {...item} isOpen={isOpen} />
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
            {isOpen ? (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System Status</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">All systems operational</p>
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                <FiActivity className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;