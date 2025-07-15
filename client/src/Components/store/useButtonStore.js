import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useButtonStore = create(
  persist(
    (set, get) => ({
      selectedButtons: [],
      availableButtons: [],
      selectedButton: null,
      readmeContent: '',
      customSections: [],
      
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
      
      // 🎯 Add custom section
      addCustomSection: (customSection) => {
        set((state) => {
          const newContent = state.readmeContent + '\n\n' + customSection.content;
          return {
            selectedButtons: [...state.selectedButtons, customSection],
            customSections: [...state.customSections, customSection],
            selectedButton: customSection, // Auto-select the new custom section
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
          
          const newSelectedButtons = state.selectedButtons.filter(btn => btn.id !== buttonId);
          
          // If it's a custom section, remove it from customSections as well
          const newCustomSections = buttonToRemove.isCustom 
            ? state.customSections.filter(section => section.id !== buttonId)
            : state.customSections;
          
          // If it's a regular section, add it back to available buttons
          const originalButton = originalSections.find(section => section.id === buttonId);
          const newAvailableButtons = originalButton && !buttonToRemove.isCustom
            ? [...state.availableButtons, originalButton]
            : state.availableButtons;
          
          const newContent = newSelectedButtons
            .map(btn => btn.content)
            .join('\n\n');
          
          return {
            selectedButtons: newSelectedButtons,
            availableButtons: newAvailableButtons,
            customSections: newCustomSections,
            selectedButton: state.selectedButton?.id === buttonId ? null : state.selectedButton,
            readmeContent: newContent
          };
        });
      },
      
      setSelectedButton: (button) => {
        set({ selectedButton: button });
      },
      
      // 🎯 Update README content and sync with selected buttons
      updateReadmeContent: (newContent) => {
        set((state) => {
          // Update the content of the currently selected button if it exists
          if (state.selectedButton) {
            const updatedSelectedButtons = state.selectedButtons.map(btn => {
              if (btn.id === state.selectedButton.id) {
                // Extract the section content from the full README
                const sections = newContent.split('\n\n');
                const currentIndex = state.selectedButtons.findIndex(b => b.id === btn.id);
                const sectionContent = sections[currentIndex] || btn.content;
                
                return { ...btn, content: sectionContent };
              }
              return btn;
            });
            
            // Update custom sections if the selected button is custom
            const updatedCustomSections = state.selectedButton.isCustom
              ? state.customSections.map(section => {
                  if (section.id === state.selectedButton.id) {
                    const sections = newContent.split('\n\n');
                    const currentIndex = state.selectedButtons.findIndex(b => b.id === section.id);
                    const sectionContent = sections[currentIndex] || section.content;
                    return { ...section, content: sectionContent };
                  }
                  return section;
                })
              : state.customSections;
            
            return {
              selectedButtons: updatedSelectedButtons,
              customSections: updatedCustomSections,
              readmeContent: newContent
            };
          }
          
          return { readmeContent: newContent };
        });
      },
      
      // 🎯 Reorder sections
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
      
      // 🎯 Update specific section content
      updateSectionContent: (sectionId, newContent) => {
        set((state) => {
          const updatedSelectedButtons = state.selectedButtons.map(btn => 
            btn.id === sectionId ? { ...btn, content: newContent } : btn
          );
          
          const updatedCustomSections = state.customSections.map(section => 
            section.id === sectionId ? { ...section, content: newContent } : section
          );
          
          const fullReadmeContent = updatedSelectedButtons
            .map(btn => btn.content)
            .join('\n\n');
          
          return {
            selectedButtons: updatedSelectedButtons,
            customSections: updatedCustomSections,
            readmeContent: fullReadmeContent
          };
        });
      },
      
      // 🎯 Reset everything
      resetButtons: (originalSections) => {
        const titleSection = {
          id: 'title-description',
          name: 'Title and Description',
          content: '# Project Title\n\nA brief description of what this project does and who it\'s for'
        };
        
        set({
          selectedButtons: [titleSection],
          availableButtons: originalSections,
          customSections: [],
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
        readmeContent: state.readmeContent,
        customSections: state.customSections
      })
    }
  )
);