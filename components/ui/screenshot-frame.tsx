import Image from "next/image";
import { cn } from "@/lib/utils";

type ScreenshotFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  frameClassName?: string;
  showBrowserChrome?: boolean;
  label?: string;
};

export function ScreenshotFrame({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  frameClassName,
  showBrowserChrome = false,
  label,
}: ScreenshotFrameProps) {
  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-2xl shadow-black/10",
        frameClassName,
        className
      )}
    >
      {showBrowserChrome ? (
        <div className="flex items-center gap-2 border-b border-zinc-200/80 bg-zinc-50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" aria-hidden />
          <span className="ml-2 truncate text-xs text-zinc-500">
            {label ?? "Maxxit Tally"}
          </span>
        </div>
      ) : null}

      <div className="relative overflow-hidden bg-zinc-100">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-full object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
      </div>
    </figure>
  );
}