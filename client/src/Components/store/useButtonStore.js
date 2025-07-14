import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useButtonStore = create(
  persist(
    (set, get) => ({
      selectedButtons: [],
      availableButtons: [],
      selectedButton: null,
      readmeContent: '',
      
      // Initialize with title and description
      initializeButtons: (sections) => {
        const { selectedButtons } = get();
        const selectedIds = selectedButtons.map(btn => btn.id);
        const available = sections.filter(section => !selectedIds.includes(section.id));
        
        // Add title and description if not already present
        if (selectedButtons.length === 0) {
          const titleSection = {
            id: 'title-description',
            name: 'Title and Description',
            content: '# Project Title\n\nA brief description of what this project does and who it\'s for'
          };
          set({ 
            selectedButtons: [titleSection],
            availableButtons: available,
            readmeContent: titleSection.content
          });
        } else {
          set({ availableButtons: available });
        }
      },
      
      addSelectedButton: (button) => {
        set((state) => {
          const newContent = state.readmeContent + '\n\n' + button.content;
          return {
            selectedButtons: [...state.selectedButtons, button],
            availableButtons: state.availableButtons.filter(btn => btn.id !== button.id),
            selectedButton: button,
            readmeContent: newContent.trim()
          };
        });
      },
      
      removeSelectedButton: (buttonId, originalSections) => {
        set((state) => {
          // Don't allow removing title and description
          if (buttonId === 'title-description') return state;
          
          const buttonToRemove = state.selectedButtons.find(btn => btn.id === buttonId);
          if (!buttonToRemove) return state;
          
          const originalButton = originalSections.find(section => section.id === buttonId);
          const newSelectedButtons = state.selectedButtons.filter(btn => btn.id !== buttonId);
          
          const newContent = newSelectedButtons
            .map(btn => btn.content)
            .join('\n\n');
          
          return {
            selectedButtons: newSelectedButtons,
            availableButtons: [...state.availableButtons, originalButton],
            selectedButton: state.selectedButton?.id === buttonId ? null : state.selectedButton,
            readmeContent: newContent
          };
        });
      },
      
      setSelectedButton: (button) => {
        set({ selectedButton: button });
      },
      
      updateReadmeContent: (newContent) => {
        set({ readmeContent: newContent });
      },
      
      // 🎯 NEW: Reorder sections
      reorderSections: (newOrder) => {
        set((state) => {
          const newContent = newOrder
            .map(btn => btn.content)
            .join('\n\n');
          
          return {
            selectedButtons: newOrder,
            readmeContent: newContent
          };
        });
      },
      
      resetButtons: (originalSections) => {
        const titleSection = {
          id: 'title-description',
          name: 'Title and Description',
          content: '# Project Title\n\nA brief description of what this project does and who it\'s for'
        };
        
        set({
          selectedButtons: [titleSection],
          availableButtons: originalSections,
          selectedButton: null,
          readmeContent: titleSection.content
        });
      }
    }),
    {
      name: 'button-storage',
      partialize: (state) => ({
        selectedButtons: state.selectedButtons,
        selectedButton: state.selectedButton,
        readmeContent: state.readmeContent
      })
    }
  )
);
