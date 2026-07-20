import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { api } from "@/lib/api-client";
import { CourseGrid } from "@/components/course/course-grid";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types/course";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function CoursesPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const isInstructor = session.user.role === "instructor";
  let courses: Course[] = [];

  try {
    courses = await api.get<Course[]>("/api/v1/courses");
  } catch {
    // API unreachable
  }

  return (
    <div>
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="font-display text-display-lg text-ink mb-4">
            Flight Curriculum
          </h1>
          <p className="text-body-md text-surface-tint max-w-2xl">
            {isInstructor
              ? "Manage your training modules. Create, edit, and organize course content."
              : "Master the skies with our comprehensive training modules. Select a course below to begin your briefing."}
          </p>
        </div>
        {isInstructor && (
          <Button asChild className="shrink-0">
            <Link href="/courses/new">
              <Plus className="h-4 w-4" />
              New Course
            </Link>
          </Button>
        )}
      </header>

      <CourseGrid courses={courses} isInstructor={isInstructor} />
    </div>
  );
}
