"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2, FileType } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure worker to load locally for offline support via Next.js bundler
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfViewerProps {
  filePath: string;
}

export function PdfViewer({ filePath }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="h-full w-full flex flex-col animate-in fade-in duration-500 bg-gray-100 overflow-hidden">
      {/* Viewer Area */}
      <div className="flex-1 min-h-0 relative overflow-y-auto overflow-x-hidden flex justify-center bg-gray-200/50 py-8">
        <Document
          file={filePath}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col gap-6 items-center w-full"
          loading={
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400 absolute inset-0">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-[13px] font-medium">Loading PDF…</span>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center h-full gap-3 text-red-400 absolute inset-0">
              <FileType className="w-8 h-8" />
              <span className="text-[13px] font-medium text-red-500">Failed to load PDF</span>
            </div>
          }
        >
          {Array.from(new Array(numPages || 0), (el, index) => (
            <div 
              key={`page_${index + 1}`} 
              className="shadow-xl bg-white relative max-w-full"
            >
              <Page 
                pageNumber={index + 1} 
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="max-w-full"
                width={800} // Set a fixed max width to prevent collapsing
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
