import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils";
import type { Course } from "@/types/course";

interface StudentDashboardProps {
  user: { name?: string | null; rank?: string | null };
  courses: Course[];
}

export function StudentDashboard({ user, courses }: StudentDashboardProps) {
  const firstCourse = courses[0];

  return (
    <div className="space-y-12">
      {/* ═══════ Hero Banner with Aviation Background ═══════ */}
      <header className="relative rounded-[28px] overflow-hidden min-h-[260px] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/training-simulator.png"
            alt="Naval aviation training center"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>
        {/* Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-teal/40 to-transparent" />

        <div className="relative z-20 p-8 md:p-10 w-full">
          <p className="text-caption-uppercase uppercase text-brand-ochre tracking-[0.2em] font-semibold mb-2">
            Cadet Status: Active
          </p>
          <h1 className="font-display text-display-lg text-white drop-shadow-md">
            Welcome back, {user.name?.split(" ")[0] ?? "Cadet"}.
          </h1>
          <p className="text-body-md text-white/70 mt-2 max-w-2xl">
            Your training dashboard is ready. Browse your courses, test your
            knowledge, or start a conversation with your AI flight assistant.
          </p>
        </div>
      </header>

      {/* ═══════ Bento Grid ═══════ */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Courses Count — Peach (col-span-4) */}
        <div className="md:col-span-5 lg:col-span-4 bg-brand-peach rounded-[24px] p-8 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-title-lg font-semibold text-ink mb-1">
              Enrolled Courses
            </h3>
            <p className="text-body-md text-ink/70">Active training modules</p>
          </div>
          <div className="relative z-10 mt-6">
            <span className="font-display text-display-xl text-ink">
              {courses.length}
            </span>
            <span className="text-title-md text-ink/80 ml-2">
              {courses.length === 1 ? "course" : "courses"}
            </span>
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
        </div>

        {/* Next Course — with Aviation Image (col-span-8) */}
        <div className="md:col-span-7 lg:col-span-8 rounded-[24px] min-h-[220px] relative overflow-hidden group">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/cockpit-view.png"
              alt="Fighter jet cockpit"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-teal/90 via-brand-teal/75 to-brand-teal/50" />

          <div className="relative z-20 p-8 flex flex-col justify-between h-full text-white">
            <div>
              <Badge variant="ghost" className="mb-4">
                {firstCourse ? "Continue Learning" : "Get Started"}
              </Badge>
              <h3 className="font-display text-display-sm text-white mb-2">
                {firstCourse?.title ?? "No courses yet"}
              </h3>
              <p className="text-body-md text-white/80 max-w-md">
                {firstCourse?.description ??
                  "Browse available courses to begin your training journey."}
              </p>
            </div>
            <div className="mt-6">
              <Link href={firstCourse ? `/courses/${firstCourse.id}` : "/courses"}>
                <Button variant="on-color" className="gap-2">
                  {firstCourse ? "Resume Course" : "Browse Courses"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Rank — Lavender (col-span-4) */}
        <div className="md:col-span-4 bg-brand-lavender rounded-[24px] p-8 flex flex-col justify-between min-h-[200px] relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-title-lg font-semibold text-ink mb-1">
              Current Rank
            </h3>
            <p className="font-display text-display-md text-ink mt-4">
              {capitalize(user.rank)}
            </p>
          </div>
        </div>

        {/* Recent Quiz — with Navy Crew Image (col-span-4) */}
        <div className="md:col-span-4 rounded-[24px] min-h-[200px] relative overflow-hidden group">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/navy-crew-deck.png"
              alt="Navy crew on flight deck"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

          <div className="relative z-20 p-8 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-title-lg font-semibold text-white mb-1">
                Quizzes
              </h3>
              <p className="text-body-md text-white/80">
                Test your knowledge
              </p>
            </div>
            <div className="mt-6">
              <Link href="/quizzes">
                <Button variant="on-color" className="gap-2 w-full">
                  Take a Quiz
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions — Ochre (col-span-4) */}
        <div className="md:col-span-4 bg-brand-ochre rounded-[24px] p-8 flex flex-col justify-between min-h-[200px] relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-caption-uppercase uppercase font-semibold text-ink">
                Quick Actions
              </span>
            </div>
            <h3 className="text-title-lg font-semibold text-ink mb-2">
              AI Flight Assistant
            </h3>
            <p className="text-body-md text-ink/80">
              Ask questions about your course material.
            </p>
          </div>
          <div className="relative z-10 mt-6 flex flex-col gap-2">
            <Link href="/chat">
              <Button variant="primary" className="w-full gap-2">
                New Chat
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════ Recent Courses Section ═══════ */}
      {courses.length > 0 && (
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-display text-display-sm text-ink">
                Your Courses
              </h2>
              <p className="text-body-md text-surface-tint mt-1">
                Continue where you left off.
              </p>
            </div>
            <Link
              href="/courses"
              className="text-button font-semibold text-ink underline underline-offset-4 hover:text-surface-tint transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="bg-surface-card rounded-2xl border border-hairline overflow-hidden p-6 md:p-8">
            <div className="flex flex-col gap-4">
              {courses.slice(0, 4).map((course, index) => (
                <Link
                  key={course.id || index}
                  href={`/courses/${course.id}`}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-hairline hover:border-outline-variant transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-surface-tint group-hover:bg-brand-lavender group-hover:text-ink transition-colors font-display font-bold text-lg select-none">
                      {course.title?.charAt(0) ?? "—"}
                    </div>
                    <div>
                      <h4 className="text-title-md font-semibold text-ink">
                        {course.title}
                      </h4>
                      <p className="text-caption-uppercase uppercase text-surface-tint mt-1">
                        {capitalize(course.rank)}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-surface-tint group-hover:text-ink transition-colors hidden sm:block" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
