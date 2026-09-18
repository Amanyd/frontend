"use client";

interface PdfViewerProps {
  filePath: string;
}

export function PdfViewer({ filePath }: PdfViewerProps) {
  return (
    <div className="h-full w-full animate-in fade-in duration-500">
      <iframe
        src={filePath}
        className="w-full h-full border-0 rounded-sm"
        title="PDF Viewer"
      />
    </div>
  );
}
