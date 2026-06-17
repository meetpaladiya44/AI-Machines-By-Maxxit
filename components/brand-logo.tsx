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
  const productText =
    size === "sm"
      ? "text-xs"
      : size === "lg"
        ? "text-base"
        : "text-sm";

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
        <span
          className={cn(
            "font-semibold tracking-tight text-ink-primary",
            productText
          )}
        >
          Maxxit
        </span>
        <span
          className={cn(
            "maxxit-brand-byline font-medium",
            size === "sm" ? "text-[11px]" : size === "lg" ? "text-sm" : "text-xs"
          )}
        >
          Taxsoft
        </span>
      </span>
    </div>
  );
}