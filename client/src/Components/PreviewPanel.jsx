import React from "react";
import ReactMarkdown from "react-markdown";

function PreviewPanel({ code }) {
  return (
    <div>
       <div className="flex gap-4  text-gray-400 text-[18px] font-bold mt-4">
        <div className="hover:text-blue-600">Preview</div>
        <div className="hover:text-blue-600">Raw</div>
      </div>
    <section className="flex-1 overflow-y-scroll bg-white p-4 border-2 mt-1 h-[495px] w-[450px]">
      <ReactMarkdown>{code}</ReactMarkdown>
    </section>
    </div>
  );
}

export default PreviewPanel;
