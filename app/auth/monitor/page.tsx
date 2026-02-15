import { Suspense } from "react";
import { Navigation } from "@/components/navigation";
import { MonitorContent } from "@/components/monitor-content";

function LoadingFallback() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="min-h-screen p-2 md:p-4">
        <div className="max-w-7xl mx-auto mb-96">
          <div className="rounded-lg shadow-lg p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-muted rounded-lg"></div>
              <div className="h-96 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MonitorPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navigation />
      <Suspense fallback={<LoadingFallback />}>
        <MonitorContent />
      </Suspense>
    </div>
  );
}
