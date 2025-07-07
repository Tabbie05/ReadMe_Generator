import React from "react";
import ReactMarkdown from "react-markdown";

function PreviewPanel({ code }) {
  return (
    <div>
       <div className="flex gap-4 text-blue-600 text-[18px] font-bold mt-4">
        <div>Preview</div>
        <div>Raw</div>
      </div>
    <section className="flex-1 overflow-y-scroll bg-white p-4 border-2 mt-1 h-[495px] w-[450px]">
      <ReactMarkdown>{code}</ReactMarkdown>
    </section>
    </div>
  );
}

export default PreviewPanel;
