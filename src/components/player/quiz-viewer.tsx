"use client";

import { useState } from "react";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizViewerProps {
  quiz: any;
}

export function QuizViewer({ quiz }: QuizViewerProps) {
  // Simple placeholder for now. 
  // We'll wire up the attempt and answer logic in a later iteration if needed,
  // or use the existing quiz page logic.
  
  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-purple-50/30">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h2>
          <p className="text-gray-600">{quiz.description || "Test your knowledge on this lesson."}</p>
        </div>
        
        <div className="p-8">
           <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                 <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quiz Ready</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                You can take the full quiz here. (Integration coming soon!)
              </p>
              
              {/* This would ideally initiate a new quiz attempt or navigate to the quiz page */}
           </div>
        </div>
      </div>
    </div>
  );
}
