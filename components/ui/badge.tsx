import * as React from "react";
import { cn } from "@/lib/utils";

type Tone =
  | "brand"
  | "emerald"
  | "violet"
  | "rose"
  | "amber"
  | "sky"
  | "zinc"
  | "white";

const toneStyles: Record<Tone, string> = {
  brand:
    "bg-brand-green/10 text-brand-green ring-1 ring-inset ring-brand-green/20",
  emerald:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/15",
  violet: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-600/15",
  rose: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/15",
  amber: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/15",
  sky: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/15",
  zinc: "bg-zinc-100 text-zinc-700 ring-1 ring-inset ring-zinc-300/60",
  white:
    "bg-white/80 backdrop-blur text-zinc-700 ring-1 ring-inset ring-zinc-200/80 shadow-sm",
};

export function Badge({
  tone = "brand",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}