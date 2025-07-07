import React, { useState } from 'react'
import Sidebar from './SidebarPanel/Sidebar'
import EditorPanel from './EditorPanel'
import PreviewPanel from './PreviewPanel'

function Main() {

  const [code, setCode] = useState(`# Hello, welcome to your README!\n\n## Start typing...`);
  return (
    <div className='flex h-screen w-screen gap-2'>
        <Sidebar />
        <EditorPanel code={code} setCode={setCode} />
        <PreviewPanel code={code}/>
    </div>
  )
}

export default Main