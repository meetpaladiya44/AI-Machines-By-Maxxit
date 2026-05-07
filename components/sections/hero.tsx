import Image from "next/image";
import { ArrowRight, PlayCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/ui/book-demo-button";
import { GradientBlur } from "@/components/ui/gradient-blur";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { HeroMachineVisual } from "./hero-machine-visual";

const HIGHLIGHTS = [
  "WhatsApp-first workflow",
  "Direct Tally integration",
  "AI invoice & PDF reading",
  "Bulk sales-invoice PDF export (TDL add-on)",
  "Runs on your machine — not the cloud",
];

const TRUSTED_INTEGRATIONS = [
  { name: "WhatsApp", img: "/images/whatsapp.png" },
  { name: "Tally", img: "/images/tally-logo-black.svg" },
  { name: "OpenClaw", img: "/images/openclaw.jpg" },
];
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <GradientBlur variant="hero" />
      <GridPattern />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="relative z-10 flex flex-col justify-center">
          <Reveal direction="up">
            <Badge tone="emerald" className="w-fit">
              <Sparkles className="h-3 w-3" />
              AI Machines · On-prem AI
            </Badge>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <h1 className="mt-5 text-pretty text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl lg:text-[45px]">
              Automate accounting entries from{" "}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-emerald-600 via-emerald-500 to-emerald-400 bg-clip-text text-transparent">
                  WhatsApp
                </span>
              </span>{" "}
              to{" "}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-violet-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  Tally
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 14"
                  className="absolute -bottom-2 left-0 h-3 w-full text-violet-300"
                >
                  <path
                    d="M2 9 C 50 2, 110 2, 198 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              with AI.
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
              Send invoices, bills, receipts, PDFs, or images on WhatsApp. Our
              on-device AI agent reads, understands, and creates accurate
              accounting entries directly in Tally — data stays on your firm&apos;s
              hardware — and gives you exportable reports instantly (including
              bulk sales-invoice PDF exports via our TDL add-on).
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {HIGHLIGHTS.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm leading-snug text-zinc-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <BookDemoButton size="lg">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </BookDemoButton>
              <Button href="#demo" variant="secondary" size="lg">
                <PlayCircle className="h-4 w-4" />
                See Demo
              </Button>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-6">
              <span className="text-xs uppercase tracking-wider text-zinc-500">
                Works with
              </span>
              <div className="flex items-center gap-3">
                {TRUSTED_INTEGRATIONS.map((t) => (
                  <span
                    key={t.name}
                    className="inline-flex h-8 items-center justify-center rounded-lg border border-zinc-200 bg-white px-2 shadow-sm"
                    title={t.name}
                  >
                    <Image
                      src={t.img}
                      alt={t.name}
                      width={t.name === "Tally" ? 44 : 18}
                      height={18}
                      className="h-5 w-auto object-contain"
                    />
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative z-10 flex items-center justify-center">
          <Reveal direction="left" delay={0.1} className="w-full">
            <HeroMachineVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
