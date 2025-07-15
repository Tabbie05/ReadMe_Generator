import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import { useButtonStore } from './store/useButtonStore'; // Import the store for accessing readmeContent

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { readmeContent } = useButtonStore(); // Access the readmeContent from the store

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const downloadReadme = () => {
    // Create a Blob object with the README content
    const blob = new Blob([readmeContent], { type: 'text/markdown' });
    
    // Create a link element and set its download attribute
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'README.md'; // Set the filename
    link.click(); // Programmatically click the link to trigger download
  };

  return (
    <nav className={`h-16 sm:h-20 w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-700 border-b border-gray-200'}`}>
      {/* Logo Section */}
      <div className="flex items-center">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 border-2 rounded-full flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'border-blue-500' : 'border-blue-600'}`}>
          <span className={`font-bold text-xl sm:text-2xl italic transition-colors duration-300 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>i</span>
        </div>
        <div className={`ml-2 text-2xl sm:text-3xl mb-1 mt-1 italic font-semibold leading-none h-8 sm:h-10 flex items-center transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          ReadMe
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center space-x-3 sm:space-x-6">
        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 hover:scale-110 ${isDarkMode ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`} aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
          {isDarkMode ? <FaSun size={24} className="sm:w-7 sm:h-7" /> : <FaMoon size={24} className="sm:w-7 sm:h-7" />}
        </button>

        {/* Download Button */}
        <button onClick={downloadReadme} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/25'}`}>
          <MdOutlineFileDownload className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Download</span>
          <span className="xs:hidden">Download</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
