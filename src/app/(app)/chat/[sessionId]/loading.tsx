import { Skeleton } from "@/components/ui/skeleton";

export default function ChatSessionLoading() {
  return (
    <div className="h-[calc(100vh-4rem)] -mx-6 -my-6 flex flex-col font-sans p-6 bg-[#f3f4f6]">
      {/* Header */}
      <div className="mb-4 flex-shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-7 w-56" />
        </div>
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>

      {/* Main Giant White Scrollable Box */}
      <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-y-auto p-8 scrollbar-hide flex flex-col justify-between">
        {/* Chat Message Stream */}
        <div className="space-y-6 max-w-3xl mx-auto w-full">
          {/* User message */}
          <div className="flex justify-end">
            <Skeleton className="h-14 w-2/3 rounded-2xl rounded-tr-none bg-blue-100" />
          </div>
          {/* Assistant message */}
          <div className="flex items-start gap-3">
            <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
          {/* User message */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-1/2 rounded-2xl rounded-tr-none bg-blue-100" />
          </div>
          {/* Assistant message */}
          <div className="flex items-start gap-3">
            <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>

        {/* Bottom Input */}
        <div className="max-w-3xl mx-auto w-full pt-4">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
