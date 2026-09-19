import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { CoursePlayer } from "@/components/player/course-player";
import { api } from "@/lib/api-client";
import type { Course, Lesson } from "@/types/course";
import type { LessonWithContent, CourseProgressData } from "@/types/progress";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function LearnPage({ params }: PageProps) {
  const { courseId } = await params;

  let course: Course;
  let lessonsWithContent: LessonWithContent[] = [];
  let initialProgress: CourseProgressData = {
    course_id: courseId,
    is_completed: false,
    lessons: {}
  };

  try {
    const [fetchedCourse, lessons, quizzes, progress] = await Promise.all([
      api.get<Course>(`/api/v1/courses/${courseId}`),
      api.get<Lesson[]>(`/api/v1/courses/${courseId}/lessons`),
      api.get<any[]>(`/api/v1/courses/${courseId}/quizzes`),
      api.get<CourseProgressData>(`/api/v1/courses/${courseId}/progress`).catch(() => initialProgress), // Default to empty if not found
    ]);
    course = fetchedCourse;
    initialProgress = progress;

    const lessonsWithContentPromises = lessons.map(async (lesson) => {
      const files = await api.get<any[]>(`/api/v1/lessons/${lesson.id}/files`);
      // Find quiz for this lesson
      const quiz = quizzes.find((q) => q.lesson_id === lesson.id) || null;
      return { ...lesson, files, quiz } as LessonWithContent;
    });
    lessonsWithContent = await Promise.all(lessonsWithContentPromises);
  } catch (e) {
    console.error("Failed to fetch data for learn page:", e);
    notFound();
  }

  return (
    <div className="h-[calc(100vh-4rem)] -mx-6 -my-6 flex flex-col font-sans bg-[#f3f4f6] p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 px-2 shrink-0">
        <Link
          href={`/courses/${courseId}`}
          className="inline-flex items-center gap-2 text-[20px] font-bold text-gray-900 tracking-tight hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Course
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-[13px] text-gray-500">
            {course.title}
          </span>
        </div>
      </div>

      {/* Big white container — course player fills this */}
      <CoursePlayer courseId={courseId} lessons={lessonsWithContent} initialProgress={initialProgress} />
    </div>
  );
}
