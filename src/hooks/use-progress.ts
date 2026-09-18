"use client";

import { useState, useCallback, useEffect } from "react";
import type { CourseProgressData } from "@/types/progress";

const STORAGE_KEY = (courseId: string) => `aeromentor-progress-${courseId}`;

const EMPTY_PROGRESS: CourseProgressData = {
  lessons: {},
  lastLessonIndex: 0,
  lastFileIndex: 0,
};

function getStoredProgress(courseId: string): CourseProgressData {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY(courseId));
    if (stored) return JSON.parse(stored);
  } catch {
    /* corrupted data, reset */
  }
  return EMPTY_PROGRESS;
}

function saveProgress(courseId: string, data: CourseProgressData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY(courseId), JSON.stringify(data));
}

export function useProgress(courseId: string, totalLessons: number) {
  const [progress, setProgress] = useState<CourseProgressData>(() =>
    getStoredProgress(courseId),
  );

  // Persist every change
  useEffect(() => {
    saveProgress(courseId, progress);
  }, [courseId, progress]);

  const markFileViewed = useCallback((lessonId: string, fileId: string) => {
    setProgress((prev) => {
      const lesson = prev.lessons[lessonId] ?? {
        completed: false,
        completedAt: null,
        viewedFiles: {},
      };
      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...lesson,
            viewedFiles: { ...lesson.viewedFiles, [fileId]: true },
          },
        },
      };
    });
  }, []);

  const markLessonComplete = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const lesson = prev.lessons[lessonId] ?? {
        viewedFiles: {},
        completed: false,
        completedAt: null,
      };
      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...lesson,
            completed: true,
            completedAt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  const updateLastPosition = useCallback(
    (lessonIndex: number, fileIndex: number) => {
      setProgress((prev) => ({
        ...prev,
        lastLessonIndex: lessonIndex,
        lastFileIndex: fileIndex,
      }));
    },
    [],
  );

  const isLessonComplete = useCallback(
    (lessonId: string) => progress.lessons[lessonId]?.completed ?? false,
    [progress],
  );

  const isFileViewed = useCallback(
    (lessonId: string, fileId: string) =>
      progress.lessons[lessonId]?.viewedFiles[fileId] ?? false,
    [progress],
  );

  const completedCount = Object.values(progress.lessons).filter(
    (l) => l.completed,
  ).length;

  const percentage =
    totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0;

  return {
    progress,
    markFileViewed,
    markLessonComplete,
    updateLastPosition,
    isLessonComplete,
    isFileViewed,
    completedCount,
    percentage,
    lastLessonIndex: progress.lastLessonIndex,
    lastFileIndex: progress.lastFileIndex,
  };
}
