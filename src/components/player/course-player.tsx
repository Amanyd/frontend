"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocViewer } from "./doc-viewer";
import { LessonSidebar } from "./lesson-sidebar";
import { useProgress } from "@/hooks/use-progress";
import type { LessonWithFiles } from "@/types/progress";

interface CoursePlayerProps {
  courseId: string;
  lessons: LessonWithFiles[];
  initialLessonIdx?: number;
  initialFileIdx?: number;
}

export function CoursePlayer({
  courseId,
  lessons,
  initialLessonIdx = 0,
  initialFileIdx = 0,
}: CoursePlayerProps) {
  const {
    markFileViewed,
    markLessonComplete,
    updateLastPosition,
    isLessonComplete,
    isFileViewed,
    completedCount,
    percentage,
    lastLessonIndex,
    lastFileIndex,
  } = useProgress(courseId, lessons.length);

  // Use stored position if available, otherwise use initial
  const startLesson =
    lastLessonIndex < lessons.length ? lastLessonIndex : initialLessonIdx;
  const startFile =
    lessons[startLesson] &&
    lastFileIndex < lessons[startLesson].files.length
      ? lastFileIndex
      : initialFileIdx;

  const [currentLessonIdx, setCurrentLessonIdx] = useStateWithCallback(startLesson);
  const [currentFileIdx, setCurrentFileIdx] = useStateWithCallback(startFile);

  const currentLesson = lessons[currentLessonIdx];
  const currentFile = currentLesson?.files[currentFileIdx];
  const totalFilesInLesson = currentLesson?.files.length ?? 0;

  // Mark file as viewed when navigating to it
  useEffect(() => {
    if (currentLesson && currentFile) {
      markFileViewed(currentLesson.id, currentFile.id);
      updateLastPosition(currentLessonIdx, currentFileIdx);
    }
  }, [
    currentLessonIdx,
    currentFileIdx,
    currentLesson,
    currentFile,
    markFileViewed,
    updateLastPosition,
  ]);

  const canGoPrev = currentFileIdx > 0 || currentLessonIdx > 0;
  const canGoNext =
    currentFileIdx < totalFilesInLesson - 1 ||
    currentLessonIdx < lessons.length - 1;

  const isLastFileInLesson = currentFileIdx === totalFilesInLesson - 1;
  const isCurrentLessonComplete = currentLesson
    ? isLessonComplete(currentLesson.id)
    : false;

  const goNext = useCallback(() => {
    if (currentFileIdx < totalFilesInLesson - 1) {
      setCurrentFileIdx(currentFileIdx + 1);
    } else if (currentLessonIdx < lessons.length - 1) {
      setCurrentLessonIdx(currentLessonIdx + 1);
      setCurrentFileIdx(0);
    }
  }, [
    currentFileIdx,
    totalFilesInLesson,
    currentLessonIdx,
    lessons.length,
    setCurrentFileIdx,
    setCurrentLessonIdx,
  ]);

  const goPrev = useCallback(() => {
    if (currentFileIdx > 0) {
      setCurrentFileIdx(currentFileIdx - 1);
    } else if (currentLessonIdx > 0) {
      const prevLesson = lessons[currentLessonIdx - 1];
      setCurrentLessonIdx(currentLessonIdx - 1);
      setCurrentFileIdx(prevLesson.files.length - 1);
    }
  }, [
    currentFileIdx,
    currentLessonIdx,
    lessons,
    setCurrentFileIdx,
    setCurrentLessonIdx,
  ]);

  const goToFile = useCallback(
    (lessonIdx: number, fileIdx: number) => {
      setCurrentLessonIdx(lessonIdx);
      setCurrentFileIdx(fileIdx);
    },
    [setCurrentLessonIdx, setCurrentFileIdx],
  );

  const handleMarkComplete = useCallback(() => {
    if (currentLesson) {
      markLessonComplete(currentLesson.id);
      // Auto-advance to next lesson if available
      if (currentLessonIdx < lessons.length - 1) {
        setCurrentLessonIdx(currentLessonIdx + 1);
        setCurrentFileIdx(0);
      }
    }
  }, [
    currentLesson,
    currentLessonIdx,
    lessons.length,
    markLessonComplete,
    setCurrentLessonIdx,
    setCurrentFileIdx,
  ]);

  if (!currentLesson || !currentFile) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-[14px]">
        No content available
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 bg-white border border-gray-200 rounded-xl overflow-hidden flex">
      {/* Left: Document Viewer */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* File Header */}
        <div className="shrink-0 px-6 py-3 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[13px] font-semibold text-gray-900 truncate">
              {currentFile.name}
            </span>
            <span className="text-[11px] font-medium text-gray-400 uppercase px-1.5 py-0.5 bg-gray-100 rounded shrink-0">
              {currentFile.type}
            </span>
          </div>
          <span className="text-[12px] text-gray-500 shrink-0 ml-4">
            File {currentFileIdx + 1} of {totalFilesInLesson}
          </span>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-hidden" key={`${currentLesson.id}-${currentFile.id}`}>
          <DocViewer file={currentFile} />
        </div>

        {/* Bottom Navigation */}
        <div className="shrink-0 px-6 py-3 border-t border-gray-200 flex items-center justify-between bg-white">
          <button
            onClick={goPrev}
            disabled={!canGoPrev}
            className={cn(
              "flex items-center gap-1.5 text-[13px] font-medium rounded-lg px-3 py-1.5 transition-colors",
              canGoPrev
                ? "text-gray-700 hover:bg-gray-100"
                : "text-gray-300 cursor-not-allowed",
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {/* Center: Mark Complete / Lesson info */}
          <div className="flex items-center gap-3">
            {isLastFileInLesson && !isCurrentLessonComplete && (
              <button
                onClick={handleMarkComplete}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-[13px] font-medium rounded-lg transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark Lesson Complete
              </button>
            )}
            {isCurrentLessonComplete && (
              <span className="flex items-center gap-1.5 text-[12px] font-medium text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                Lesson Complete
              </span>
            )}
          </div>

          <button
            onClick={goNext}
            disabled={!canGoNext}
            className={cn(
              "flex items-center gap-1.5 text-[13px] font-medium rounded-lg px-3 py-1.5 transition-colors",
              canGoNext
                ? "text-gray-700 hover:bg-gray-100"
                : "text-gray-300 cursor-not-allowed",
            )}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right: Lesson Sidebar */}
      <LessonSidebar
        lessons={lessons}
        currentLessonIdx={currentLessonIdx}
        currentFileIdx={currentFileIdx}
        isLessonComplete={isLessonComplete}
        isFileViewed={isFileViewed}
        percentage={percentage}
        completedCount={completedCount}
        onFileSelect={goToFile}
      />
    </div>
  );
}

// Simple useState wrapper that returns a stable setter
function useStateWithCallback<T>(initial: T): [T, (val: T) => void] {
  const [state, setState] = useState(initial);
  return [state, setState];
}
