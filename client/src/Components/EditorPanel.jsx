import React from 'react';
import Editor from '@monaco-editor/react';

function EditorPanel({ code, setCode }) {
  return (
    <section className="flex-1  mt-6">
      <Editor
        value={code}
        onChange={(value) => setCode(value)}
        language="markdown"
        theme="vs-dark"
        height="100%"
      />
    </section>
  );
}

export default EditorPanel;
