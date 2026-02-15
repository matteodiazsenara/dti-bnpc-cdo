import Link from "next/link";
import { IconPhoneCall } from "@tabler/icons-react";
// import { EnvVarWarning } from "./env-var-warning";
// import { Suspense } from "react";
// import { AuthButton } from "./auth-button";
// import { hasEnvVars } from "@/lib/utils";

export function Navigation() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        {/* Logo */}
        <div className="flex gap-5 items-center font-semibold">
          <a
            href="https://www.gov.ph/"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            GOVPH
          </a>
        </div>

        {/* Center Navigation */}
        <div className="flex gap-8 items-center">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/auth/portal" className="hover:text-blue-600 transition">
            Data Portal
          </Link>
          <Link
            href="#contact"
            className="transition bg-primary flex text-white px-4 py-2 rounded-lg"
          >
            {/* <IconPhoneCall size={16} className="mr-1" /> */}
            Contact
          </Link>
        </div>

        {/* Auth Button */}
        {/* {!hasEnvVars ? (
          <EnvVarWarning />
        ) : (
          <Suspense>
            <AuthButton />
          </Suspense>
        )} */}
      </div>
    </nav>
  );
}
