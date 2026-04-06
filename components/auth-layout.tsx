"use client";

import React from "react";
import { NextLogo } from "@/components/next-logo";

/**
 * A simple layout component for authentication pages. It uses
 * tailwind classes (and the global CSS variables) to provide a
 * modern full-screen gradient background with a frosted card
 * in the middle. Pages can just render their forms as children.
 *
 * The layout also displays a small logo/title at the top of the
 * card to reinforce branding.
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="mb-6 flex justify-center">
          <NextLogo />
        </div>
        {children}
      </div>
    </div>
  );
}
