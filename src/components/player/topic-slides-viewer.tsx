"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MermaidDiagram } from "./mermaid-diagram";
import { MathEquation } from "./math-equation";
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
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400 h-full">
        <BookOpen className="w-12 h-12 text-gray-300 mb-3" />
        <h3 className="text-base font-semibold text-gray-700">No AI Briefing Slides Available</h3>
        <p className="text-[13px] text-gray-400 max-w-sm mt-1">
          Briefing slides are generated automatically from course manuals. You can view reference files in the next tab.
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

  return (
    <div className="flex-1 flex flex-col h-full bg-white select-text">
      {/* Running Topic Header */}
      <div className="px-8 py-3.5 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 shrink-0">
            Topic {topicIdx + 1} of {topics.length}
          </span>
          <span className="text-[14px] font-semibold text-gray-800 truncate">
            {currentTopic.title}
          </span>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[12px] font-medium text-gray-400">
            Slide {slideIdx + 1} of {Math.max(1, totalSlides)}
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            {slides.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all cursor-pointer",
                  idx === slideIdx
                    ? "w-6 bg-blue-600"
                    : "w-1.5 bg-gray-200 hover:bg-gray-300"
                )}
                title={`Slide ${idx + 1}: ${s.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 md:px-12 md:py-8 flex flex-col justify-between">
        {currentSlide ? (
          <div className="max-w-3xl w-full mx-auto">
            {/* Single Slide Heading */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mb-6">
              {currentSlide.title}
            </h2>

            {/* Bullets: Clean open typography with subtle check icons */}
            {currentSlide.bullets && currentSlide.bullets.length > 0 && (
              <div className="space-y-4 mb-6">
                {currentSlide.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                    <p className="text-[15px] leading-relaxed text-gray-700 font-normal">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Formula / Equations: Rendered with KaTeX */}
            {currentSlide.formula_or_rule && (
              <MathEquation formula={currentSlide.formula_or_rule} />
            )}

            {/* Mermaid Diagram */}
            {currentSlide.diagram_mermaid && (
              <div className="my-6 p-4 rounded-xl border border-gray-100 bg-slate-50/50">
                <MermaidDiagram code={currentSlide.diagram_mermaid} />
              </div>
            )}

            {/* Warning / Emergency / Summary Callout */}
            {currentSlide.warning && (
              <div className="my-5 p-4 rounded-xl border border-amber-200 bg-amber-50/60 shadow-2xs">
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                  Operational Note
                </p>
                <p className="text-[13px] text-amber-950 font-medium leading-relaxed">
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

        {/* Clean Slide Navigation Footer */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between max-w-3xl w-full mx-auto mt-8 shrink-0">
          <button
            type="button"
            onClick={goToPrev}
            disabled={slideIdx === 0 && topicIdx === 0}
            className="h-9 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-[13px] font-medium transition-colors flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Slide
          </button>

          <span className="text-[12px] font-medium text-gray-400">
            {slideIdx + 1} / {Math.max(1, totalSlides)}
          </span>

          <button
            type="button"
            onClick={goToNext}
            className="h-9 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-medium transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
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
