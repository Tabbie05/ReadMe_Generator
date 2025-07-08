import Editor from "@monaco-editor/react";
import { useState } from "react";
import PreviewPanel from "./PreviewPanel";

function EditorPanel() {
  const [code, setCode] = useState(`# Hello, welcome to your README!\n\n## Start typing...`);

  return (
    <div className="flex gap-4 items-start">
      <div>
        <div className="text-blue-600 text-[18px] font-bold mb-1 mt-3">Editor</div>
        <Editor
          value={code}
          onChange={(value) => setCode(value || '')}
          language="markdown"
          theme="vs-dark"
          height="450px"
          width="465px"
          options={{
            padding: { top: 10, bottom: 10 },
            minimap: { enabled: false },
          }}
        />
      </div>

      {/* Preview Panel */}
      <PreviewPanel code={code} />
    </div>
  );
}

export default EditorPanel;
