"use client";

import { useSearchParams } from "next/navigation";
import { Footer } from "@/app/page";
import { HeroHeader } from "@/components/hero";
import ModernMonitoringTable from "@/components/modern-monitoring-table";

export function MonitorContent() {
  const searchParams = useSearchParams();
  const lgu = searchParams.get("lgu");
  const province = searchParams.get("province");

  const hasData = lgu === "Cagayan de Oro City";

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="min-h-screen p-2 md:p-4">
        <div className="max-w-7xl mx-auto mb-96">
          <HeroHeader
            title="BNPC Monitoring Dashboard"
            subtitle="KEY CITIES BNPC MONITORING 2026 - CDO"
          />

          {hasData ? (
            <div className="rounded-lg shadow-lg p-6">
              <ModernMonitoringTable filePath="/assets/cdo.xlsx" />
            </div>
          ) : (
            <div className="rounded-lg shadow-lg p-12 text-center">
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <div className="text-6xl opacity-20">📊</div>
                <h2 className="text-2xl font-bold text-foreground">
                  No Data Available
                </h2>
                <p className="text-muted-foreground max-w-md">
                  {province && lgu
                    ? `Data for ${lgu}, ${province} is not available yet. Please select "Cagayan de Oro City" to view the monitoring data.`
                    : "Please search for a location to view the monitoring data. Currently, only Cagayan de Oro City data is available."}
                </p>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
