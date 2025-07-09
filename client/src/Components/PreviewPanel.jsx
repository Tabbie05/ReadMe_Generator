import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import CopyButton from "./CopyButton";

function PreviewPanel({ value }) {
  return (
    <div>
      <section className="relative overflow-y-scroll bg-white p-4 border h-[448px] w-[440px] mr-2 rounded-lg">
        <div className="pt-1 markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          >
            {value}
          </ReactMarkdown>
        </div>
      </section>
    </div>
  );
}


export default PreviewPanel;
