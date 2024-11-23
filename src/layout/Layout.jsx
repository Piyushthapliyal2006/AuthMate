import React, { useState, useEffect } from 'react'; // Import useState, useEffect from React
import { Outlet } from 'react-router-dom'; // For nested routing
import { FiHome, FiUsers, FiFolder, FiSettings } from 'react-icons/fi'; // Import required icons from react-icons/fi
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'; // Import QuestionMarkCircleIcon from heroicons
import Navbar from "../components/Navbar"; // Assuming your Navbar is in the components folder
import Sidebar from "../components/Sidebar"; // Assuming your Sidebar is in the components folder

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeDropdowns, setActiveDropdowns] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    {
      id: 1,
      title: "Dashboard",
      icon: <FiHome className="w-5 h-5" />,
      submenu: [],
      link: "/dashboard"
    },
    {
      id: 2,
      title: "User Management",
      icon: <FiUsers className="w-5 h-5" />,
      submenu: [
        { id: 21, title: "User List", link: "/users" },
        { id: 22, title: "User Roles", link: "/roles" },
        { id: 23, title: "Permissions", link: "/permissions" },
      ],
    },
    {
      id: 3,
      title: "Projects",
      icon: <FiFolder className="w-5 h-5" />,
      submenu: [
        { id: 31, title: "Active Projects", link: "/projects/active" },
        { id: 32, title: "Archived Projects", link: "/projects/archived" },
      ],
    },
    {
      id: 4,
      title: "Settings",
      icon: <FiSettings className="w-5 h-5" />,
      submenu: [
        { id: 41, title: "General", link: "/settings/general" },
        { id: 42, title: "Security", link: "/settings/security" },
        { id: 43, title: "Notifications", link: "/settings/notifications" },
      ],
    },
    {
      id: 5,
      title: "Help",
      icon: <QuestionMarkCircleIcon className="w-5 h-5" />,
      submenu: [],
      link: "/help"
    },
  ];

  // Toggle Sidebar on Mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsOpen(false);
      } else {
        setIsMobile(false);
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle Dark Mode
  const toggleTheme = () => setDarkMode(!darkMode);

  // Handle Sidebar Dropdown Toggle
  const toggleDropdown = (id) => {
    setActiveDropdowns((prev) =>
      prev.includes(id)
        ? prev.filter((dropdownId) => dropdownId !== id)
        : [...prev, id]
    );
  };

  // Scroll to Top Logic
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar
        darkMode={darkMode}
        toggleSidebar={() => setIsOpen(!isOpen)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleTheme={toggleTheme}
        showProfileDropdown={showProfileDropdown}
        setShowProfileDropdown={setShowProfileDropdown}
      />
      <Sidebar
        darkMode={darkMode}
        menuItems={menuItems}
        isOpen={isOpen}
        toggleDropdown={toggleDropdown}
        activeDropdowns={activeDropdowns}
        isMobile={isMobile}
      />
      <div className="flex-1 p-6">
        <Outlet />  {/* This is where the nested routes will render */}
      </div>
    </>
  );
};

export default Layout;
