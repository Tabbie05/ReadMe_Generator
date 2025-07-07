import Editor from "@monaco-editor/react";

function EditorPanel({ code, setCode }) {
  return (
    <section className="flex-1.5">
      <div className="text-blue-600 text-[18px] font-bold mt-4">Editor</div>
      <Editor
        className="mt-1"
        value={code}
        onChange={(value) => setCode(value)}
        language="markdown"
        theme="vs-dark"
        height="500px"
        width="530px"
        options={{
          padding: { top: 10, bottom: 10 }, 
          minimap: { enabled: false }, 
        }}
      />
    </section>
  );
}

export default EditorPanel;
