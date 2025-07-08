// EditorPanel.jsx
import Editor from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import { useButtonContext } from "./ButtonContext";
import PreviewPanel from "./PreviewPanel";

function EditorPanel() {
  const editorRef = useRef(null);
  const { selectedButton } = useButtonContext();

  const [value, setValue] = useState("");

  useEffect(() => {
    if (selectedButton) {
      setValue(selectedButton.content);
    }
  }, [selectedButton]);

  const handleOnChange = (newValue) => {
    setValue(newValue);
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="flex gap-4 items-start">
      <section >
        <div>
        <div className="text-blue-600 text-[18px] font-bold mb-1 mt-3">Editor</div>
        <Editor
          onMount={handleEditorDidMount}
          onChange={handleOnChange}
          language="markdown"
          theme="vs-dark"
          height="450px"
          width="465px"
          value={value}
          options={{
            padding: { top: 10, bottom: 10 },
            minimap: { enabled: false },
            wordWrap: 'on',           
            scrollBeyondLastLine: false,
          }}
        />
      </div>
      </section>
      <PreviewPanel value={value} />
    </div>
  );
}

export default EditorPanel;
