import { Navigation } from "@/components/navigation";
import { SearchForm } from "@/components/search-form";

export default function DataPortalPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-gray-50 dark:to-gray-950">
      <Navigation />

      <div className="flex-1 flex flex-col gap-8 items-center w-full py-12">
        <div className="text-center max-w-2xl px-6">
          <h1 className="text-4xl font-bold mb-3">
            Cities and Municipalities Monitoring Data Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Search and monitor data from different provinces and local
            government units across the Philippines
          </p>
        </div>

        <SearchForm />
      </div>
    </main>
  );
}
