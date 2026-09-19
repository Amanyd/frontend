"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Loader2, FileType } from "lucide-react";
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
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="h-full w-full flex flex-col animate-in fade-in duration-500 bg-gray-100 overflow-hidden">
      {/* Top Control Bar */}
      <div className="shrink-0 px-4 py-2 border-b border-gray-200 flex items-center justify-between bg-white z-10 shadow-sm relative">
        <div className="flex items-center gap-1">
          <button 
            type="button"
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent rounded-md text-gray-600 transition-colors"
            title="Previous Page"
          >
             <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[12px] font-medium text-gray-600 px-2 select-none">
             Page {pageNumber} of {numPages || '-'}
          </span>
          <button 
            type="button"
            onClick={() => setPageNumber(Math.min(numPages || 1, pageNumber + 1))}
            disabled={pageNumber >= (numPages || 1)}
            className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent rounded-md text-gray-600 transition-colors"
            title="Next Page"
          >
             <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Viewer Area */}
      <div className="flex-1 min-h-0 relative overflow-y-auto overflow-x-auto flex justify-center bg-gray-200/50 py-6">
        <Document
          file={filePath}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col items-center justify-start h-full"
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
          <Page 
            pageNumber={pageNumber} 
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="shadow-xl bg-white pdf-page-container"
          />
        </Document>
      </div>
    </div>
  );
}
