"use client";

import { useState } from "react";
import { ChevronRight, ArrowLeft, Clock, Plane, Zap } from "lucide-react";
import { CourseGrid } from "./course-grid";
import type { Course } from "@/types/course";

interface CoursePhasesViewProps {
  courses: Course[];
  isInstructor?: boolean;
}

interface PhaseItem {
  id: string;
  name: string;
  code: string;
  category: "Engineering" | "Electrical";
  description: string;
  isAvailable: boolean;
  icon: typeof Plane;
}

const PHASES: PhaseItem[] = [
  {
    id: "aeo-1",
    name: "Air Engineer Officer Phase 1",
    code: "AEO Phase 1",
    category: "Engineering",
    description: "Initial aeronautical orientation, aerodynamics, flight mechanics, and core naval aircraft structures.",
    isAvailable: true,
    icon: Plane,
  },
  {
    id: "aeo-2",
    name: "Air Engineer Officer Phase 2",
    code: "AEO Phase 2",
    category: "Engineering",
    description: "Advanced propulsion, gas turbine powerplants, naval weapons integration, and flight line maintenance.",
    isAvailable: false,
    icon: Plane,
  },
  {
    id: "aleo-1",
    name: "Air Electrical Officer Phase 1",
    code: "ALEO Phase 1",
    category: "Electrical",
    description: "Avionics architecture, electrical power distribution, airborne radar systems, and telemetry principles.",
    isAvailable: false,
    icon: Zap,
  },
  {
    id: "aleo-2",
    name: "Air Electrical Officer Phase 2",
    code: "ALEO Phase 2",
    category: "Electrical",
    description: "Electronic warfare suites, tactical mission systems, automated flight controls, and sensor integration.",
    isAvailable: false,
    icon: Zap,
  },
];

export function CoursePhasesView({ courses, isInstructor }: CoursePhasesViewProps) {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  if (selectedPhase === "aeo-1") {
    return (
      <div className="h-full flex flex-col">
        {/* Breadcrumb & Return Header */}
        <div className="shrink-0 flex items-center justify-between pb-5 mb-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedPhase(null)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-[13px] font-medium transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4 text-gray-500" />
              <span>Back to Specializations</span>
            </button>

            <div className="h-4 w-[1px] bg-gray-200" />

            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-gray-900">
                Air Engineer Officer Phase 1
              </span>
              <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                {courses.length} {courses.length === 1 ? "Course" : "Courses"}
              </span>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <CourseGrid courses={courses} isInstructor={isInstructor} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-[16px] font-bold text-gray-900 tracking-tight">
          Select Specialization & Phase
        </h2>
        <p className="text-[13px] text-gray-500 mt-0.5">
          Choose your branch curriculum to access designated flight modules and training manuals
        </p>
      </div>

      {/* Full Stretching Tabs Stacked Vertically */}
      <div className="flex flex-col gap-3.5 w-full">
        {PHASES.map((phase) => {
          const Icon = phase.icon;

          if (phase.isAvailable) {
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setSelectedPhase(phase.id)}
                className="w-full text-left p-5 rounded-xl border border-gray-200 bg-white hover:bg-blue-50/40 hover:border-blue-300 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-[16px] font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                        {phase.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full shrink-0">
                        Active
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-500 mt-1 line-clamp-1">
                      {phase.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[12px] font-semibold text-blue-700 bg-blue-50/80 border border-blue-200 px-3 py-1 rounded-full hidden sm:inline-block">
                    {courses.length} {courses.length === 1 ? "Course" : "Courses"}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-blue-100 flex items-center justify-center text-gray-400 group-hover:text-blue-700 transition-colors">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            );
          }

          return (
            <div
              key={phase.id}
              className="w-full text-left p-5 rounded-xl border border-gray-200 bg-gray-50/60 opacity-80 flex items-center justify-between gap-4 cursor-not-allowed select-none"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 text-gray-400">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-[16px] font-bold text-gray-600 truncate">
                      {phase.name}
                    </h3>
                  </div>
                  <p className="text-[13px] text-gray-400 mt-1 line-clamp-1">
                    {phase.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Coming Soon
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
