"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Award, CheckCircle } from "lucide-react";
import { useWindowSize } from "react-use";

interface CertificateViewerProps {
  courseId: string;
  onComplete: () => void;
  isCompleted: boolean;
}

export function CertificateViewer({ courseId, onComplete, isCompleted }: CertificateViewerProps) {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isCompleted) {
      onComplete();
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000); // 5 seconds of confetti
      return () => clearTimeout(timer);
    }
  }, [isCompleted, onComplete]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-8 relative overflow-hidden">
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />
      )}

      <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-lg relative z-10 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Award className="w-12 h-12 text-yellow-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          Congratulations!
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          You have successfully completed this course. Your dedication and hard work have paid off!
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-medium mb-8">
          <CheckCircle className="w-5 h-5" />
          Course Completed
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
          <ul className="space-y-3 text-gray-600 text-[14px]">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              Your progress has been permanently saved to your profile.
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              You can revisit this course at any time to review the materials.
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              Check out other courses in the catalog to continue learning.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
