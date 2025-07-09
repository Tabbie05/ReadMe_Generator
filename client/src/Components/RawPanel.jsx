import React from "react";
import CopyButton from "./CopyButton";

function RawPanel({ value }) {
  return (
    <div>
      <section className="relative overflow-y-scroll bg-white p-3 border h-[448px] w-[440px] mr-2 rounded-lg">
    
        <CopyButton textToCopy={value} className="absolute top-2 right-2" />
        
        <pre className="whitespace-pre-wrap break-words text-sm">
          <code>{value}</code>
        </pre>
      </section>
    </div>
  );
}

export default RawPanel;
