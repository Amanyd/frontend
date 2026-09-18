"use client";

import { Download, Presentation } from "lucide-react";

interface PptxViewerProps {
  filePath: string;
  fileName: string;
}

export function PptxViewer({ filePath, fileName }: PptxViewerProps) {
  return (
    <div className="h-full w-full flex flex-col animate-in fade-in duration-500">
      {/* Try to embed via Google Docs viewer (works when online) */}
      <div className="flex-1 min-h-0 relative">
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(
            typeof window !== "undefined"
              ? window.location.origin + filePath
              : filePath,
          )}&embedded=true`}
          className="w-full h-full border-0"
          title={fileName}
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const fallback = target.nextElementSibling;
            if (fallback) (fallback as HTMLElement).style.display = "flex";
          }}
        />

        {/* Fallback for offline */}
        <div
          className="absolute inset-0 flex-col items-center justify-center gap-5 bg-gradient-to-b from-orange-50/40 to-white"
          style={{ display: "none" }}
        >
          <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center">
            <Presentation className="w-10 h-10 text-orange-500" />
          </div>
          <div className="text-center">
            <h3 className="text-[16px] font-semibold text-gray-900 mb-1">
              {fileName}
            </h3>
            <p className="text-[13px] text-gray-500 max-w-xs">
              PowerPoint presentations can be downloaded for viewing offline.
            </p>
          </div>
          <a
            href={filePath}
            download
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-medium rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Presentation
          </a>
        </div>
      </div>

      {/* Bottom download bar */}
      <div className="shrink-0 px-6 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2.5">
          <Presentation className="w-4 h-4 text-orange-500" />
          <span className="text-[13px] font-medium text-gray-700 truncate">
            {fileName}
          </span>
        </div>
        <a
          href={filePath}
          download
          className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </a>
      </div>
    </div>
  );
}
