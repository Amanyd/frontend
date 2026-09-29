"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Loader2, Send } from "lucide-react";
import { QuizQuestion } from "@/components/quiz/quiz-question";
import { DifficultyBadge } from "@/components/quiz/difficulty-badge";
import { useQuizStore } from "@/stores/quiz-store";
import {
  useStartAttempt,
  useSubmitAnswer,
  useFinishAttempt,
} from "@/hooks/use-quiz";
import { clientApi } from "@/lib/api-client.client";
import { capitalize, cn } from "@/lib/utils";
import type { Quiz, Question } from "@/types/quiz";

interface QuizDetail {
  quiz: Quiz;
  questions: Question[];
}

export default function QuizTakePage() {
  const { quizId } = useParams<{ quizId: string }>();
  const router = useRouter();

  const {
    attemptId,
    currentQuestion,
    answers,
    setAttemptId,
    nextQuestion,
    prevQuestion,
    reset,
  } = useQuizStore();

  const startAttempt = useStartAttempt();
  const submitAnswer = useSubmitAnswer();
  const finishAttempt = useFinishAttempt();

  const [quizDetail, setQuizDetail] = useState<QuizDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    reset();

    async function init() {
      try {
        const detail = await clientApi.get<QuizDetail>(
          `/api/v1/quizzes/${quizId}`
        );
        setQuizDetail(detail);

        const attempt = await startAttempt.mutateAsync(quizId);
        setAttemptId(attempt.id);
      } catch {
        router.push("/quizzes");
      } finally {
        setLoading(false);
      }
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  if (loading || !quizDetail || !attemptId) {
    return (
      <div className="h-[calc(100vh-4rem)] -mx-6 -my-6 flex flex-col font-sans bg-[#f3f4f6] p-6">
        <div className="flex-1 min-h-0 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-7 w-7 text-blue-600 animate-spin" />
            <p className="text-[13px] text-gray-500">Loading assessment questions...</p>
          </div>
        </div>
      </div>
    );
  }

  const quiz = quizDetail.quiz;
  const questions = Array.isArray(quizDetail?.questions) ? quizDetail.questions : [];
  const total = questions.length;
  const current = total > 0 ? questions[currentQuestion] : undefined;
  const isFirst = currentQuestion === 0;
  const isLast = total > 0 && currentQuestion === total - 1;
  const progress = total > 0 ? Math.round(((currentQuestion + 1) / total) * 100) : 0;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      for (const [questionId, answer] of Object.entries(answers)) {
        await submitAnswer.mutateAsync({
          attemptId,
          data: { question_id: questionId, answer },
        });
      }

      const result = await finishAttempt.mutateAsync(attemptId);
      reset();
      router.push(`/quizzes/${quizId}/results?attemptId=${result.id}`);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] -mx-6 -my-6 flex flex-col font-sans bg-[#f3f4f6] p-6">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <Link
            href="/quizzes"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[13px] font-medium rounded-lg transition-colors shadow-none"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quizzes
          </Link>
          <div className="h-4 w-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">
              {capitalize(quiz.difficulty)} Assessment
            </h1>
            <DifficultyBadge difficulty={quiz.difficulty} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-gray-500">
            Question {currentQuestion + 1} of {total}
          </span>
          <span className="text-[11px] font-semibold text-gray-400">
            ({progress}%)
          </span>
        </div>
      </div>

      {/* Main Giant White Box */}
      <div className="flex-1 min-h-0 bg-white border border-gray-200 rounded-xl overflow-y-auto p-8 scrollbar-hide flex flex-col justify-between">
        {/* Progress Bar Top */}
        <div className="w-full max-w-2xl mx-auto mb-6">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Center: Question Component */}
        <div className="flex-1 flex flex-col justify-center">
          {current && <QuizQuestion question={current} />}
        </div>

        {/* Bottom Navigation */}
        <div className="w-full max-w-2xl mx-auto pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={prevQuestion}
            disabled={isFirst}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium rounded-lg transition-colors border",
              isFirst
                ? "border-transparent text-gray-300 cursor-not-allowed"
                : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-none"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-1.5 px-5 py-2 text-[13px] font-medium rounded-lg transition-colors bg-emerald-600 hover:bg-emerald-700 text-white shadow-none"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Quiz...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Submit Quiz
                </>
              )}
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="flex items-center gap-1.5 px-5 py-2 text-[13px] font-medium rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white shadow-none"
            >
              Next Question
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
