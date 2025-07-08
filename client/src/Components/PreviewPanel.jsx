import React from "react";
import ReactMarkdown from "react-markdown";

function PreviewPanel({ code }) {
  return (
    <div>
     <div className="flex gap-5 mt-4">
       <div className="text-gray-400 text-[18px] font-bold mb-1">Preview</div>
       <div className="text-gray-400 text-[18px] font-bold mb-1">Raw</div>
     </div>
      <section className="overflow-y-scroll bg-white p-4 border-2 h-[448px] w-[440px] mr-2">
        <ReactMarkdown>{code}</ReactMarkdown>
      </section>
    </div>
  );
}

export default PreviewPanel;
