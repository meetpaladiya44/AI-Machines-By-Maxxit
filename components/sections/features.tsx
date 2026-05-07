
"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  CalendarRange,
  CheckCircle2,
  ChevronRight,
  FileOutput,
  FolderOpen,
  HardDrive,
  PlugZap,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Card, CardIcon } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ADDON_STEPS = [
  {
    step: 1,
    title: "Add-on inside Tally (TDL)",
    desc: "A TDL (Tally Definition Language) add-on adds “Bulk Sales PDF Export” directly to your Tally menu.",
    img: "/images/AddOn-Bulk-Entries-Feature.png",
    alt: "Tally menu showing the Bulk Sales PDF Export add-on entry",
    tone: "emerald" as const,
    icon: PlugZap,
  },
  {
    step: 2,
    title: "Choose date range + folder",
    desc: "Select from/to dates and an export folder — no need to enter a PDF filename per invoice.",
    img: "/images/AddOn-Date-Selection.png",
    alt: "Add-on screen showing date range and export folder selection",
    tone: "violet" as const,
    icon: CalendarRange,
  },
  {
    step: 3,
    title: "Bulk PDFs generated",
    desc: "Tally exports all eligible sales invoices into a folder in one run — perfect for month-end packs.",
    img: "/images/AddOn-Downloaded-Bulk-PDFs.png",
    alt: "Folder view showing many exported invoice PDFs",
    tone: "sky" as const,
    icon: FolderOpen,
  },
] as const;

export function Features() {
  const reduce = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.25, once: false });
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    if (!inView) return;
    const id = window.setInterval(() => {
      setActiveStep((s) => (s + 1) % ADDON_STEPS.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const step = ADDON_STEPS[activeStep];

  return (
    <section
      id="features"
      ref={rootRef}
      className="relative py-20 sm:py-24"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-linear-to-b from-violet-50/50 via-white to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="violet" className="mx-auto">
              TDL add-on and other features
            </Badge>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Bulk Sales Invoice PDF Export — inside Tally
            </h2>
            <p className="mt-3 text-balance text-zinc-600">
              Tally typically exports invoices one PDF at a time. Our TDL (Tally
              Definition Language) add-on enables bulk exports to a folder —
              built for audits, client sharing, and month-end packs.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Stepper */}
          <Reveal direction="right" className="lg:col-span-2">
            <div className="flex flex-col gap-3">
              {ADDON_STEPS.map((s, idx) => {
                const active = idx === activeStep;
                const Icon = s.icon;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={cn(
                      "group w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60",
                      active
                        ? "border-emerald-300 ring-1 ring-emerald-500/25"
                        : "border-zinc-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]",
                    )}
                    aria-selected={active}
                    aria-controls="addon-viewer"
                  >
                    <div className="flex items-start gap-3">
                      <CardIcon tone={active ? "emerald" : "zinc"} className="h-9 w-9 rounded-xl">
                        <Icon className="h-4.5 w-4.5" />
                      </CardIcon>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="text-sm font-semibold text-zinc-900">
                            {s.title}
                          </div>
                          <ChevronRight
                            className={cn(
                              "mt-0.5 h-4 w-4 shrink-0 text-zinc-300 transition-transform",
                              active
                                ? "translate-x-0.5 text-emerald-400"
                                : "group-hover:translate-x-0.5",
                            )}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-1 text-xs leading-relaxed text-zinc-600">
                          {s.desc}
                        </div>
                        <div className="mt-2 text-[11px] font-medium text-zinc-500">
                          Step {s.step} of {ADDON_STEPS.length}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Viewer */}
          <Reveal direction="left" className="lg:col-span-3">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[28px] bg-linear-to-br from-emerald-200/35 via-violet-200/25 to-rose-200/25 blur-2xl"
              />
              <figure
                className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_28px_60px_-34px_rgba(15,23,42,0.25)]"
                aria-live="polite"
              >
                <div
                  id="addon-viewer"
                  className="relative aspect-16/10 w-full bg-zinc-50"
                >
                  <motion.div
                    key={step.img}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.35,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={step.img}
                      alt={step.alt}
                      fill
                      sizes="(min-width: 1024px) 720px, 100vw"
                      className="object-contain"
                      priority={activeStep === 0}
                    />
                  </motion.div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-white/70 via-transparent to-transparent"
                  />
                </div>
                <figcaption className="flex flex-col gap-2 border-t border-zinc-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-zinc-900">
                      {step.title}
                    </div>
                    <div className="mt-0.5 text-xs leading-relaxed text-zinc-600">
                      {step.desc}
                    </div>
                  </div>
                  <div className="shrink-0 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/15">
                    <CheckCircle2 className="h-4 w-4" />
                    Bulk export enabled
                  </div>
                </figcaption>
              </figure>

              {/* Thumbnails (desktop) */}
              <div className="mt-4 hidden grid-cols-3 gap-3 lg:grid">
                {ADDON_STEPS.map((s, idx) => (
                  <button
                    key={s.img}
                    type="button"
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border bg-white p-2 text-left shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60",
                      idx === activeStep
                        ? "border-emerald-300 ring-1 ring-emerald-500/25"
                        : "border-zinc-200 hover:border-zinc-300",
                    )}
                    onClick={() => setActiveStep(idx)}
                    aria-label={`Show add-on step ${s.step}`}
                    aria-controls="addon-viewer"
                    aria-selected={idx === activeStep}
                  >
                    <div className="relative aspect-16/10 w-full rounded-xl bg-zinc-50 ring-1 ring-zinc-100">
                      <Image
                        src={s.img}
                        alt=""
                        fill
                        sizes="220px"
                        className="object-contain"
                      />
                    </div>
                    <div className="mt-2 truncate text-xs font-semibold text-zinc-800">
                      {s.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Supporting capabilities */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Beyond one-by-one exports",
              desc: "Generate many invoice PDFs in one run — ideal for audits and client packs.",
              icon: FileOutput,
              tone: "violet" as const,
            },
            {
              title: "Works with Tally workflows",
              desc: "Lives inside Tally as a TDL add-on — no new portal for your team to learn.",
              icon: PlugZap,
              tone: "emerald" as const,
            },
            {
              title: "On-prem execution",
              desc: "Runs on your local system — no need to send invoices to third-party cloud servers.",
              icon: HardDrive,
              tone: "sky" as const,
            },
            {
              title: "Human review stays intact",
              desc: "Your reviewers can still verify entries and exports as part of normal CA workflows.",
              icon: ShieldCheck,
              tone: "amber" as const,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={0.05}>
                <Card className="flex h-full flex-col">
                  <CardIcon tone={item.tone}>
                    <Icon className="h-5 w-5" />
                  </CardIcon>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {item.desc}
                  </p>
                  <div className="mt-auto" />
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
