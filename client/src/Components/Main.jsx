import React, { useState } from 'react'
import Sidebar from './SidebarPanel/Sidebar'
import EditorPanel from './EditorPanel'


function Main() {
  return (
    <div className='flex  h-screen w-screen gap-2'>
        <Sidebar />
        <EditorPanel />
       
    </div>
  )
}

export default Main 