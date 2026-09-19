"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { clientApi } from "@/lib/api-client.client";
import {
  useStartAttempt,
  useSubmitAnswer,
  useFinishAttempt,
} from "@/hooks/use-quiz";
import { useQuizStore } from "@/stores/quiz-store";
import type { Quiz, Question, Attempt, Answer } from "@/types/quiz";

interface QuizDetail {
  quiz: Quiz;
  questions: Question[];
}

interface AttemptResults {
  attempt: Attempt;
  answers: Answer[];
}

interface QuizViewerProps {
  quiz: Quiz;
}

export function QuizViewer({ quiz }: QuizViewerProps) {
  const {
    attemptId,
    currentQuestion,
    answers,
    setAttemptId,
    nextQuestion,
    prevQuestion,
    setAnswer,
    reset,
  } = useQuizStore();

  const [state, setState] = useState<"idle" | "loading" | "attempting" | "submitting" | "results">("idle");
  const [resultsData, setResultsData] = useState<AttemptResults | null>(null);

  const startAttempt = useStartAttempt();
  const submitAnswer = useSubmitAnswer();
  const finishAttempt = useFinishAttempt();

  const { data: quizDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: ["quizzes", "detail", quiz.id],
    queryFn: () => clientApi.get<QuizDetail>(`/api/v1/quizzes/${quiz.id}`),
    enabled: state !== "idle",
  });

  // Reset store if quiz changes
  useEffect(() => {
    reset();
    setState("idle");
    setResultsData(null);
  }, [quiz.id, reset]);

  const handleStart = async () => {
    setState("loading");
    try {
      const attempt = await startAttempt.mutateAsync(quiz.id);
      setAttemptId(attempt.id);
      setState("attempting");
    } catch (err) {
      console.error(err);
      setState("idle");
    }
  };

  const handleSubmit = async () => {
    if (!attemptId) return;
    setState("submitting");

    try {
      // Submit all answers
      for (const [questionId, answer] of Object.entries(answers)) {
        await submitAnswer.mutateAsync({
          attemptId,
          data: { question_id: questionId, answer },
        });
      }

      // Finish attempt
      const resultAttempt = await finishAttempt.mutateAsync(attemptId);
      
      // Fetch results
      const results = await clientApi.get<AttemptResults>(
        `/api/v1/attempts/${resultAttempt.id}/results`
      );
      setResultsData(results);
      setState("results");
    } catch (err) {
      console.error("Failed to submit quiz", err);
      setState("attempting"); // Revert so user can try again
    }
  };

  const renderIdle = () => (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Quiz Ready</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Test your knowledge! This quiz will validate your understanding of the material.
      </p>
      <Button onClick={handleStart} size="lg" className="rounded-xl px-8">
        Start Quiz
      </Button>
    </div>
  );

  const renderAttempting = () => {
    if (!quizDetail) return null;
    const { questions } = quizDetail;
    const total = questions.length;
    const current = questions[currentQuestion];
    if (!current) return null;

    const isFirst = currentQuestion === 0;
    const isLast = currentQuestion === total - 1;
    const selectedAnswer = answers[current.id] ?? "";

    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Question {currentQuestion + 1} of {total}
          </span>
          <span className="text-sm font-medium text-gray-500 capitalize">
            {quiz.difficulty}
          </span>
        </div>

        <div className="mb-10">
          <h2 className="text-xl text-gray-900 font-medium mb-8">
            {current.question}
          </h2>

          <div className="flex flex-col gap-3">
            {current.choices?.map((choice) => {
              const isSelected = selectedAnswer === choice.label;
              return (
                <label
                  key={choice.label}
                  className={cn(
                    "flex items-center p-4 rounded-xl border cursor-pointer transition-colors",
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
                  )}
                >
                  <input
                    type="radio"
                    name={`question-${current.id}`}
                    value={choice.label}
                    checked={isSelected}
                    onChange={() => setAnswer(current.id, choice.label)}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center mr-4 shrink-0 transition-colors",
                      isSelected ? "border-blue-500" : "border-gray-300"
                    )}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-base text-gray-900",
                      isSelected && "font-medium"
                    )}
                  >
                    {choice.text}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={isFirst}
            className="rounded-lg gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {isLast ? (
            <Button
              onClick={handleSubmit}
              disabled={state === "submitting"}
              className="rounded-lg gap-2"
            >
              {state === "submitting" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {state === "submitting" ? "Submitting..." : "Submit Quiz"}
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="rounded-lg gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!resultsData || !quizDetail) return null;
    const { attempt, answers: submittedAnswers } = resultsData;
    const { questions } = quizDetail;
    const score = Math.round(attempt.score);
    const questionsMap = new Map(questions.map((q) => [q.id, q]));

    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-blue-50 rounded-2xl p-8 text-center mb-10 border border-blue-100">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">
            Final Score
          </p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-bold text-gray-900">{score}</span>
            <span className="text-2xl text-gray-500">%</span>
          </div>
          <p className="text-gray-500 mt-2">
            {attempt.total > 0
              ? `${Math.round((score / 100) * attempt.total)} of ${attempt.total} correct`
              : "No answers submitted"}
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Review Answers</h3>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg"
            onClick={() => {
              reset();
              setState("idle");
            }}
          >
            Retake Quiz
          </Button>
        </div>

        <div className="space-y-4">
          {submittedAnswers.map((answer, i) => {
            const question = questionsMap.get(answer.question_id);
            if (!question) return null;

            return (
              <div
                key={answer.id}
                className={cn(
                  "rounded-xl p-5 border",
                  answer.is_correct
                    ? "bg-green-50/50 border-green-200"
                    : "bg-red-50/50 border-red-200"
                )}
              >
                <div className="flex items-start gap-3">
                  {answer.is_correct ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      Question {i + 1}
                    </p>
                    <p className="text-base font-medium text-gray-900 mb-2">
                      {question.question}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Your answer: </span>
                      <span
                        className={cn(
                          "font-medium",
                          answer.is_correct ? "text-green-700" : "text-red-700"
                        )}
                      >
                        {answer.answer}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50/50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden min-h-[60vh]">
        <div className="p-6 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">{quiz.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {quiz.description || "Test your knowledge on this lesson."}
          </p>
        </div>

        <div className="p-6">
          {state === "idle" && renderIdle()}
          {(state === "loading" || (state === "attempting" && isLoadingDetail)) && (
            <div className="flex items-center justify-center min-h-[40vh]">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          )}
          {(state === "attempting" || state === "submitting") && !isLoadingDetail && renderAttempting()}
          {state === "results" && renderResults()}
        </div>
      </div>
    </div>
  );
}
