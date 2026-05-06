import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const logoH =
    size === "sm" ? "h-6" : size === "lg" ? "h-9" : "h-7";
  const wordmark =
    size === "sm"
      ? "text-xs"
      : size === "lg"
        ? "text-base"
        : "text-sm";
  const byline =
    size === "sm"
      ? "text-[11px]"
      : size === "lg"
        ? "text-sm"
        : "text-xs";
  const aiText =
    size === "sm"
      ? "text-[17px]"
      : size === "lg"
        ? "text-sm"
        : "text-md";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 sm:gap-2.5",
        "select-none",
        className
      )}
    >
      <Image
        src="/images/maxxit-logo.png"
        alt="Maxxit"
        width={320}
        height={88}
        quality={95}
        priority
        unoptimized
        className={cn(logoH, "w-auto object-contain")}
      />
      <span
        className="hidden h-5 w-px shrink-0 bg-zinc-300 sm:block"
        aria-hidden
      />
      <span className="hidden items-baseline gap-1 sm:inline-flex">
        <span className="relative inline-flex items-center gap-1">
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-x-2 -inset-y-1 -z-10 rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.25)_0%,transparent_55%),radial-gradient(circle_at_70%_80%,rgba(96,165,250,0.18)_0%,transparent_60%)] blur-sm"
          />
          <span
            className={cn(
              "ai-machines-wordmark font-semibold tracking-tight",
              aiText,
            )}
          >
            AI Machines
          </span>
          <span aria-hidden className="relative -top-1 text-[10px] text-emerald-500/80">
            ✦
          </span>
        </span>
        <span className={cn("maxxit-animated-byline font-semibold", byline)}>
          by Maxxit
        </span>
      </span>
    </div>
  );
}
