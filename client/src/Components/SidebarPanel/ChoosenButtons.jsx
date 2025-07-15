import React, { useState } from 'react';
import AllButtons from './AllButtons';
import { TfiReload } from 'react-icons/tfi';
import { PiCirclesFourThin } from 'react-icons/pi';
import { MdDelete, MdDragIndicator, MdClose } from 'react-icons/md';
import { useButtonStore } from '../store/useButtonStore';
import { sections } from '../../Constants/App';

function ChoosenButtons() {
  const [find, setfind] = useState("")
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customName, setCustomName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  const { 
    selectedButtons, 
    selectedButton, 
    setSelectedButton, 
    removeSelectedButton,
    readmeContent,
    reorderSections,
    addCustomSection
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

  // 🎯 Custom Section handlers
  const handleCustomSectionClick = () => {
    setShowCustomModal(true);
  };

  const handleCustomSectionSubmit = (e) => {
    e.preventDefault();
    
    if (customName.trim()) {
      setIsCreating(true);
      
      // Create custom section with placeholder content
      const customSection = {
        id: `custom-${Date.now()}`,
        name: customName.trim(),
        content: `## ${customName.trim()}\n\nAdd your content here...`,
        isCustom: true
      };
      
      // Add to store
      addCustomSection(customSection);
      
      // Reset form and close modal
      setCustomName('');
      setShowCustomModal(false);
      setIsCreating(false);
    }
  };

  const handleModalClose = () => {
    setShowCustomModal(false);
    setCustomName('');
  };

  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  return (
    <section className="w-84 mt-3">
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
            draggable={items.id !== 'title-description'}
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
              <MdDragIndicator size={20} className="cursor-move" />
              <span className="truncate max-w-[150px] ml-2">{items.name}</span>
              {items.isCustom && (
                <span className="text-xs bg-blue-200 text-blue-800 px-1 py-0.5 rounded ml-2 flex-shrink-0">
                  Custom
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              {items.id !== 'title-description' && (
                <MdDelete 
                  size={20} 
                  onClick={(e) => handleRemoveButton(e, items)}
                  className="cursor-pointer hover:text-red-600 transition-colors"
                />
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
        className="w-[290px] h-10 ml-5 p-2 shadow-lg border-2 mt-2 border-gray-600 rounded hover:border-blue-600 focus:border-blue-600 focus:outline-none"
        value={find}
        onChange={(e) => setfind(e.target.value)}
      />

      <button 
        onClick={handleCustomSectionClick}
        className="font-bold w-[290px] h-10 ml-5 flex items-center justify-center gap-2 border-2 mt-2 rounded hover:border-blue-600 bg-gradient-to-r from-blue-50 to-blue-50 hover:from-blue-100 hover:to-blue-100 transition-all duration-200 border-blue-300"
      >
        <div className="text-2xl relative -top-0.5 leading-none text-blue-600">+</div>
        <span className="text-blue-700">Custom Section</span>
      </button>

      {/* Custom Section Modal */}
      {showCustomModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-xl w-[400px] max-w-md mx-4 transform transition-all">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Create Custom Section</h2>
                <p className="text-sm text-gray-500 mt-1">Add a personalized section to your README</p>
              </div>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <MdClose size={24} />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleCustomSectionSubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g., API Documentation, Screenshots, Contributing"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  maxLength={50}
                  autoFocus
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    This will create a section with heading "### {customName || 'Section Name'}"
                  </p>
                  <span className="text-xs text-gray-400">
                    {customName.length}/50
                  </span>
                </div>
              </div>
              
              {/* Preview */}
              {customName.trim() && (
                <div className="mb-6 p-3 bg-gray-50 rounded-lg border">
                  <p className="text-xs text-gray-600 mb-2">Preview:</p>
                  <div className="font-mono text-sm text-gray-800">
                    ## {customName.trim()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Add your content here...
                  </div>
                </div>
              )}
              
              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!customName.trim() || isCreating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    'Add Section'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AllButtons searchQuery={find} />
    </section>
  );
}

export default ChoosenButtons;