"use client";

import { DocxViewer } from "./docx-viewer";
import { PdfViewer } from "./pdf-viewer";
import { PptxViewer } from "./pptx-viewer";
import type { LessonFile } from "@/types/progress";

interface DocViewerProps {
  file: LessonFile;
}

export function DocViewer({ file }: DocViewerProps) {
  switch (file.type) {
    case "docx":
      return <DocxViewer filePath={file.path} />;
    case "pdf":
      return <PdfViewer filePath={file.path} />;
    case "pptx":
      return <PptxViewer filePath={file.path} fileName={file.name} />;
    default:
      return (
        <div className="flex items-center justify-center h-full text-gray-400 text-[14px]">
          Unsupported file type
        </div>
      );
  }
}
