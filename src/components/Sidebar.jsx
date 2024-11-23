import React from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = ({ darkMode, menuItems, isOpen, toggleDropdown, activeDropdowns, isMobile }) => {
  return (
    <nav
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl transition-all duration-300 ease-in-out z-40 ${isOpen ? "w-64" : "w-0 md:w-16"} ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}`}
      aria-label="Sidebar Navigation"
    >
      <div className="h-full overflow-y-auto">
        <ul className="p-2">
          {menuItems.map((item) => (
            <li key={item.id} className="mb-1">
              <div
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} ${activeDropdowns.includes(item.id) ? (darkMode ? "bg-gray-700" : "bg-gray-50") : ""}`}
                onClick={() => item.submenu.length && toggleDropdown(item.id)}
                role="button"
                tabIndex={0}
                aria-expanded={activeDropdowns.includes(item.id)}
              >
                <div className="flex items-center">
                  <span className={`mr-2 ${darkMode ? "text-white" : ""}`}>{item.icon}</span>
                  <span className={`transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 md:hidden"} ${darkMode ? "text-white" : ""}`}>{item.title}</span>
                </div>
                {item.submenu.length > 0 && isOpen && (
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${darkMode ? "text-white" : ""} ${activeDropdowns.includes(item.id) ? "rotate-180" : ""}`}
                  />
                )}
              </div>
              {item.submenu.length > 0 && isOpen && (
                <ul className={`ml-8 mt-1 transition-all duration-200 ${activeDropdowns.includes(item.id) ? "max-h-48 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                  {item.submenu.map((subitem) => (
                    <li key={subitem.id}>
                      <Link
                        to={subitem.link}
                        className={`block p-2 text-sm rounded-lg ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"}`}
                      >
                        {subitem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
