"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Presentation,
  FileType,
  Check,
  Play,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LessonWithFiles, LessonFile } from "@/types/progress";

interface LessonSidebarProps {
  lessons: LessonWithFiles[];
  currentLessonIdx: number;
  currentFileIdx: number;
  isLessonComplete: (lessonId: string) => boolean;
  isFileViewed: (lessonId: string, fileId: string) => boolean;
  percentage: number;
  completedCount: number;
  onFileSelect: (lessonIdx: number, fileIdx: number) => void;
}

const FILE_TYPE_ICON: Record<string, typeof FileText> = {
  docx: FileText,
  pdf: FileType,
  pptx: Presentation,
};

const FILE_TYPE_COLOR: Record<string, string> = {
  docx: "text-blue-500",
  pdf: "text-red-500",
  pptx: "text-orange-500",
};

export function LessonSidebar({
  lessons,
  currentLessonIdx,
  currentFileIdx,
  isLessonComplete,
  isFileViewed,
  percentage,
  completedCount,
  onFileSelect,
}: LessonSidebarProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    // Auto-expand current lesson
    const initial = new Set<string>();
    if (lessons[currentLessonIdx]) {
      initial.add(lessons[currentLessonIdx].id);
    }
    return initial;
  });

  const toggleExpand = (lessonId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  // Auto-expand current lesson when it changes
  const currentLesson = lessons[currentLessonIdx];
  if (currentLesson && !expandedIds.has(currentLesson.id)) {
    setExpandedIds((prev) => new Set([...prev, currentLesson.id]));
  }

  return (
    <div className="w-[300px] shrink-0 border-l border-gray-200 flex flex-col bg-gray-50/30">
      {/* Progress Header */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-[13px] font-semibold text-gray-900">
            Course Progress
          </h3>
          <span className="text-[12px] font-bold text-blue-600">
            {percentage}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-[11px] text-gray-500">
          {completedCount} of {lessons.length} lessons complete
        </p>
      </div>

      {/* Lesson List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {lessons.map((lesson, lessonIdx) => {
          const isExpanded = expandedIds.has(lesson.id);
          const isCurrent = lessonIdx === currentLessonIdx;
          const isComplete = isLessonComplete(lesson.id);

          return (
            <div key={lesson.id} className="border-b border-gray-100 last:border-b-0">
              {/* Lesson Header */}
              <button
                onClick={() => toggleExpand(lesson.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors",
                  isCurrent
                    ? "bg-blue-50/50"
                    : "hover:bg-gray-50",
                )}
              >
                {/* Status icon */}
                <div className="shrink-0">
                  {isComplete ? (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Play className="w-3 h-3 text-white ml-0.5" fill="white" />
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" strokeWidth={1.5} />
                  )}
                </div>

                {/* Lesson info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-[13px] font-semibold truncate",
                      isCurrent ? "text-blue-700" : isComplete ? "text-gray-500" : "text-gray-900",
                    )}
                  >
                    Lesson {lessonIdx + 1}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {lesson.title}
                  </p>
                </div>

                {/* Expand arrow */}
                <div className="shrink-0 text-gray-400">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Expanded file list */}
              {isExpanded && (
                <div className="pb-2 animate-in slide-in-from-top-1 duration-200">
                  {lesson.files.map((file, fileIdx) => {
                    const isCurrentFile =
                      lessonIdx === currentLessonIdx &&
                      fileIdx === currentFileIdx;
                    const isViewed = isFileViewed(lesson.id, file.id);
                    const Icon = FILE_TYPE_ICON[file.file_type] ?? FileText;

                    return (
                      <button
                        key={file.id}
                        onClick={() => onFileSelect(lessonIdx, fileIdx)}
                        className={cn(
                          "w-full flex items-center gap-2.5 pl-12 pr-5 py-2 text-left transition-all",
                          isCurrentFile
                            ? "bg-blue-50 border-l-2 border-blue-500"
                            : "hover:bg-gray-50 border-l-2 border-transparent",
                        )}
                      >
                        {/* File status */}
                        {isCurrentFile ? (
                          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                            <Play className="w-2.5 h-2.5 text-white ml-[1px]" fill="white" />
                          </div>
                        ) : isViewed ? (
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </div>
                        ) : (
                          <Circle className="w-4 h-4 text-gray-300 shrink-0" strokeWidth={1.5} />
                        )}

                        {/* File icon + name */}
                        <Icon
                          className={cn(
                            "w-3.5 h-3.5 shrink-0",
                            FILE_TYPE_COLOR[file.file_type] ?? "text-gray-400",
                          )}
                        />
                        <span
                          className={cn(
                            "text-[12px] truncate",
                            isCurrentFile
                              ? "font-semibold text-blue-700"
                              : isViewed
                                ? "text-gray-500"
                                : "text-gray-700",
                          )}
                        >
                          {file.file_name}
                        </span>

                        {/* Type badge */}
                        <span className="ml-auto text-[10px] font-medium text-gray-400 uppercase shrink-0">
                          {file.file_type}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
