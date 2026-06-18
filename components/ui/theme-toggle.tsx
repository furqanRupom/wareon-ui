"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = theme === "dark";

  if (!mounted) return (
    <div className="w-[88px] h-10 rounded-full bg-muted border border-border" />
  );

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      className={cn(
        "relative w-[88px] h-10 rounded-full border px-1.5 cursor-pointer",
        "transition-colors duration-400",
        isDark
          ? "bg-zinc-800 border-zinc-600"
          : "bg-muted border-border"
      )}
    >
      {/* Background ambient icons */}
      <Sun className={cn("absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-600 transition-opacity", isDark ? "opacity-15" : "opacity-50")} />
      <Moon className={cn("absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-violet-500 transition-opacity", isDark ? "opacity-50" : "opacity-15")} />

      {/* Sliding pill */}
      <div className={cn(
        "absolute top-[5px] left-[5px] w-[30px] h-[30px] rounded-full",
        "flex items-center justify-center",
        "bg-white border border-border",
        "transition-transform duration-350",
        isDark ? "translate-x-12" : "translate-x-0"
      )}>
        <Sun className={cn("w-3.5 h-3.5 absolute text-primary transition-all duration-200", isDark ? "opacity-0 scale-50 rotate-45" : "opacity-100 scale-100 rotate-0")} />
        <Moon className={cn("w-3.5 h-3.5 absolute text-primary transition-all duration-200", isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-30")} />
      </div>
    </button>
  );
}
