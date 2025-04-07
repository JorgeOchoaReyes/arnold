import React from "react";

export default function PdfWindow() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <iframe
        src="/resume.pdf"
        className="h-full w-full border-0"
        title="PDF Viewer"
      ></iframe>
    </div>
  );
}