"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Sparkles } from "lucide-react";

const LIGHTNING_PATHS = [
  { d: "M 120 40 L 95 95 L 130 100 L 85 180", delay: 0, color: "#34d399" },
  { d: "M 480 60 L 505 120 L 470 130 L 520 200", delay: 0.4, color: "#60a5fa" },
  { d: "M 80 320 L 110 260 L 75 250 L 120 160", delay: 0.8, color: "#34d399" },
  { d: "M 520 300 L 490 240 L 525 220 L 470 140", delay: 1.2, color: "#60a5fa" },
  { d: "M 300 20 L 285 80 L 315 85 L 275 150", delay: 0.2, color: "#6ee7b7" },
  { d: "M 300 460 L 320 400 L 285 395 L 330 320", delay: 0.6, color: "#93c5fd" },
];

function FlowDot({ pathId, delay, color }: { pathId: string; delay: number; color: string }) {
  return (
    <circle r="4" fill={color} filter="url(#heroOrbGlow)">
      <animateMotion
        dur="5s"
        begin={`${delay}s`}
        repeatCount="indefinite"
        rotate="auto"
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );
}

export function HeroMachineVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto flex w-full max-w-[min(100%,560px)] flex-col items-center justify-center px-2 sm:px-0">
      <div className="relative w-full max-w-[360px] aspect-square sm:max-w-[480px] md:max-w-[520px]">
        {/* Maxxit banner ambient */}
        <div
          className="pointer-events-none absolute inset-[-12%] -z-10 opacity-[0.38] mix-blend-screen"
          aria-hidden
        >
          <Image
            src="/images/maxxit-banner-image.png"
            alt=""
            fill
            sizes="560px"
            className="object-cover blur-2xl"
            priority
          />
        </div>

        {/* Neon ring */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(52,211,153,0.45)_0%,rgba(96,165,250,0.2)_45%,transparent_70%)] blur-3xl"
          aria-hidden
        />

        {/* Lightning layer */}
        <svg
          viewBox="0 0 600 480"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <filter id="boltGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="heroOrbGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="g" />
              <feMerge>
                <feMergeNode in="g" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <path
              id="orbitIn"
              d="M 300 240 m -140 0 a 140 140 0 1 1 280 0 a 140 140 0 1 1 -280 0"
              fill="none"
            />
            <path
              id="orbitOut"
              d="M 300 240 m -175 0 a 175 175 0 1 1 350 0 a 175 175 0 1 1 -350 0"
              fill="none"
            />
          </defs>

          {!reduce &&
            LIGHTNING_PATHS.map((bolt, i) => (
              <motion.path
                key={i}
                d={bolt.d}
                fill="none"
                stroke={bolt.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#boltGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1, 0],
                  opacity: [0, 1, 0.85, 0],
                }}
                transition={{
                  duration: 2.8,
                  delay: bolt.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

          {!reduce && (
            <>
              <FlowDot pathId="orbitIn" delay={0} color="#10b981" />
              <FlowDot pathId="orbitIn" delay={1.6} color="#7c3aed" />
              <FlowDot pathId="orbitOut" delay={0.8} color="#34d399" />
            </>
          )}
        </svg>

        {/* Orbiting chips */}
        <motion.div
          className="absolute left-[8%] top-[18%] z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200/90 bg-white/95 shadow-lg backdrop-blur"
          animate={reduce ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/whatsapp.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-lg object-cover"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-[16%] right-[6%] z-20 flex h-12 w-14 items-center justify-center rounded-2xl border border-zinc-200/90 bg-white/95 shadow-lg backdrop-blur"
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Image
            src="/images/tally-logo-black.svg"
            alt=""
            width={40}
            height={20}
            className="h-5 w-auto object-contain"
          />
        </motion.div>

        {/* CPU */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pt-4">
          <div
            className="relative h-[min(72vw,380px)] w-[min(58vw,300px)] sm:h-[420px] sm:w-[320px]"
            style={{
              filter:
                "drop-shadow(0 0 28px rgba(52,211,153,0.35)) drop-shadow(0 24px 48px rgba(15,23,42,0.35))",
            }}
          >
            <Image
              src="/images/cpu.png"
              alt="On-premise AI machine"
              fill
              sizes="(max-width: 640px) 72vw, 420px"
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>

        {/* On-device AI agent chip */}
        <motion.div
          className="absolute right-[4%] top-[12%] z-30 max-w-[200px] sm:right-[2%] sm:top-[8%]"
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative rounded-2xl border border-emerald-200/80 bg-white/95 p-3 shadow-[0_20px_50px_-20px_rgba(16,185,129,0.45)] backdrop-blur">
            <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-emerald-400/30 via-violet-400/20 to-sky-400/30 blur-lg" />
            <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-xl ring-1 ring-zinc-200/80">
              <Image
                src="/images/ai-agent.avif"
                alt="On-device AI agent"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="mt-2 flex items-center justify-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-800 ring-1 ring-emerald-600/15">
              <Sparkles className="h-3 w-3 shrink-0" />
              On-device AI agent
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-20 mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-3 py-1.5 text-xs font-medium text-emerald-900 shadow-sm backdrop-blur">
        <Cpu className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
        <span>Runs on-prem · Your data stays on your CPU</span>
      </div>
    </div>
  );
}
