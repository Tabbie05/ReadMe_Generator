import React from 'react';
import { FaMoon } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';

function Navbar() {
  return (
    <nav className="h-20 w-full flex items-center justify-between px-6 bg-gray-600 text-gray-300">
      <div className="flex items-center">
        <div className="w-10 h-10  border-2 border-blue-600 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-bold text-2xl italic">i</span>
        </div>
       
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-xl hover:text-gray-400" aria-label="Toggle dark mode">
          <FaMoon size={30}/>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-xl">
          <MdOutlineFileDownload className="text-white "  size={25}/>
          Download
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
