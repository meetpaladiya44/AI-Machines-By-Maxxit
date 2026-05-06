import * as React from "react";
import { cn } from "@/lib/utils";

export function GridPattern({
  className,
  size = 28,
  fade = true,
}: {
  className?: string;
  size?: number;
  fade?: boolean;
}) {
  const id = React.useId();
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-zinc-300/60",
        fade &&
          "[mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]",
        className
      )}
    >
      <defs>
        <pattern
          id={`grid-${id}`}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
    </svg>
  );
}
