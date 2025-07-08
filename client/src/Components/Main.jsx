import React, { useState } from 'react'
import Sidebar from './SidebarPanel/Sidebar'
import EditorPanel from './EditorPanel'
import { ButtonProvider } from './ButtonContext'


function Main() {
  return (
    <div className='flex  h-screen w-screen gap-2'>
       <ButtonProvider>
        <Sidebar />
        <EditorPanel />
       </ButtonProvider>
        
    </div>
  )
}

export default Main 