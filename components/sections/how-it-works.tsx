"use client";

import * as React from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    step: 1,
    label: "Prompt",
    title: "WhatsApp prompt → posting instructions",
    desc: "User sends PDFs and specifies company, voucher class, date, and ledgers for posting.",
    img: "/images/AI-Prompt-Tally.png",
    alt: "WhatsApp prompt showing invoice and posting instructions for Tally",
    accent: "emerald" as const,
  },
  {
    step: 2,
    label: "Process",
    title: "Agent response → entry posted",
    desc: "Agent confirms voucher class, voucher date, ledgers used, and posting outcome.",
    img: "/images/AI-Result-Tally.png",
    alt: "WhatsApp response confirming the Tally entry was created",
    accent: "violet" as const,
  },
  {
    step: 3,
    label: "Result",
    title: "Tally GUI → voucher visible",
    desc: "Tally shows the created voucher with taxes, ledgers, and narration — ready for review.",
    img: "/images/Tally-Cement-Record-GUI.png",
    alt: "Tally GUI showing the successfully created voucher entry",
    accent: "sky" as const,
  },
] as const;

const ACCENT_MAP = {
  emerald: {
    dot: "bg-emerald-500 shadow-[0_0_20px_4px_rgba(16,185,129,0.45)]",
    dotInactive: "bg-zinc-300",
    ring: "ring-emerald-500/30",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    number: "text-emerald-600",
    gradient: "from-emerald-500/10 to-transparent",
    border: "border-emerald-200/60",
    glow: "shadow-[0_20px_60px_-20px_rgba(16,185,129,0.25)]",
  },
  violet: {
    dot: "bg-violet-500 shadow-[0_0_20px_4px_rgba(139,92,246,0.45)]",
    dotInactive: "bg-zinc-300",
    ring: "ring-violet-500/30",
    badge: "bg-violet-50 text-violet-700 ring-violet-600/15",
    number: "text-violet-600",
    gradient: "from-violet-500/10 to-transparent",
    border: "border-violet-200/60",
    glow: "shadow-[0_20px_60px_-20px_rgba(139,92,246,0.25)]",
  },
  sky: {
    dot: "bg-sky-500 shadow-[0_0_20px_4px_rgba(14,165,233,0.45)]",
    dotInactive: "bg-zinc-300",
    ring: "ring-sky-500/30",
    badge: "bg-sky-50 text-sky-700 ring-sky-600/15",
    number: "text-sky-600",
    gradient: "from-sky-500/10 to-transparent",
    border: "border-sky-200/60",
    glow: "shadow-[0_20px_60px_-20px_rgba(14,165,233,0.25)]",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HowItWorks() {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = React.useState(-1);

  /* ---- GSAP ScrollTrigger setup ---- */
  React.useEffect(() => {
    if (reduce) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        /* ---- Progress line fill ---- */
        if (progressRef.current && timelineRef.current) {
          gsap.fromTo(
            progressRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 60%",
                end: "bottom 60%",
                scrub: 0.6,
              },
            }
          );
        }

        /* ---- Each step card ---- */
        stepRefs.current.forEach((el, i) => {
          if (!el) return;

          const isLeft = i % 2 === 0;

          /* Card slide-in */
          gsap.fromTo(
            el,
            {
              opacity: 0,
              x: isLeft ? -60 : 60,
              y: 30,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );

          /* Image parallax (keep subtle to avoid cropping) */
          const img = el.querySelector("[data-parallax]");
          if (img) {
            gsap.fromTo(
              img,
              { y: 16, scale: 1.03 },
              {
                y: -16,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.45,
                },
              }
            );
          }

          /* Active step tracking */
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => setActiveIdx(i),
            onEnterBack: () => setActiveIdx(i),
          });
        });
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, [reduce]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-zinc-50 via-white to-zinc-50/80" />
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-100/30 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-[500px] w-[500px] rounded-full bg-violet-100/25 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="sky" className="mx-auto">
            How it works
          </Badge>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Prompt → agent → Tally: the whole loop, visually
          </h2>
          <p className="mt-3 text-balance text-zinc-600">
            See the real flow your team follows: a WhatsApp instruction, an
            agent confirmation, and the final voucher inside Tally.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div
        ref={timelineRef}
        className="relative mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        {/* Vertical line (background) */}
        <div
          aria-hidden="true"
          className="absolute left-4 top-0 hidden h-full w-0.5 rounded-full bg-zinc-200/80 sm:left-1/2 sm:-translate-x-1/2 md:block"
        />
        {/* Vertical line (progress fill) */}
        <div
          ref={progressRef}
          aria-hidden="true"
          className="absolute left-4 top-0 hidden h-full w-0.5 origin-top rounded-full bg-linear-to-b from-emerald-500 via-violet-500 to-sky-500 sm:left-1/2 sm:-translate-x-1/2 md:block"
          style={{ transformOrigin: "top center" }}
        />

        <div className="flex flex-col gap-20 md:gap-28">
          {STEPS.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            const colors = ACCENT_MAP[step.accent];
            const isActive = idx <= activeIdx;

            return (
              <div
                key={step.step}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                className="relative"
              >
                {/* Center dot (desktop) */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute left-4 top-8 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full ring-4 ring-white transition-all duration-700 sm:left-1/2 md:block",
                    isActive ? colors.dot : colors.dotInactive
                  )}
                />

                <div
                  className={cn(
                    "grid items-center gap-8 md:grid-cols-2 md:gap-16",
                    /* Alternate sides */
                    isLeft ? "" : "md:[direction:rtl]"
                  )}
                >
                  {/* Text card */}
                  <div
                    className={cn(
                      "relative",
                      isLeft
                        ? "md:text-right md:pr-16"
                        : "md:text-left md:pl-16 md:[direction:ltr]"
                    )}
                  >
                    {/* Step number */}
                    <div
                      className={cn(
                        "mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
                        colors.badge
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white",
                          step.accent === "emerald"
                            ? "bg-emerald-500"
                            : step.accent === "violet"
                              ? "bg-violet-500"
                              : "bg-sky-500"
                        )}
                      >
                        {step.step}
                      </span>
                      {step.label}
                    </div>

                    <h3 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                      {step.desc}
                    </p>

                    {/* Decorative connector line (mobile) */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "mt-6 h-0.5 w-12 rounded-full md:hidden",
                        step.accent === "emerald"
                          ? "bg-emerald-300"
                          : step.accent === "violet"
                            ? "bg-violet-300"
                            : "bg-sky-300"
                      )}
                    />
                  </div>

                  {/* Image card */}
                  <div
                    className={cn(
                      "relative md:[direction:ltr]"
                    )}
                  >
                    {/* Glow behind image */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute -inset-4 rounded-[28px] opacity-60 blur-2xl transition-opacity duration-700",
                        step.accent === "emerald"
                          ? "bg-emerald-200/40"
                          : step.accent === "violet"
                            ? "bg-violet-200/40"
                            : "bg-sky-200/40",
                        isActive ? "opacity-60" : "opacity-0"
                      )}
                    />

                    <div
                      className={cn(
                        "relative overflow-hidden rounded-2xl border bg-white transition-all duration-500 sm:rounded-3xl",
                        colors.border,
                        isActive ? colors.glow : "shadow-lg"
                      )}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-50">
                        <div
                          data-parallax={step.step === 3 ? undefined : true}
                          className="absolute inset-0"
                        >
                          <Image
                            src={step.img}
                            alt={step.alt}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-contain"
                            priority={idx === 0}
                          />
                        </div>
                      </div>

                      {/* Bottom caption bar */}
                      <div className="flex items-center justify-between border-t border-zinc-100 px-4 py-3 sm:px-5">
                        <span className="text-xs font-medium text-zinc-500">
                          Step {step.step} of {STEPS.length}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset",
                            colors.badge
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              isActive
                                ? step.accent === "emerald"
                                  ? "bg-emerald-500 animate-pulse"
                                  : step.accent === "violet"
                                    ? "bg-violet-500 animate-pulse"
                                    : "bg-sky-500 animate-pulse"
                                : "bg-zinc-300"
                            )}
                          />
                          {step.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
