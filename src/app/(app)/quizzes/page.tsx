import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { CourseCard } from "@/components/course/course-card";
import { DifficultyBadge } from "@/components/quiz/difficulty-badge";
import { ArrowRight, CheckCircle2, HelpCircle, Loader2 } from "lucide-react";
import { capitalize, cn } from "@/lib/utils";
import type { Quiz } from "@/types/quiz";
import type { Course } from "@/types/course";

interface CourseQuizRow {
  course: Course;
  easyQuiz?: Quiz;
  mediumQuiz?: Quiz;
  hardQuiz?: Quiz;
}

export default async function QuizzesPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  let courses: Course[] = [];
  try {
    const fetchedCourses = await api.get<Course[]>("/api/v1/courses");
    courses = fetchedCourses || [];
  } catch {
    courses = [];
  }

  const courseRows: CourseQuizRow[] = [];

  for (const course of courses) {
    try {
      const quizzes = await api.get<Quiz[]>(
        `/api/v1/courses/${course.id}/quizzes`
      );
      // Filter out lesson quizzes; keep course-level comprehensive quizzes
      const courseQuizzes = (quizzes || []).filter((q) => !q.lesson_id);

      const easyQuiz = courseQuizzes.find((q) => q.difficulty === "easy");
      const mediumQuiz = courseQuizzes.find((q) => q.difficulty === "medium");
      const hardQuiz = courseQuizzes.find((q) => q.difficulty === "hard");

      courseRows.push({
        course,
        easyQuiz,
        mediumQuiz,
        hardQuiz,
      });
    } catch {
      courseRows.push({ course });
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)] -mx-6 -my-6 flex flex-col font-sans bg-[#f3f4f6] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">
            Assessments & Quizzes
          </h1>
          <p className="text-[13px] text-gray-500 mt-0.5">
            Course evaluations and topic assessments
          </p>
        </div>
      </div>

      {/* Main Giant White Container */}
      <div className="flex-1 min-h-0 bg-white border border-gray-200 rounded-xl overflow-y-auto p-8 scrollbar-hide">
        {courseRows.length === 0 ? (
          <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3 text-gray-400">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-[16px] font-bold text-gray-900 mb-1">
              No quizzes available
            </h3>
            <p className="text-[13px] text-gray-500 max-w-sm">
              Quizzes are generated automatically when course documents are uploaded.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {courseRows.map(({ course, easyQuiz, mediumQuiz, hardQuiz }, index) => (
              <div
                key={course.id}
                className="border border-gray-200 rounded-2xl p-5 bg-[#fafbfc]/60 hover:bg-[#fafbfc] transition-colors"
              >
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
                  {/* Left: Course Card (from courses page) */}
                  <div className="xl:col-span-4 lg:col-span-5 w-full max-w-sm">
                    <CourseCard course={course} index={index} />
                  </div>

                  {/* Right: 3 Difficulty Boxes (Easy, Medium, Hard) */}
                  <div className="xl:col-span-8 lg:col-span-7 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                      <span className="text-[13px] font-bold text-gray-800">
                        Course Assessments
                      </span>
                      <span className="text-[11px] text-gray-400 uppercase font-medium">
                        Tiered Evaluations
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                      {renderQuizBox("easy", easyQuiz)}
                      {renderQuizBox("medium", mediumQuiz)}
                      {renderQuizBox("hard", hardQuiz)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function renderQuizBox(difficulty: "easy" | "medium" | "hard", quiz?: Quiz) {
  if (!quiz) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between min-h-[170px] opacity-60">
        <div>
          <div className="flex items-center justify-between mb-3">
            <DifficultyBadge difficulty={difficulty} />
            <span className="text-[11px] text-gray-400 font-medium">—</span>
          </div>
          <p className="text-[13px] text-gray-400 mt-4">Not generated</p>
        </div>
        <button
          disabled
          className="w-full py-2 px-3 rounded-lg text-[13px] font-medium bg-gray-100 text-gray-400 cursor-not-allowed text-center"
        >
          Unavailable
        </button>
      </div>
    );
  }

  const isReady = quiz.status === "ready";
  const isGenerating = quiz.status === "generating";
  const questionCount = quiz.question_count ?? 10;
  const lastScore = quiz.last_score;
  const isAttempted = quiz.is_attempted;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between min-h-[170px] hover:border-gray-300 transition-all shadow-none">
      <div>
        {/* Top: Difficulty and Questions Count */}
        <div className="flex items-center justify-between mb-3">
          <DifficultyBadge difficulty={difficulty} />
          <span className="text-[11px] text-gray-500 font-medium">
            {questionCount} Questions
          </span>
        </div>

        {/* Middle: User's Last Attempt */}
        <div className="my-2">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Last Attempt
          </span>
          {isAttempted && lastScore !== undefined && lastScore !== null ? (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[18px] font-black text-gray-900">
                {Math.round(lastScore)}%
              </span>
              <span
                className={cn(
                  "text-[10px] font-bold px-1.5 py-0.2 rounded",
                  lastScore >= 80
                    ? "bg-emerald-100 text-emerald-800"
                    : lastScore >= 60
                    ? "bg-blue-100 text-blue-800"
                    : "bg-amber-100 text-amber-800"
                )}
              >
                {lastScore >= 80
                  ? "Distinction"
                  : lastScore >= 60
                  ? "Passed"
                  : "Review"}
              </span>
            </div>
          ) : isGenerating ? (
            <div className="flex items-center gap-1.5 text-amber-600 text-[12px] font-medium mt-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Generating...
            </div>
          ) : (
            <p className="text-[13px] text-gray-400 font-medium mt-0.5">
              Not Attempted
            </p>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-3">
        {isReady ? (
          <Link
            href={`/quizzes/${quiz.id}`}
            className={cn(
              "w-full text-center py-2 px-3 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-1.5 shadow-none",
              isAttempted
                ? "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            )}
          >
            {isAttempted ? "Retake Quiz" : "Start Quiz"}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : isGenerating ? (
          <button
            disabled
            className="w-full py-2 px-3 rounded-lg text-[13px] font-medium bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Generating
          </button>
        ) : (
          <button
            disabled
            className="w-full py-2 px-3 rounded-lg text-[13px] font-medium bg-gray-100 text-gray-400 cursor-not-allowed text-center"
          >
            Unavailable
          </button>
        )}
      </div>
    </div>
  );
}
