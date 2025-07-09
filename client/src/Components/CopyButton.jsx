import React, { useState } from "react";
import { BsCopy } from "react-icons/bs";
import { TiTick } from "react-icons/ti";

function CopyButton({ textToCopy, className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm transition-all duration-300 ease-in-out ${className}`}
    >
      {copied ? (
        <>
          <TiTick />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <BsCopy />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

export default CopyButton;
