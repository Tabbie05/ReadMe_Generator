import React, { useState } from 'react';
import AllButtons from './AllButtons';
import { TfiReload } from 'react-icons/tfi';
import { PiCirclesFourThin } from 'react-icons/pi';
import { MdDelete, MdDragIndicator } from 'react-icons/md';
import { useButtonStore } from '../store/useButtonStore';
import { sections } from '../../Constants/App';

function ChoosenButtons() {
  const { 
    selectedButtons, 
    selectedButton, 
    setSelectedButton, 
    removeSelectedButton,
    readmeContent,
    reorderSections
  } = useButtonStore();

  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);

  const handleRemoveButton = (e, btnObj) => {
    e.stopPropagation();
    removeSelectedButton(btnObj.id, sections);
  };

  // 🎯 Drag and Drop handlers
  const handleDragStart = (e, item, index) => {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDraggedOver(index);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem && draggedItem.index !== dropIndex) {
      const newOrder = [...selectedButtons];
      const draggedButton = newOrder[draggedItem.index];
      
      // Remove from old position
      newOrder.splice(draggedItem.index, 1);
      // Insert at new position
      newOrder.splice(dropIndex, 0, draggedButton);
      
      reorderSections(newOrder);
    }
    
    setDraggedItem(null);
    setDraggedOver(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOver(null);
  };

  return (
    <section className="w-84 mt-6">
      {/* Progress */}
      <div className="ml-5 mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="text-sm font-medium text-blue-800">
          README Progress: {selectedButtons.length} sections added
        </div>
        <div className="text-xs text-blue-600 mt-1">
          {readmeContent.length} characters total
        </div>
      </div>

      {/* Selected Buttons with Drag & Drop */}
      <div className="space-y-2">
        {selectedButtons.map((items, index) => (
          <button
            key={items.id}
            draggable={items.id !== 'title-description'} // Title can't be dragged
            onDragStart={(e) => handleDragStart(e, items, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex justify-between items-center border-2 w-[290px] h-10 shadow rounded ml-5 px-3 hover:border-blue-600 transition-all duration-300 ease-in-out ${
              selectedButton?.id === items.id ? 'border-blue-600 bg-blue-50' : ''
            } ${
              draggedOver === index ? 'border-green-400 bg-green-50' : ''
            } ${
              draggedItem?.index === index ? 'opacity-50' : ''
            }`}
            onClick={() => setSelectedButton(items)}
          >
            <div className="flex items-center text-black">
              <span className="text-xs bg-gray-200 px-2 py-1 rounded mr-2">
                {index + 1}
              </span>
              <PiCirclesFourThin size={16} className="mr-2" />
              <span className="text-sm">{items.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              {items.id !== 'title-description' && (
                <>
                  <MdDragIndicator size={16} className="cursor-move" />
                  <MdDelete 
                    size={16} 
                    onClick={(e) => handleRemoveButton(e, items)}
                    className="cursor-pointer hover:text-red-600"
                  />
                </>
              )}
            </div>
          </button>
        ))}
      </div>

      <p className="text-[13px] text-gray-600 ml-4 mt-4">
        Click on a section below to add it to your README
      </p>

      <input
        placeholder="Search for a section"
        className="w-[290px] h-10 ml-5 p-2 shadow-lg border-2 mt-2 border-gray-600 rounded hover:border-blue-600"
      />

      <button className="font-bold w-[290px] h-10 ml-5 flex items-center justify-center gap-2 border-2 mt-2 rounded hover:border-blue-600">
        <div className="text-2xl relative -top-0.5 leading-none">+</div>
        Custom Section
      </button>

      <AllButtons />
    </section>
  );
}

export default ChoosenButtons;