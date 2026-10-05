"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Calculator,
  GitBranch,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MermaidDiagram } from "./mermaid-diagram";
import type { LessonTopic, TopicSlide } from "@/types/quiz";

interface TopicSlidesViewerProps {
  topics: LessonTopic[];
  activeTopicIndex?: number;
  onTopicChange?: (index: number) => void;
  onCompleteLesson?: () => void;
}

export function TopicSlidesViewer({
  topics,
  activeTopicIndex = 0,
  onTopicChange,
  onCompleteLesson,
}: TopicSlidesViewerProps) {
  const [topicIdx, setTopicIdx] = useState(activeTopicIndex);
  const [slideIdx, setSlideIdx] = useState(0);

  // Sync external topic index changes
  React.useEffect(() => {
    setTopicIdx(activeTopicIndex);
    setSlideIdx(0);
  }, [activeTopicIndex]);

  if (!topics || topics.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400">
        <BookOpen className="w-12 h-12 text-gray-300 mb-3" />
        <h3 className="text-base font-semibold text-gray-700">No AI Briefing Slides Available</h3>
        <p className="text-[13px] text-gray-400 max-w-sm mt-1">
          Briefing slides are generated automatically when a lesson plan is uploaded. You can view the original reference document in the next tab.
        </p>
      </div>
    );
  }

  const currentTopic = topics[topicIdx] || topics[0];
  const slides = currentTopic.slides || [];
  const currentSlide: TopicSlide | undefined = slides[slideIdx];
  const totalSlides = slides.length;

  const goToSlide = (newSlideIdx: number) => {
    if (newSlideIdx >= 0 && newSlideIdx < totalSlides) {
      setSlideIdx(newSlideIdx);
    }
  };

  const goToNext = () => {
    if (slideIdx < totalSlides - 1) {
      setSlideIdx(slideIdx + 1);
    } else if (topicIdx < topics.length - 1) {
      const nextT = topicIdx + 1;
      setTopicIdx(nextT);
      setSlideIdx(0);
      onTopicChange?.(nextT);
    } else {
      onCompleteLesson?.();
    }
  };

  const goToPrev = () => {
    if (slideIdx > 0) {
      setSlideIdx(slideIdx - 1);
    } else if (topicIdx > 0) {
      const prevT = topicIdx - 1;
      setTopicIdx(prevT);
      const prevSlides = topics[prevT]?.slides || [];
      setSlideIdx(Math.max(0, prevSlides.length - 1));
      onTopicChange?.(prevT);
    }
  };

  const getSlideIcon = (type: string) => {
    switch (type) {
      case "concept":
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case "technical_limits":
        return <Calculator className="w-4 h-4 text-indigo-600" />;
      case "diagram":
        return <GitBranch className="w-4 h-4 text-emerald-600" />;
      case "emergency":
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  const getSlideLabel = (type: string) => {
    switch (type) {
      case "concept":
        return "Core Concept & Principle";
      case "technical_limits":
        return "Formulas & Operating Limits";
      case "diagram":
        return "System Schematic & Flow";
      case "emergency":
        return "Malfunctions & Emergency Action";
      default:
        return "Educational Briefing";
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/50 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              Topic {topicIdx + 1} of {topics.length}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-[12px] font-medium text-gray-500">
              Slide {slideIdx + 1} of {Math.max(1, totalSlides)}
            </span>
          </div>
          <h2 className="text-[16px] font-bold text-gray-900 tracking-tight">
            {currentTopic.title}
          </h2>
        </div>

        {/* Progress pills for slides */}
        <div className="flex items-center gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={cn(
                "h-2 rounded-full transition-all cursor-pointer",
                idx === slideIdx
                  ? "w-8 bg-blue-600"
                  : "w-2 bg-gray-200 hover:bg-gray-300"
              )}
              title={`Slide ${idx + 1}: ${s.title}`}
            />
          ))}
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col justify-between">
        {currentSlide ? (
          <div className="space-y-6 max-w-3xl mx-auto w-full">
            {/* Slide Type Badge */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200/80 flex items-center justify-center shrink-0">
                {getSlideIcon(currentSlide.slide_type)}
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block">
                  {getSlideLabel(currentSlide.slide_type)}
                </span>
                <h3 className="text-xl font-bold text-gray-900">
                  {currentSlide.title}
                </h3>
              </div>
            </div>

            {/* Bullets */}
            {currentSlide.bullets && currentSlide.bullets.length > 0 && (
              <div className="space-y-3">
                {currentSlide.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-blue-100 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-[14px] leading-relaxed text-gray-700">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Formula / Rule Callout */}
            {currentSlide.formula_or_rule && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/60 border border-blue-200/60 shadow-sm">
                <div className="flex items-center gap-2 mb-1.5 text-blue-900 font-semibold text-[13px]">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span>Aviation Formula & Operating Limit</span>
                </div>
                <div className="font-mono text-[14px] font-bold text-blue-950 bg-white/80 p-3 rounded-lg border border-blue-100/80">
                  {currentSlide.formula_or_rule}
                </div>
              </div>
            )}

            {/* Diagram (Mermaid.js) */}
            {currentSlide.diagram_mermaid && (
              <div className="my-4">
                <MermaidDiagram code={currentSlide.diagram_mermaid} />
              </div>
            )}

            {/* In-Flight Warning / Emergency Box */}
            {currentSlide.warning && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1 text-amber-900 font-bold text-[13px]">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>OPERATIONAL WARNING / COCKPIT ACTION</span>
                </div>
                <p className="text-[13px] leading-relaxed text-amber-950 font-medium">
                  {currentSlide.warning}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Slide content loading…
          </div>
        )}

        {/* Footer Navigation Bar */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-8 max-w-3xl mx-auto w-full">
          <button
            type="button"
            onClick={goToPrev}
            disabled={slideIdx === 0 && topicIdx === 0}
            className="h-9 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-[13px] font-medium transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="text-[12px] font-medium text-gray-400">
            {slideIdx + 1} / {Math.max(1, totalSlides)}
          </span>

          <button
            type="button"
            onClick={goToNext}
            className="h-9 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[13px] font-medium transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            {slideIdx === totalSlides - 1 && topicIdx === topics.length - 1 ? (
              "Finish Briefing"
            ) : slideIdx === totalSlides - 1 ? (
              "Next Topic"
            ) : (
              "Next Slide"
            )}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
