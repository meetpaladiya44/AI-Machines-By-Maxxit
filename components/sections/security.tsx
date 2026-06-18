"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";
import {
  HardDrive,
  BadgeCheck,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { Card, CardIcon } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { GradientBlur } from "@/components/ui/gradient-blur";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const ITEMS = [
  {
    title: "On-premises by design",
    desc: "Files, extracted data, and post history stay on your local system - not third-party cloud.",
    icon: HardDrive,
    tone: "emerald" as const,
  },
  {
    title: "Human-in-the-loop review",
    desc: "Every voucher goes through review - nothing is silently auto-posted.",
    icon: BadgeCheck,
    tone: "sky" as const,
  },
  {
    title: "Company matching guards",
    desc: "Detects the right Tally company and blocks posting when active company mismatches.",
    icon: Building2,
    tone: "amber" as const,
  },
  {
    title: "GSTIN reconciliation",
    desc: "Flags invoice vs ledger GSTIN mismatches before any voucher is posted.",
    icon: ShieldCheck,
    tone: "rose" as const,
  },
];

const CONNECTOR_PATHS = [
  { id: "sec-tl", d: "M 50 50 L 24 26" },
  { id: "sec-tr", d: "M 50 50 L 76 26" },
  { id: "sec-bl", d: "M 50 50 L 24 74" },
  { id: "sec-br", d: "M 50 50 L 76 74" },
] as const;

const GLOW_ORB: Record<(typeof ITEMS)[number]["tone"], string> = {
  emerald: "bg-emerald-500/20",
  sky: "bg-sky-500/20",
  amber: "bg-amber-500/20",
  rose: "bg-rose-500/20",
};

export function Security() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: true });
  const reduce = useReducedMotion();
  const [pathLengths, setPathLengths] = React.useState<Record<string, number>>(
    {}
  );
  const [linesActive, setLinesActive] = React.useState(false);

  const measurePaths = React.useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lengths: Record<string, number> = {};
    for (const { id } of CONNECTOR_PATHS) {
      const el = svg.querySelector<SVGPathElement>(`#${id}`);
      if (el) lengths[id] = el.getTotalLength();
    }
    if (Object.keys(lengths).length > 0) setPathLengths(lengths);
  }, []);

  React.useLayoutEffect(() => {
    measurePaths();
  }, [measurePaths]);

  React.useEffect(() => {
    if (inView && !reduce) setLinesActive(true);
  }, [inView, reduce]);

  const showLines = reduce || linesActive;

  return (
    <section
      id="security"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-dark py-20 text-white sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,204,106,0.12),transparent_50%)]"
      />
      <GradientBlur variant="cta" className="opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading className="text-balance text-white">
              On-premises & safe -{" "}
              <BrandHighlight>data stays on your machine</BrandHighlight>
            </SectionHeading>
            <p className="mt-3 text-balance text-zinc-400">
              TallyPrime stays your system of record - Maxxit processes locally
              and keeps you in control at every step.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12 lg:mt-16">
          <svg
            ref={svgRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {CONNECTOR_PATHS.map(({ id, d }) => {
              const len = pathLengths[id] ?? 80;
              return (
                <path
                  key={id}
                  id={id}
                  d={d}
                  className={cn(
                    "flow-line flow-line-security",
                    showLines
                      ? reduce
                        ? "is-drawn"
                        : "is-animating"
                      : "opacity-0"
                  )}
                  style={{ "--path-len": len } as React.CSSProperties}
                />
              );
            })}
          </svg>

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <div
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-full border border-brand-green/30 bg-brand-green/10 shadow-[0_0_40px_-8px_rgba(0,204,106,0.5)] backdrop-blur-sm",
                !reduce && "animate-gentle-pulse"
              )}
            >
              <ShieldCheck className="h-9 w-9 text-brand-green" />
            </div>
          </div>

          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:gap-8">
            {ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.05}>
                  <Card
                    hover={false}
                    className="card-shine group relative flex h-full flex-col overflow-hidden border-white/10 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8 hover:shadow-[0_22px_40px_-18px_rgba(0,204,106,0.15)]"
                  >
                    <div
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
                        GLOW_ORB[item.tone]
                      )}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    <CardIcon
                      tone={item.tone}
                      className="relative transition-transform duration-300 group-hover:scale-105"
                    >
                      <Icon className="h-5 w-5" />
                    </CardIcon>
                    <h3 className="relative mt-4 text-base font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-zinc-400">
                      {item.desc}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}