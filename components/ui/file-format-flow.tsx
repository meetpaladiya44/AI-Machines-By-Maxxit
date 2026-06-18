"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FILE_FORMAT_ICONS,
  SUPPORTED_INPUT_FORMATS,
  type SupportedInputFormat,
} from "@/lib/landing-images";

type FileFormatFlowProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  showCaption?: boolean;
};

const SIZE_MAP = {
  sm: { icon: 40, gap: "gap-2", text: "text-[10px]" },
  md: { icon: 52, gap: "gap-3", text: "text-xs" },
  lg: { icon: 64, gap: "gap-4", text: "text-sm" },
} as const;

function FormatIcon({
  format,
  size,
  showLabel,
}: {
  format: SupportedInputFormat;
  size: "sm" | "md" | "lg";
  showLabel: boolean;
}) {
  const icon = FILE_FORMAT_ICONS[format];
  const px = SIZE_MAP[size].icon;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-zinc-200/80 transition-transform duration-200 hover:-translate-y-0.5">
        <Image
          src={icon.src}
          alt={icon.alt}
          width={px}
          height={px}
          className="h-auto w-auto object-contain"
          style={{ width: px, height: px }}
        />
      </div>
      {showLabel ? (
        <span
          className={cn(
            "font-medium text-zinc-600",
            SIZE_MAP[size].text
          )}
        >
          {icon.label}
        </span>
      ) : null}
    </div>
  );
}

export function FileFormatFlow({
  className,
  size = "md",
  showLabels = true,
  showCaption = true,
}: FileFormatFlowProps) {
  const json = FILE_FORMAT_ICONS.json;
  const px = SIZE_MAP[size].icon;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className={cn(
          "flex flex-wrap items-center justify-center",
          SIZE_MAP[size].gap
        )}
        role="img"
        aria-label="Supported file formats PDF, images, Excel, and XLSX are extracted by AI into structured JSON"
      >
        {SUPPORTED_INPUT_FORMATS.map((format, index) => (
          <div key={format} className="flex items-center gap-2 sm:gap-3">
            {index > 0 ? (
              <span
                className="hidden text-zinc-300 sm:inline"
                aria-hidden
              >
                ·
              </span>
            ) : null}
            <FormatIcon format={format} size={size} showLabel={showLabels} />
          </div>
        ))}

        <div className="flex items-center gap-2 sm:gap-3">
          <ArrowRight
            className={cn(
              "shrink-0 text-brand-green",
              size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
            )}
            aria-hidden
          />
          <div className="flex flex-col items-center gap-1.5">
            <div className="rounded-xl bg-brand-green/10 p-1.5 shadow-sm ring-1 ring-brand-green/25 transition-transform duration-200 hover:-translate-y-0.5">
              <Image
                src={json.src}
                alt={json.alt}
                width={px}
                height={px}
                className="h-auto w-auto object-contain"
                style={{ width: px, height: px }}
              />
            </div>
            {showLabels ? (
              <span
                className={cn(
                  "font-semibold text-brand-green",
                  SIZE_MAP[size].text
                )}
              >
                {json.label}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {showCaption ? (
        <p className="mt-3 max-w-lg text-center text-xs leading-relaxed text-zinc-500 sm:text-sm">
          AI reads PDFs, images, and spreadsheets - extracts structured
          voucher-ready fields (JSON) for Tally matching and review. No generic
          templates.
        </p>
      ) : null}
    </div>
  );
}