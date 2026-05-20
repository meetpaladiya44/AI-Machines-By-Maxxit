"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  MessageSquareText,
  ArrowRight,
  Zap,
  Clock,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Floating particles component                                       */
/* ------------------------------------------------------------------ */

/* 8 lightweight CSS-only particles — no JS animation overhead */
const PARTICLES = [
  { x: 12, y: 18, s: 3, d: "6s" },
  { x: 78, y: 25, s: 4, d: "8s" },
  { x: 35, y: 72, s: 2, d: "7s" },
  { x: 90, y: 60, s: 5, d: "9s" },
  { x: 55, y: 10, s: 3, d: "5s" },
  { x: 20, y: 85, s: 4, d: "7s" },
  { x: 65, y: 45, s: 2, d: "6s" },
  { x: 42, y: 30, s: 3, d: "8s" },
];

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-violet-400/20 animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            animationDuration: p.d,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat pill                                                           */
/* ------------------------------------------------------------------ */

function StatPill({
  icon: Icon,
  label,
  value,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-center gap-3 rounded-2xl border border-zinc-200/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/10 to-emerald-500/10 text-violet-600 ring-1 ring-inset ring-violet-500/15">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-lg font-bold tracking-tight text-zinc-900">
          {value}
        </div>
        <div className="text-xs text-zinc-500">{label}</div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function InvoiceGeneration() {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);

  /* ---- GSAP dramatic scroll-scrubbed 3D card entrance ---- */
  const leftCardRef = React.useRef<HTMLDivElement>(null);
  const rightCardRef = React.useRef<HTMLDivElement>(null);
  const leftTriggerRef = React.useRef<HTMLDivElement>(null);
  const rightTriggerRef = React.useRef<HTMLDivElement>(null);
  const panelsWrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reduce) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        /* --- LEFT card: sweeps in from the left with a 3D flip --- */
        if (leftCardRef.current && leftTriggerRef.current) {
          gsap.fromTo(
            leftCardRef.current,
            {
              x: -240,
              rotateY: -30,
              scale: 0.82,
              opacity: 0,
              transformOrigin: "left center",
            },
            {
              x: 0,
              rotateY: 0,
              scale: 1,
              opacity: 1,
              force3d: true,
              ease: "none",
              scrollTrigger: {
                trigger: leftTriggerRef.current,
                start: "top 90%",
                end: "top 35%",
                scrub: true,
              },
            }
          );
        }

        /* --- RIGHT card: sweeps in from the right with opposite flip --- */
        if (rightCardRef.current && rightTriggerRef.current) {
          gsap.fromTo(
            rightCardRef.current,
            {
              x: 240,
              rotateY: 30,
              scale: 0.82,
              opacity: 0,
              transformOrigin: "right center",
            },
            {
              x: 0,
              rotateY: 0,
              scale: 1,
              opacity: 1,
              force3d: true,
              ease: "none",
              scrollTrigger: {
                trigger: rightTriggerRef.current,
                start: "top 90%",
                end: "top 35%",
                scrub: true,
              },
            }
          );
        }
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, [reduce]);

  return (
    <section
      id="invoice-generation"
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* ---- Background ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-50/80" />
        {/* Large blurred orbs */}
        <div className="absolute -left-32 top-1/4 h-[600px] w-[600px] rounded-full bg-violet-100/40 blur-[140px]" />
        <div className="absolute -right-32 bottom-1/4 h-[500px] w-[500px] rounded-full bg-emerald-100/35 blur-[120px]" />
        <div className="absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-sky-100/20 blur-[100px]" />
        <FloatingParticles />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---- Header ---- */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="violet" className="mx-auto">
              <FileText className="mr-1 h-3 w-3" />
              Invoice generation
            </Badge>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Text in, professional invoice out — in seconds
            </h2>
            <p className="mt-3 text-balance text-zinc-600">
              Share sales voucher or invoice details on WhatsApp. Our AI agent
              parses every field and posts clean, GST-ready entries directly in
              Tally.
            </p>
          </div>
        </Reveal>

        {/* ---- Main showcase: WhatsApp inputs above, generated PDF below ---- */}
        <div
          ref={panelsWrapRef}
          className="mt-16 grid items-start gap-6 lg:grid-cols-2"
          style={{ perspective: "1200px" }}
        >
          {/* LEFT PANEL — Sales voucher entry */}
          <div ref={leftTriggerRef}>
          <div ref={leftCardRef} style={{ transformStyle: "preserve-3d" }}>
            <div className="group relative">
              {/* Glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-violet-200/40 via-indigo-200/30 to-sky-200/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_28px_60px_-24px_rgba(15,23,42,0.18)] transition-all duration-500 hover:shadow-[0_32px_70px_-24px_rgba(91,33,182,0.22)]">
                {/* Header bar */}
                <div className="flex items-center gap-3 border-b border-zinc-100 bg-gradient-to-r from-violet-50/80 to-zinc-50/80 px-5 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 ring-1 ring-inset ring-violet-500/20">
                    <MessageSquareText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">
                      Sales Voucher Entry
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      WhatsApp prompt posted to Tally
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-600/15">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      Live
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div className="relative aspect-[16/10] w-full bg-zinc-950">
                  <Image
                    src="/images/Sales-Voucher-Entry.png"
                    alt="WhatsApp chat showing AI Agent by Maxxit posting invoice data as a Sales Voucher in ABC Traders"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3">
                  <span className="text-xs font-medium text-zinc-500">
                    Step 1 · Send sales voucher details
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-0.5 text-[11px] font-semibold text-violet-700 ring-1 ring-inset ring-violet-600/15">
                    <MessageSquareText className="h-3 w-3" />
                    WhatsApp
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* RIGHT PANEL — Sales invoice generation */}
          <div ref={rightTriggerRef}>
          <div ref={rightCardRef} style={{ transformStyle: "preserve-3d" }}>
            <div className="group relative">
              {/* Glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-emerald-200/40 via-sky-200/30 to-violet-200/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_28px_60px_-24px_rgba(15,23,42,0.18)] transition-all duration-500 hover:shadow-[0_32px_70px_-24px_rgba(16,185,129,0.22)]">
                {/* Header bar */}
                <div className="flex items-center gap-3 border-b border-zinc-100 bg-gradient-to-r from-emerald-50/80 to-zinc-50/80 px-5 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 ring-1 ring-inset ring-emerald-500/20">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">
                      Sales Invoice Generation
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Invoice workflow handled by AI
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-600/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Tally
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div className="relative aspect-[16/10] w-full bg-zinc-950">
                  <Image
                    src="/images/Sales-Invoice-Generation.png"
                    alt="AI Agent by Maxxit sales invoice generation workflow screenshot"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3">
                  <span className="text-xs font-medium text-zinc-500">
                    Step 2 · Sales invoice generated
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/15">
                    <FileText className="h-3 w-3" />
                    Output
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <motion.div
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-violet-50 text-emerald-600 shadow-sm"
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className="h-5 w-5 rotate-90" />
          </motion.div>
        </div>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-8 max-w-4xl">
            <div className="group relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-emerald-200/40 via-violet-200/30 to-sky-200/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_28px_60px_-24px_rgba(15,23,42,0.18)] transition-all duration-500 hover:shadow-[0_32px_70px_-24px_rgba(16,185,129,0.22)]">
                <div className="flex items-center gap-3 border-b border-zinc-100 bg-gradient-to-r from-emerald-50/80 to-violet-50/70 px-5 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 ring-1 ring-inset ring-emerald-500/20">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">
                      Generated PDF Invoice
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Clean, share-ready invoice output
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-600/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      PDF
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[16/10] w-full bg-zinc-50">
                  <Image
                    src="/images/Sales_PDF_Generated.png"
                    alt="Generated PDF tax invoice showing invoice details, item table, GST calculations and grand total"
                    fill
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    className="object-contain"
                  />
                </div>

                <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3">
                  <span className="text-xs font-medium text-zinc-500">
                    Step 3 · PDF ready to share
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/15">
                    <FileText className="h-3 w-3" />
                    PDF output
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---- Stats row ---- */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          <StatPill
            icon={Zap}
            label="Generation time"
            value="< 5s"
            delay={0}
          />
          <StatPill
            icon={FileText}
            label="GST-compliant"
            value="100%"
            delay={0.08}
          />
          <StatPill
            icon={Clock}
            label="Available"
            value="24/7"
            delay={0.16}
          />
          <StatPill
            icon={Shield}
            label="Data privacy"
            value="On-prem"
            delay={0.24}
          />
        </div>

        {/* ---- Bottom feature highlights ---- */}
        <div className="mx-auto mt-14 max-w-4xl">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Natural language input",
                  desc: "No forms, no templates. Just send sales voucher or invoice details on WhatsApp in plain language.",
                  gradient: "from-violet-500 to-indigo-500",
                },
                {
                  title: "Instant Tally posting",
                  desc: "The AI agent parses your text, maps ledgers, items, quantities and tax rates, then posts the entry.",
                  gradient: "from-emerald-500 to-teal-500",
                },
                {
                  title: "Tally-ready format",
                  desc: "Every generated invoice follows your company's voucher class, GST structure, and naming conventions.",
                  gradient: "from-sky-500 to-blue-500",
                },
              ].map((item, idx) => (
                <Reveal key={item.title} delay={0.05 * (idx + 1)}>
                  <div className="group relative flex h-full flex-col rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
                    {/* Gradient accent bar */}
                    <div
                      className={cn(
                        "mb-4 h-1 w-10 rounded-full bg-gradient-to-r opacity-80 transition-all duration-300 group-hover:w-16 group-hover:opacity-100",
                        item.gradient
                      )}
                    />
                    <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
