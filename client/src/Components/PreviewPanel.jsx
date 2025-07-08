import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; 
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

function PreviewPanel({ value }) {
  return (
    <div>
      <div className="flex gap-5 mt-3">
        <div className="text-gray-400 text-[18px] font-bold mb-1">Preview</div>
        <div className="text-gray-400 text-[18px] font-bold mb-1">Raw</div>
      </div>
      <section className="markdown overflow-y-scroll bg-white p-4 border-1 h-[448px] w-[440px] mr-2 rounded-lg">
        <ReactMarkdown  remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}>{value}</ReactMarkdown>
      </section>
    </div>
  );
}

export default PreviewPanel;
