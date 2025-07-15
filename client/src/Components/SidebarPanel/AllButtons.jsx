// AllButtons.jsx
import React, { useEffect } from 'react';
import { PiCirclesFourThin } from 'react-icons/pi';
import { sections } from '../../Constants/App';
import { useButtonStore } from '../store/useButtonStore';

function AllButtons({ searchQuery }) {
  const { availableButtons, addSelectedButton, initializeButtons } = useButtonStore();

  const filteredButtons = availableButtons.filter((button) =>
    button.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    initializeButtons(sections);
  }, [initializeButtons]);

  const handleSendButton = (btnObj) => {
    addSelectedButton(btnObj);
  };

  return (
    <div>
      {filteredButtons.map((items) => (
        <button
          key={items.id}
          onClick={() => handleSendButton(items)}
          className="flex justify-between items-center border-2 w-[290px] h-10 shadow rounded ml-5 mt-2 px-3 hover:border-blue-600"
        >
          <div className="flex items-center text-black">
            <PiCirclesFourThin size={20} className="mr-2" />
            {items.name}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
          </div>
        </button>
      ))}
      {filteredButtons.length === 0 && (
        <p className="ml-5 mt-2 text-sm text-gray-500">No matching sections found.</p>
      )}

    </div>
  );
}

export default AllButtons;