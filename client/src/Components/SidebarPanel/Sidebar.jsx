import React from 'react';
import { TfiReload } from 'react-icons/tfi';
import { PiCirclesFourThin } from 'react-icons/pi';
import { MdDelete } from 'react-icons/md';
import ChoosenButtons from './ChoosenButtons';

import '../../index.css'
function Sidebar() {
  return (
    <section className="h-[calc(100vh-8rem)] w-85 overflow-y-auto overflow-x-hidden mt-3 bg-white ">

      <div className="fixed gap-39 bg-white flex justify-between text-sm text-blue-600 px-4">
        <div className='font-bold text-[18px]'>Sections</div>
        <div className="flex items-center gap-2 text-[18px]">
          <TfiReload color="black" size={15} />
          Reset
        </div>
      </div>

      <p className="text-[13px] text-gray-600 ml-4 mt-6">
        Click on a section below to edit the contents
      </p>

      <button className=" flex justify-between items-center border-2 w-[290px] h-10 shadow rounded ml-5 mt-2 px-3 hover:border-blue-600">
        <div className="flex items-center text-black">
          <PiCirclesFourThin size={20} className="mr-2" />
          Title and Description
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <TfiReload />
          <MdDelete size={20} />
        </div>
      </button>

      <div>
        <ChoosenButtons />
      </div>
    </section>
  );
}

export default Sidebar;
