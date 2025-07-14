import React from 'react';
import { TfiReload } from 'react-icons/tfi';
import { PiCirclesFourThin } from 'react-icons/pi';
import { MdDelete } from 'react-icons/md';
import ChoosenButtons from './ChoosenButtons';
import '../../index.css'
import { useButtonStore } from '../store/useButtonStore';
import { sections } from '../../Constants/App'; // 🎯 FIXED: Import sections

function Sidebar() {
  const { resetButtons } = useButtonStore();
  
  const handleResetAll = () => {
    if (confirm('Are you sure you want to reset all sections?')) {
      resetButtons(sections); // 🎯 FIXED: Now sections is imported
    }
  };

  return (
    <section className="h-[calc(100vh-6.5rem)] w-85 overflow-y-auto overflow-x-hidden mt-3 bg-white ">

      <div className="fixed gap-39 bg-white flex justify-between text-sm text-blue-600 px-4">
        <div className='font-bold text-[18px]'>Sections</div>
        <div className=" items-center gap-2 text-[18px]">
          <button className='flex items-center gap-2 '> 
            <TfiReload color="black" size={15} onClick={handleResetAll} />
            Reset
          </button>
        </div>
      </div>

      <p className="text-[13px] text-gray-600 ml-4 mt-6">
        Click on a section below to edit the contents
      </p>

      <div>
        <ChoosenButtons />
      </div>
    </section>
  );
}

export default Sidebar;
