import React, { useState, useEffect } from "react";
import { FiSun, FiMoon, FiSearch, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { FaReact, FaPython, FaNodeJs } from "react-icons/fa";

const DocsLayout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("react");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("installation");
  const [expandedSections, setExpandedSections] = useState(["getting-started"]);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const sidebarSections = {
    "getting-started": {
      title: "Getting Started",
      subsections: ["installation", "quick-start", "configuration"]
    },
    "core-concepts": {
      title: "Core Concepts",
      subsections: ["architecture", "components", "state-management"]
    },
    "advanced-topics": {
      title: "Advanced Topics",
      subsections: ["security", "performance", "deployment"]
    }
  };

  const contentData = {
    installation: {
      title: "Installation Guide",
      content: "Follow these steps to install our SaaS platform in your environment. We provide multiple installation methods to suit your needs."
    },
    "quick-start": {
      title: "Quick Start Guide",
      content: "Get up and running quickly with our streamlined quick start process. Perfect for developers who want to dive right in."
    },
    configuration: {
      title: "Configuration Options",
      content: "Learn about all available configuration options and how to customize the platform to meet your specific requirements."
    },
    architecture: {
      title: "System Architecture",
      content: "Understand the core architecture of our platform and how different components interact with each other."
    },
    components: {
      title: "Component Library",
      content: "Explore our extensive component library and learn how to use each component effectively in your application."
    },
    "state-management": {
      title: "State Management",
      content: "Deep dive into our state management solutions and best practices for maintaining application state."
    },
    security: {
      title: "Security Guidelines",
      content: "Learn about our security features and how to implement secure practices in your application."
    },
    performance: {
      title: "Performance Optimization",
      content: "Tips and techniques for optimizing your application's performance and scaling effectively."
    },
    deployment: {
      title: "Deployment Strategies",
      content: "Various deployment options and strategies to help you deploy your application efficiently."
    }
  };

  const codeExamples = {
    react: "import { SaaSComponent } from '@saas/core';\n\nconst App = () => {\n  return <SaaSComponent config={yourConfig} />;\n};\n",
    python: "from saas import SaaSClient\n\nclient = SaaSClient(api_key='your_api_key')\nresponse = client.initialize()\n",
    nodejs: "const SaaS = require('@saas/node');\n\nconst client = new SaaS({ apiKey: 'your_api_key' });\nclient.initialize();"
  };

  const languageIcons = {
    react: <FaReact className="text-xl" />,
    python: <FaPython className="text-xl" />,
    nodejs: <FaNodeJs className="text-xl" />
  };

  const toggleSection = (section) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const DocsHeader = () => (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <FiChevronRight className={`transform transition-transform duration-300 ${sidebarOpen ? "rotate-180" : ""}`} />
          </button>
          <h1 className="text-xl font-bold dark:text-white">Documentation</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun className="text-white" /> : <FiMoon />}
          </button>
        </div>
      </div>
    </header>
  );

  const DocsSidebar = () => (
    <aside
      className={`fixed left-0 top-0 h-full w-64 bg-gray-50 dark:bg-gray-800 transform transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} pt-20 overflow-y-auto shadow-lg`}
    >
      <div className="px-4 py-2">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-colors duration-200"
          />
        </div>
      </div>
      <nav className="mt-4">
        {Object.entries(sidebarSections).map(([key, section]) => (
          <div key={key} className="mb-2">
            <button
              onClick={() => toggleSection(key)}
              className="w-full px-4 py-2 flex items-center justify-between text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="text-gray-700 dark:text-gray-200">{section.title}</span>
              <FiChevronDown
                className={`transform transition-transform duration-200 ${expandedSections.includes(key) ? "rotate-180" : ""}`}
              />
            </button>
            {expandedSections.includes(key) && (
              <div className="ml-4">
                {section.subsections.map((subsection) => (
                  <button
                    key={subsection}
                    onClick={() => setActiveSection(subsection)}
                    className={`w-full px-4 py-2 text-left ${activeSection === subsection ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"} transition-colors duration-200`}
                  >
                    {subsection.charAt(0).toUpperCase() + subsection.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );

  const DocsContent = () => (
    <main className={`transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-64" : "ml-0"} p-8`}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="relative mb-4">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {languageIcons[selectedLanguage]}
              <span className="ml-2">{selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}</span>
              <FiChevronDown className={`transform transition-transform duration-200 ${isLanguageDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg z-10">
                {Object.keys(codeExamples).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setIsLanguageDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    {languageIcons[lang]}
                    <span className="ml-2">{lang.charAt(0).toUpperCase() + lang.slice(1)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <textarea
            readOnly
            value={codeExamples[selectedLanguage]}
            className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white shadow-inner transition-colors duration-200"
          />
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">{contentData[activeSection].title}</h2>
          <p className="mb-4">{contentData[activeSection].content}</p>
        </div>
      </div>
    </main>
  );

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <DocsHeader />
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
};

export default DocsLayout;
