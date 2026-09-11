"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-[64px] h-[32px] rounded-full bg-pink/20 shrink-0" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-[64px] h-[32px] rounded-full p-[3px] transition-all duration-300 cursor-pointer select-none shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink hover:scale-105 active:scale-95"
      style={{
        background: isDark
          ? "#180010"
          : "linear-gradient(135deg, #FA198B 0%, #B91372 100%)",
        border: isDark
          ? "1.5px solid rgba(250, 25, 139, 0.4)"
          : "1.5px solid transparent",
        boxShadow: isDark
          ? "0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(0,0,0,0.5)"
          : "0 2px 10px rgba(250, 25, 139, 0.4), inset 0 1px 2px rgba(255,255,255,0.2)",
      }}
    >
      {/* Sun Icon (Left Side) */}
      <span
        className={`absolute left-[3px] top-[3px] w-[26px] h-[26px] flex items-center justify-center transition-all duration-300 pointer-events-none ${
          isDark ? "opacity-0 scale-75" : "opacity-100 scale-100"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3.5" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
          <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
          <line x1="19.07" y1="4.93" x2="16.95" y2="7.05" />
          <line x1="7.05" y1="16.95" x2="4.93" y2="19.07" />
        </svg>
      </span>

      {/* Moon Icon (Right Side) */}
      <span
        className={`absolute right-[3px] top-[3px] w-[26px] h-[26px] flex items-center justify-center transition-all duration-300 pointer-events-none ${
          isDark ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: "scaleX(-1) rotate(45deg)" }}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </span>

      {/* Sliding White Knob */}
      <span
        className="absolute left-[3px] top-[3px] w-[26px] h-[26px] rounded-full bg-white shadow-md transition-transform duration-300 ease-out pointer-events-none"
        style={{
          transform: isDark ? "translateX(0px)" : "translateX(32px)",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
        }}
      />
    </button>
  );
}