import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // For nested routing
import Navbar from "@/components/Navbar"; // Assuming your Navbar is in the components folder
import Sidebar from "@/components/Sidebar"; // Assuming your Sidebar is in the components folder

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Sidebar on Mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      (!localStorage.getItem("darkMode") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
  }, []);

  // Toggle dark mode
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());

    // Apply dark mode class to the document root
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Set initial dark mode class on component mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <main
        className="p-4 transition-all duration-300 ease-in-out"
        style={{ marginLeft: isSidebarOpen ? "240px" : "60px" }}
      >
        <div className="mt-16 container mx-auto">
          <Outlet /> {/* This is where the nested routes will render */}
        </div>
      </main>
    </div>
  );
};

export default Layout;
