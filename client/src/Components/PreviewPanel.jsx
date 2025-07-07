import React from 'react';
import ReactMarkdown from 'react-markdown';

function PreviewPanel({ code }) {
  return (
    <section className="flex-1 overflow-y-scroll bg-white p-6">
      <ReactMarkdown>{code}</ReactMarkdown>
    </section>
  );
}

export default PreviewPanel;
