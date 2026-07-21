import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import type { Course } from "@/types/course";
import type { AnalyticsOverview } from "@/types/analytics";

interface InstructorDashboardProps {
  user: { name?: string | null };
  overview: AnalyticsOverview | null;
  courses: Course[];
}

export function InstructorDashboard({
  user,
  overview,
  courses,
}: InstructorDashboardProps) {
  const safeCourses = courses || [];
  return (
    <div className="space-y-12">
      {/* ═══════ Hero Banner — Command Center Theme ═══════ */}
      <header className="relative rounded-[28px] overflow-hidden min-h-[280px] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/command-center.png"
            alt="Naval command center operations room"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>
        {/* Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-teal/30 to-transparent" />

        <div className="relative z-20 p-8 md:p-10 w-full">
          <p className="text-caption-uppercase uppercase text-brand-ochre tracking-[0.2em] font-semibold mb-2">
            Command Center
          </p>
          <h1 className="font-display text-display-lg text-white drop-shadow-md">
            Welcome, {user.name?.split(" ")[0] ?? "Instructor"}.
          </h1>
          <p className="text-body-md text-white/70 mt-2 max-w-2xl">
            Your training command overview. Monitor student progress, manage
            courses, and review quiz performance.
          </p>
        </div>
      </header>

      {/* ═══════ KPI Cards ═══════ */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Students — with Carrier Image */}
        <div className="rounded-[24px] min-h-[200px] relative overflow-hidden group">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/aircraft-carrier.png"
              alt="Aircraft carrier fleet"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-lavender/90 via-brand-lavender/70 to-brand-lavender/50" />

          <div className="relative z-20 p-8 flex flex-col justify-between h-full">
            <div>
              <p className="text-caption-uppercase uppercase text-ink/70 mb-1">
                Total Students
              </p>
              <h2 className="font-display text-display-sm text-ink">
                {overview?.total_students ?? 0}
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-button font-semibold text-ink">
                Enrolled across all courses
              </span>
            </div>
          </div>
        </div>

        {/* Total Courses — Mint */}
        <div className="bg-brand-mint rounded-[24px] p-8 flex flex-col justify-between min-h-[200px] relative overflow-hidden">
          <div>
            <p className="text-caption-uppercase uppercase text-ink/70 mb-1">
              Total Courses
            </p>
            <h2 className="font-display text-display-sm text-ink">
              {overview?.total_courses ?? 0}
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-button font-semibold text-ink">
              Active training modules
            </span>
          </div>
        </div>

        {/* Avg Quiz Score — with Helicopter Image */}
        <div className="rounded-[24px] min-h-[200px] relative overflow-hidden group">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/helicopter-formation.png"
              alt="Naval helicopter formation"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-peach/90 via-brand-peach/70 to-brand-peach/50" />

          <div className="relative z-20 p-8 flex flex-col justify-between h-full">
            <div>
              <p className="text-caption-uppercase uppercase text-ink/70 mb-1">
                Avg Quiz Score
              </p>
              <h2 className="font-display text-display-sm text-ink">
                {overview?.avg_score
                  ? `${Math.round(overview.avg_score)}%`
                  : "—"}
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-button font-semibold text-ink">
                Across all quizzes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Quick Action Banner ═══════ */}
      <section className="relative rounded-[24px] overflow-hidden min-h-[140px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/navy-jet-takeoff.png"
            alt="Fighter jet launching from carrier"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-brand-teal/80" />

        <div className="relative z-20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-display-sm text-white">
              Ready to deploy new content?
            </h3>
            <p className="text-body-md text-white/70 mt-1">
              Create courses, upload materials, and auto-generate quizzes.
            </p>
          </div>
          <Link href="/courses/new">
            <button className="bg-white text-ink h-12 px-8 rounded-xl text-button font-semibold hover:bg-brand-ochre transition-colors inline-flex items-center gap-2 shrink-0 shadow-lg">
              Create Course
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* ═══════ Your Courses Table ═══════ */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-title-lg font-semibold text-ink">
            Your Courses
          </h3>
          <Link
            href="/courses"
            className="text-button font-semibold text-ink underline underline-offset-4 hover:text-surface-tint transition-colors"
          >
            Manage All
          </Link>
        </div>

        {safeCourses.length === 0 ? (
          <div className="bg-surface-card rounded-2xl border border-hairline p-12 text-center">
            <p className="text-title-md font-semibold text-ink mb-2">
              No courses yet
            </p>
            <p className="text-body-md text-surface-tint mb-6">
              Create your first course to get started.
            </p>
            <Button asChild>
              <Link href="/courses">
                Create Course
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="bg-surface-card rounded-2xl border border-hairline overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {safeCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-semibold">
                      {course.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{capitalize(course.rank)}</Badge>
                    </TableCell>
                    <TableCell className="text-surface-tint">
                      {new Date(course.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/courses/${course.id}`}
                        className="text-button font-semibold text-ink hover:text-surface-tint transition-colors"
                      >
                        View →
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </div>
  );
}
