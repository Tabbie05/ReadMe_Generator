import Editor from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import PreviewPanel from "./PreviewPanel";
import RawPanel from "./RawPanel";
import { useButtonContext } from "./ContextApi/ButtonContext";

function EditorPanel() {
  const editorRef = useRef(null);
  const { selectedButton } = useButtonContext();

  const [value, setValue] = useState("");
  const [panelrender, setPanelRender] = useState("preview"); // default to preview

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
    <div className="flex gap-8 items-start">
      {/* Left Panel - Editor */}
      <section>
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
              wordWrap: "on",
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      </section>

      {/* Right Panel */}
      <section className="flex flex-col">
        {/* Toggle Buttons */}
        <div className="flex gap-5 mb-2 mt-3">
          <button
            className={`text-[18px] font-bold ${
              panelrender === "preview" ? "text-blue-600" : "text-gray-400"
            }`}
            onClick={() => setPanelRender("preview")}
          >
            Preview
          </button>
          <button
            className={`text-[18px] font-bold ${
              panelrender === "raw" ? "text-blue-600" : "text-gray-400"
            }`}
            onClick={() => setPanelRender("raw")}
          >
            Raw
          </button>
        </div>

        {/* Render Panel */}
        {panelrender === "preview" ? (
          <PreviewPanel value={value} />
        ) : (
          <RawPanel value={value} />
        )}
      </section>
    </div>
  );
}

export default EditorPanel;
