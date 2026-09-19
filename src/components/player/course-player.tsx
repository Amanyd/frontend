"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocViewer } from "./doc-viewer";
import { QuizViewer } from "./quiz-viewer";
import { CertificateViewer } from "./certificate-viewer";
import { LessonSidebar } from "./lesson-sidebar";
import { useProgress } from "@/hooks/use-progress";
import type { LessonWithContent } from "@/types/progress";

interface CoursePlayerProps {
  courseId: string;
  lessons: LessonWithContent[];
  initialLessonIdx?: number;
  initialFileIdx?: number;
}

export function CoursePlayer({
  courseId,
  lessons,
  initialProgress,
  initialLessonIdx = 0,
  initialFileIdx = 0,
}: CoursePlayerProps & { initialProgress: any }) {
  const {
    markFileViewed,
    markLessonComplete,
    markCourseComplete,
    isLessonComplete,
    isFileViewed,
    isCourseComplete,
    completedCount,
    percentage,
  } = useProgress(courseId, lessons.length, initialProgress);

  const [currentLessonIdx, setCurrentLessonIdx] = useStateWithCallback(initialLessonIdx);
  const [currentFileIdx, setCurrentFileIdx] = useStateWithCallback(initialFileIdx);
  const [viewState, setViewState] = useState<"file" | "quiz" | "certificate">("file");

  const currentLesson = lessons[currentLessonIdx];
  const currentFile = currentLesson?.files?.[currentFileIdx];
  const totalFilesInLesson = currentLesson?.files?.length ?? 0;
  const hasQuiz = !!currentLesson?.quiz;

  // Mark file as viewed when navigating to it
  useEffect(() => {
    if (viewState === "file" && currentLesson && currentFile) {
      markFileViewed(currentLesson.id, currentFile.id);
    }
  }, [
    currentLessonIdx,
    currentFileIdx,
    viewState,
    currentLesson,
    currentFile,
    markFileViewed,
  ]);

  const canGoPrev = currentFileIdx > 0 || currentLessonIdx > 0 || viewState !== "file";
  const canGoNext =
    (viewState === "file" && (currentFileIdx < totalFilesInLesson - 1 || hasQuiz)) ||
    (viewState === "quiz" && currentLessonIdx < lessons.length - 1) ||
    (viewState === "file" && !hasQuiz && currentLessonIdx < lessons.length - 1);

  const isLastItemInLesson = (viewState === "file" && !hasQuiz && currentFileIdx === totalFilesInLesson - 1) || viewState === "quiz";
  const isCurrentLessonComplete = currentLesson
    ? isLessonComplete(currentLesson.id)
    : false;

  const goNext = useCallback(() => {
    if (viewState === "file") {
      if (currentFileIdx < totalFilesInLesson - 1) {
        setCurrentFileIdx(currentFileIdx + 1);
      } else if (hasQuiz) {
        setViewState("quiz");
      } else if (currentLessonIdx < lessons.length - 1) {
        setCurrentLessonIdx(currentLessonIdx + 1);
        setCurrentFileIdx(0);
        setViewState("file");
      } else {
        setViewState("certificate");
      }
    } else if (viewState === "quiz") {
      if (currentLessonIdx < lessons.length - 1) {
        setCurrentLessonIdx(currentLessonIdx + 1);
        setCurrentFileIdx(0);
        setViewState("file");
      } else {
        setViewState("certificate");
      }
    }
  }, [
    viewState,
    currentFileIdx,
    totalFilesInLesson,
    hasQuiz,
    currentLessonIdx,
    lessons.length,
    setCurrentFileIdx,
    setCurrentLessonIdx,
  ]);

  const goPrev = useCallback(() => {
    if (viewState === "certificate") {
      setViewState(lessons[lessons.length - 1].quiz ? "quiz" : "file");
      setCurrentLessonIdx(lessons.length - 1);
      setCurrentFileIdx(lessons[lessons.length - 1].files.length - 1);
    } else if (viewState === "quiz") {
      setViewState("file");
      setCurrentFileIdx(totalFilesInLesson - 1);
    } else if (currentFileIdx > 0) {
      setCurrentFileIdx(currentFileIdx - 1);
    } else if (currentLessonIdx > 0) {
      const prevLesson = lessons[currentLessonIdx - 1];
      setCurrentLessonIdx(currentLessonIdx - 1);
      if (prevLesson.quiz) {
        setViewState("quiz");
      } else {
        setCurrentFileIdx(prevLesson.files.length - 1);
      }
    }
  }, [
    viewState,
    currentFileIdx,
    currentLessonIdx,
    lessons,
    totalFilesInLesson,
    setCurrentFileIdx,
    setCurrentLessonIdx,
  ]);

  const goToFile = useCallback(
    (lessonIdx: number, fileIdx: number) => {
      setCurrentLessonIdx(lessonIdx);
      setCurrentFileIdx(fileIdx);
      setViewState("file");
    },
    [setCurrentLessonIdx, setCurrentFileIdx],
  );

  const goToQuiz = useCallback((lessonIdx: number) => {
    setCurrentLessonIdx(lessonIdx);
    setViewState("quiz");
  }, [setCurrentLessonIdx]);

  const goToCertificate = useCallback(() => {
    setViewState("certificate");
  }, []);

  const handleMarkComplete = useCallback(() => {
    if (currentLesson) {
      markLessonComplete(currentLesson.id);
      goNext();
    }
  }, [
    currentLesson,
    markLessonComplete,
    goNext
  ]);

  return (
    <div className="flex-1 min-h-0 bg-white border border-gray-200 rounded-xl overflow-hidden flex">
      {/* Left: Document Viewer */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* File Header */}
        {viewState === "file" && currentFile && (
          <div className="shrink-0 px-6 py-3 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[13px] font-semibold text-gray-900 truncate">
                {currentFile.file_name}
              </span>
              <span className="text-[11px] font-medium text-gray-400 uppercase px-1.5 py-0.5 bg-gray-100 rounded shrink-0">
                {currentFile.file_type}
              </span>
            </div>
            <span className="text-[12px] text-gray-500 shrink-0 ml-4">
              File {currentFileIdx + 1} of {totalFilesInLesson}
            </span>
          </div>
        )}

        {viewState === "quiz" && (
          <div className="shrink-0 px-6 py-3 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[13px] font-semibold text-gray-900 truncate">
                Lesson Quiz
              </span>
              <span className="text-[11px] font-medium text-purple-600 uppercase px-1.5 py-0.5 bg-purple-50 rounded shrink-0">
                QUIZ
              </span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-hidden bg-gray-50/50">
          {viewState === "file" && currentFile && (
            <DocViewer key={`${currentLesson.id}-${currentFile.id}`} file={currentFile} />
          )}
          {viewState === "quiz" && currentLesson.quiz && (
            <QuizViewer key={`quiz-${currentLesson.id}`} quiz={currentLesson.quiz} />
          )}
          {viewState === "certificate" && (
            <CertificateViewer courseId={courseId} onComplete={markCourseComplete} isCompleted={isCourseComplete} />
          )}
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
            {isLastItemInLesson && !isCurrentLessonComplete && (
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
        viewState={viewState}
        isLessonComplete={isLessonComplete}
        isFileViewed={isFileViewed}
        percentage={percentage}
        completedCount={completedCount}
        onFileSelect={goToFile}
        onQuizSelect={goToQuiz}
        onCertificateSelect={goToCertificate}
      />
    </div>
  );
}

// Simple useState wrapper that returns a stable setter
function useStateWithCallback<T>(initial: T): [T, (val: T) => void] {
  const [state, setState] = useState(initial);
  return [state, setState];
}
