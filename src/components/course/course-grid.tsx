import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./course-card";
import type { Course } from "@/types/course";

interface CourseGridProps {
  courses: Course[];
  isInstructor?: boolean;
}

export function CourseGrid({ courses, isInstructor }: CourseGridProps) {
  const safeCourses = courses || [];
  if (safeCourses.length === 0) {
    return (
      <div className="bg-surface-card rounded-2xl border border-hairline p-12 text-center">
        <h3 className="font-display text-display-sm text-ink mb-2">
          No courses available
        </h3>
        <p className="text-body-md text-surface-tint mb-8 max-w-md mx-auto">
          {isInstructor
            ? "Create your first course to start training cadets."
            : "Check back soon — courses are being prepared for your rank."}
        </p>
        {isInstructor && (
          <Button asChild>
            <Link href="/courses/new">
              <Plus className="h-4 w-4" />
              Create Course
            </Link>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {safeCourses.map((course, i) => (
        <CourseCard key={course.id || i} course={course} index={i} />
      ))}
    </div>
  );
}
