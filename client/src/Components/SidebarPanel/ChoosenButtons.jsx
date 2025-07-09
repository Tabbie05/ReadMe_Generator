// ChoosenButtons.jsx
import React, { useState } from 'react';
import AllButtons from './AllButtons';
import { TfiReload } from 'react-icons/tfi';
import { PiCirclesFourThin } from 'react-icons/pi';
import { MdDelete } from 'react-icons/md';
import { useButtonContext } from '../ContextApi/ButtonContext';


function ChoosenButtons() {
  const [buttonsFromChild, setButtonsFromChild] = useState([]);
  const { setSelectedButton } = useButtonContext();
  const handleChildButton = (bttnObj) => {
    setButtonsFromChild((prev) => [...prev, bttnObj]);
    setSelectedButton(bttnObj);
  };

  const handleFromChoosen = (btnObj) => {
    setButtonsFromChild((prev) => prev.filter((btn) => btn.id !== btnObj.id));
  };

  return (
    <section className="w-84 mt-6">
      {buttonsFromChild.map((items) => (
        <button
          key={items.id}
          className="flex justify-between items-center border-2 w-[290px] h-10 shadow rounded ml-5 mt-2 px-3 hover:border-blue-600 transition-all duration-300 ease-in-out animate-fade-slide"
          onClick={() => setSelectedButton(items)} // click to update editor
        >
          <div className="flex items-center text-black">
            <PiCirclesFourThin size={20} className="mr-2" />
            {items.name}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <TfiReload />
            <MdDelete size={20} onClick={() => handleFromChoosen(items)} />
          </div>
        </button>
      ))}

      <p className="text-[13px] text-gray-600 ml-4 mt-4">
        Click on a section below to add it to your readme
      </p>

      <input
        placeholder="Search for a section"
        className="w-[290px] h-10 ml-5 p-2 shadow-lg border-2 mt-2 border-gray-600 rounded hover:border-blue-600"
      />

      <button className="font-bold w-[290px] h-10 ml-5 flex items-center justify-center gap-2 border-2 mt-2 rounded hover:border-blue-600">
        <div className="text-2xl relative -top-0.5 leading-none">+</div>
        Custom Section
      </button>

      <AllButtons onSendButton={handleChildButton} />
    </section>
  );
}

export default ChoosenButtons;
