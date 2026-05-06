import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  hover = true,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(15,23,42,0.08)]",
        hover &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_2px_0_0_rgba(0,0,0,0.02),0_22px_40px_-18px_rgba(15,23,42,0.18)]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardIcon({
  tone = "emerald",
  children,
  className,
}: {
  tone?: "emerald" | "violet" | "rose" | "amber" | "sky" | "zinc";
  children: React.ReactNode;
  className?: string;
}) {
  const tones: Record<string, string> = {
    emerald:
      "bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 text-emerald-600 ring-1 ring-inset ring-emerald-500/20",
    violet:
      "bg-gradient-to-br from-violet-500/10 to-violet-500/5 text-violet-600 ring-1 ring-inset ring-violet-500/20",
    rose: "bg-gradient-to-br from-rose-500/10 to-rose-500/5 text-rose-600 ring-1 ring-inset ring-rose-500/20",
    amber:
      "bg-gradient-to-br from-amber-500/10 to-amber-500/5 text-amber-600 ring-1 ring-inset ring-amber-500/20",
    sky: "bg-gradient-to-br from-sky-500/10 to-sky-500/5 text-sky-600 ring-1 ring-inset ring-sky-500/20",
    zinc: "bg-zinc-100 text-zinc-700 ring-1 ring-inset ring-zinc-200",
  };
  return (
    <div
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
        tones[tone],
        className
      )}
    >
      {children}
    </div>
  );
}
