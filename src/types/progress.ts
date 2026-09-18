/** File reference within a lesson for the course player */
export interface LessonFile {
  id: string;
  name: string;
  path: string;
  type: "docx" | "pptx" | "pdf";
}

/** Lesson with its associated files */
export interface LessonWithFiles {
  id: string;
  title: string;
  files: LessonFile[];
}

/** Per-lesson progress stored in localStorage */
export interface LessonProgressData {
  completed: boolean;
  completedAt: string | null;
  viewedFiles: Record<string, boolean>;
}

/** Full course progress stored in localStorage */
export interface CourseProgressData {
  lessons: Record<string, LessonProgressData>;
  lastLessonIndex: number;
  lastFileIndex: number;
}
