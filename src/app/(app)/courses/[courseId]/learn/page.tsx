import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { CoursePlayer } from "@/components/player/course-player";
import { api } from "@/lib/api-client";
import type { Course, Lesson } from "@/types/course";
import type { LessonWithFiles } from "@/types/progress";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function LearnPage({ params }: PageProps) {
  const { courseId } = await params;

  let course: Course;
  let lessonsWithFiles: LessonWithFiles[] = [];

  try {
    const [fetchedCourse, lessons] = await Promise.all([
      api.get<Course>(`/api/v1/courses/${courseId}`),
      api.get<Lesson[]>(`/api/v1/courses/${courseId}/lessons`),
    ]);
    course = fetchedCourse;

    const lessonsWithFilesPromises = lessons.map(async (lesson) => {
      const files = await api.get<any[]>(`/api/v1/lessons/${lesson.id}/files`);
      return { ...lesson, files } as LessonWithFiles;
    });
    lessonsWithFiles = await Promise.all(lessonsWithFilesPromises);
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
      <CoursePlayer courseId={courseId} lessons={lessonsWithFiles} />
    </div>
  );
}
