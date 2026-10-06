"use client";

import React, { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { Sigma } from "lucide-react";

interface MathEquationProps {
  formula: string;
  className?: string;
}

export function MathEquation({ formula, className }: MathEquationProps) {
  const renderedHtml = useMemo(() => {
    if (!formula || typeof formula !== "string") return null;

    // Clean up markdown code backticks if the LLM wrapped it
    let clean = formula.trim().replace(/^```(latex|math|text)?\n?/, "").replace(/```$/, "").trim();

    // Check if the string has multiple equations separated by newlines
    const lines = clean.split("\n").map(l => l.trim()).filter(Boolean);

    try {
      if (lines.length > 1) {
        // Render each line or align them
        return lines.map((line) => {
          // If line contains LaTeX commands or mathematical operators, render with KaTeX
          try {
            return katex.renderToString(line, {
              displayMode: true,
              throwOnError: false,
            });
          } catch {
            return `<div class="font-mono text-sm py-1">${line}</div>`;
          }
        }).join("");
      }

      return katex.renderToString(clean, {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return null;
    }
  }, [formula]);

  if (!formula) return null;

  return (
    <div className="my-5 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/50 via-slate-50/50 to-indigo-50/40 p-4 shadow-2xs">
      <div className="flex items-center gap-1.5 text-blue-800 text-[11px] font-semibold tracking-wider uppercase mb-2">
        <Sigma className="w-3.5 h-3.5 text-blue-600" />
        <span>Technical Formula & Governing Equation</span>
      </div>

      {renderedHtml ? (
        <div
          className="text-gray-900 py-1 overflow-x-auto text-[15px] select-all [&_.katex-display]:my-1"
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />
      ) : (
        <div className="font-mono text-sm text-gray-800 bg-white/80 p-2.5 rounded-lg border border-gray-100">
          {formula}
        </div>
      )}
    </div>
  );
}
