import { Skeleton } from "@/components/ui/skeleton";

export default function ChatLoading() {
  return (
    <div className="h-[calc(100vh-4rem)] -mx-6 -my-6 flex flex-col font-sans p-6 bg-[#f3f4f6]">
      {/* Header */}
      <div className="mb-4 flex-shrink-0">
        <Skeleton className="h-7 w-48 mb-1.5" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Main Giant White Scrollable Box */}
      <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-y-auto p-8 scrollbar-hide flex flex-col justify-between">
        {/* Center greeting & suggestions */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full text-center space-y-6">
          <Skeleton className="w-16 h-16 rounded-2xl" />
          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-4">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </div>
        </div>

        {/* Bottom Input Area */}
        <div className="max-w-2xl mx-auto w-full pt-4">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
