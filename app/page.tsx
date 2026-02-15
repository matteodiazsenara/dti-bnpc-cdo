import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
// Helloo
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Navigation />
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
        </div>

        <Footer />
      </div>
    </main>
  );
}

export function Footer() {
  return (
    // <main className="min-h-screen flex flex-col items-center">
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <footer className="w-full py-16 border-t">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold">Cities and Municipalities</h3>
              <h4 className="text-xl font-semibold">Monitoring</h4>
              <p className="text-sm">
                Is an annual monitoring cities and municipalities developed to
                monitor SRP.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold">CONTACT US</h3>
              <div className="text-sm space-y-1">
                <p>G/F State Investment Trust Inc.</p>
                <p>Bldg., Tiano-Hayes Sts.,</p>
                <p>Cagayan de Oro City,</p>
                <p>Misamis Oriental</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Email:</span>
                <a
                  href="mailto:r10.misamisoriental@dti.gov.ph"
                  className="text-sm hover:text-white transition"
                >
                  r10.misamisorien­tal@dti.gov.ph
                </a>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 rounded-full p-2 transition"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-1.5 9-5.5A4.5 4.5 0 0023 3z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-red-600 hover:bg-red-700 rounded-full p-2 transition"
                  aria-label="YouTube"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.54c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                    <polygon
                      points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                      fill="black"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 flex justify-between items-center text-xs ">
            <p>
              Powered by{" "}
              <a
                href="https://www.dti.gov.ph/"
                target="_blank"
                className="font-bold"
                rel="noreferrer"
              >
                DTI-BNPC
              </a>
            </p>
            <ThemeSwitcher />
          </div>
        </div>
      </footer>
    </div>
    // </main>
  );
}
