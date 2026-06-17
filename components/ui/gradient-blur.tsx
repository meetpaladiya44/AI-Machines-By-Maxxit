import * as React from "react";
import { cn } from "@/lib/utils";

export function GradientBlur({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "soft" | "cta";
}) {
  if (variant === "hero") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
          className
        )}
      >
        <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-brand-green/15 blur-[110px]" />
        <div className="absolute -top-24 right-[-10%] h-[460px] w-[460px] rounded-full bg-surface-wash blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 h-[360px] w-[360px] rounded-full bg-brand-green/8 blur-[120px]" />
      </div>
    );
  }
  if (variant === "cta") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
          className
        )}
      >
        <div className="absolute -top-20 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-green/20 blur-[120px]" />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-brand-green/10 blur-[100px]" />
      <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-surface-wash blur-[110px]" />
    </div>
  );
}