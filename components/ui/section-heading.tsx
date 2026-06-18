import * as React from "react";
import { cn } from "@/lib/utils";

export function BrandHighlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("text-[#04bb66]", className)}>{children}</span>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-pretty text-3xl font-semibold tracking-tight sm:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}