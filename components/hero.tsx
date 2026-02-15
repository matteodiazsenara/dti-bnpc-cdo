"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardBody, Button, Link } from "@heroui/react";
import { useTheme } from "next-themes";
import dti from "@/public/assets/dti.png";
import dark_dti from "@/public/assets/dark-dti.png";
import Team from "@/public/assets/team-cdo.jpg";

export function Hero() {
  return (
    <div className="flex flex-col gap-8">
      <HeroHeader />

      <Card className=" border-blue-200">
        <CardBody className="flex flex-row items-center justify-between gap-8 p-8">
          <div className="flex flex-col gap-6 flex-1">
            <div>
              <h2 className="text-3xl font-bold">
                Cities and Municipality Monitoring
              </h2>
              <p className="mt-2">
                Monitor and track real-time data from cities and municipalities
                across the Philippines
              </p>
            </div>
            <Link
              href="/auth/portal"
              className="bg-primary font-semibold px-6 py-3 rounded-lg transition w-fit text-white"
            >
              Data Portal
            </Link>
          </div>

          <div className="flex-shrink-0">
            <Image
              src={Team}
              alt="Cities and Municipality"
              width={380}
              height={380}
              className="rounded-lg shadow-lg"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

interface HeroHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function HeroHeader({
  title = "Philippine Standard Time",
  subtitle,
  className = "",
}: HeroHeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Manila",
      });
      setCurrentTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDark =
    mounted &&
    (theme === "dark" || (theme === "system" && systemTheme === "dark"));

  // Note: logic assumes dark_dti is for dark mode, but your original code
  // had the container become white (bg-slate-200) in dark mode, so logic might need swapping
  // based on your specific visual preference.
  const dtiImage = isDark ? dark_dti : dti;

  return (
    <div
      className={`flex items-center justify-between gap-8 px-6 py-2 rounded-lg dark:bg-slate-200 ${className}`}
    >
      <Image
        src={dtiImage}
        alt="DTI Logo"
        width={350}
        height={350}
        priority
        className="rounded object-contain"
      />

      <div className="flex flex-col items-end text-right">
        {/* Dynamic Title */}
        <h1 className="text-sm font-bold dark:text-gray-800">{title}</h1>

        {/* Optional Subtitle */}
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-600 mb-1">
            {subtitle}
          </p>
        )}

        {/* Time Display */}
        <p className="text-sm font-serif font-medium dark:text-gray-700 tabular-nums">
          {mounted ? currentTime : "Loading..."}
        </p>
      </div>
    </div>
  );
}
