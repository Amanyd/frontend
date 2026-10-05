"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import mermaid from "mermaid";
import { Loader2 } from "lucide-react";

interface MermaidDiagramProps {
  code: string;
  className?: string;
}

export function MermaidDiagram({ code, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId().replace(/:/g, "_");
  const diagramId = `mermaid_${rawId}`;
  const [svgHtml, setSvgHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    mermaid.initialize({
      startOnLoad: false,
      theme: "neutral",
      securityLevel: "loose",
      fontFamily: "inherit",
    });

    const cleanCode = code
      .trim()
      .replace(/^```mermaid\s*/i, "")
      .replace(/```$/, "")
      .trim();

    if (!cleanCode) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    mermaid
      .render(diagramId, cleanCode)
      .then(({ svg }) => {
        if (!cancelled) {
          setSvgHtml(svg);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn("Mermaid render error:", err);
          setError(cleanCode);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [code, diagramId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50/50 rounded-xl border border-gray-100 text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        <span className="text-[13px]">Rendering flight schematic…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-left overflow-x-auto">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1">
          System Schematic Flow
        </span>
        <pre className="text-[12px] font-mono text-gray-700 whitespace-pre-wrap">
          {error}
        </pre>
      </div>
    );
  }

  if (!svgHtml) return null;

  return (
    <div
      ref={containerRef}
      className={`mermaid-container flex justify-center items-center p-4 bg-white/80 rounded-xl border border-gray-100 overflow-x-auto shadow-sm ${className || ""}`}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}
