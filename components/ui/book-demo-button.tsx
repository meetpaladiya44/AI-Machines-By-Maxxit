"use client";

import * as React from "react";
import { useDemoModal } from "@/components/ui/demo-modal";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 disabled:pointer-events-none";

const sizeMap = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
} as const;

const variantMap = {
  primary:
    "bg-brand-green text-white shadow-[0_8px_24px_-8px_rgba(0,204,106,0.55)] hover:bg-brand-green-hover hover:shadow-[0_14px_30px_-10px_rgba(0,255,136,0.45)] hover:-translate-y-0.5 focus-visible:ring-brand-green/60",
  secondary:
    "bg-white text-ink-primary border border-border-subtle hover:border-zinc-300 hover:bg-zinc-50 shadow-sm focus-visible:ring-zinc-300",
  ghost:
    "bg-transparent text-zinc-700 hover:bg-zinc-100 focus-visible:ring-zinc-300",
  "on-dark":
    "bg-white text-ink-primary hover:bg-zinc-100 shadow-sm focus-visible:ring-white/40",
} as const;

type Props = {
  size?: keyof typeof sizeMap;
  variant?: keyof typeof variantMap;
  className?: string;
  children: React.ReactNode;
};

export function BookDemoButton({
  size = "md",
  variant = "primary",
  className,
  children,
}: Props) {
  const { open } = useDemoModal();
  return (
    <button
      type="button"
      onClick={open}
      className={cn(base, variantMap[variant], sizeMap[size], className)}
    >
      {children}
    </button>
  );
}