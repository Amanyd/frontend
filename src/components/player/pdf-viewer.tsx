"use client";

interface PdfViewerProps {
  filePath: string;
}

export function PdfViewer({ filePath }: PdfViewerProps) {
  return (
    <div className="h-full w-full animate-in fade-in duration-500">
      <object
        data={filePath}
        type="application/pdf"
        className="w-full h-full border-0 rounded-sm"
      >
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p className="mb-2">Your browser does not support inline PDFs.</p>
          <a
            href={filePath}
            download
            className="text-blue-500 hover:underline font-medium"
          >
            Download PDF
          </a>
        </div>
      </object>
    </div>
  );
}
