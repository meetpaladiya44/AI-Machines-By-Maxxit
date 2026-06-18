"use client";

import * as React from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GradientBlur } from "@/components/ui/gradient-blur";
import { cn } from "@/lib/utils";

type Phase = "idle" | "extraction" | "process" | "sync";

const INPUTS = [
  {
    id: "purchase",
    label: "Purchase Invoice",
    icons: [
      { src: "/images/icons/file-pdf.png", alt: "PDF" },
      { src: "/images/icons/file-img.png", alt: "Image" },
      { src: "/images/icons/file-excel.png", alt: "Excel" },
    ],
    pathId: "pathPurchase",
    pathD: "M 168 72 C 280 68, 350 100, 408 158",
  },
  {
    id: "sales",
    label: "Sales Invoice",
    icons: [
      { src: "/images/icons/file-pdf.png", alt: "PDF" },
      { src: "/images/icons/file-img.png", alt: "Image" },
      { src: "/images/icons/file-excel.png", alt: "Excel" },
    ],
    pathId: "pathSales",
    pathD: "M 168 200 C 260 168, 340 162, 408 178",
  },
  {
    id: "bank",
    label: "Bank Statement",
    icons: [
      { src: "/images/icons/file-pdf.png", alt: "PDF" },
      { src: "/images/icons/file-excel.png", alt: "Excel" },
    ],
    pathId: "pathBank",
    pathD: "M 168 328 C 280 332, 350 300, 408 262",
  },
] as const;

const SYNC_PATH_ID = "pathSync";
const SYNC_PATH_D = "M 492 200 L 732 200";

const PHASE_MS: Record<Exclude<Phase, "idle">, number> = {
  extraction: 2000,
  process: 2000,
  sync: 2000,
};

function PhaseLabel({
  children,
  active,
  className,
}: {
  children: React.ReactNode;
  active: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative z-40 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold shadow-md transition-all duration-300",
        active
          ? "scale-100 bg-brand-green text-white shadow-brand-green/30 ring-2 ring-brand-green/20"
          : "scale-[0.98] bg-white text-brand-green ring-2 ring-brand-green/25 opacity-90",
        className
      )}
    >
      {children}
    </span>
  );
}

function PhaseStepper({ phase, reduce }: { phase: Phase; reduce: boolean }) {
  const steps = [
    { id: "extraction" as const, label: "Extraction" },
    { id: "process" as const, label: "Process" },
    { id: "sync" as const, label: "Sync" },
  ];
  const activeId = reduce ? "sync" : phase;

  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {steps.map((step, i) => {
        const isActive = activeId === step.id;
        return (
          <React.Fragment key={step.id}>
            {i > 0 ? (
              <ArrowRight
                className="hidden h-4 w-4 shrink-0 text-zinc-300 sm:block"
                aria-hidden
              />
            ) : null}
            <span
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300 sm:text-sm",
                isActive
                  ? "bg-brand-green text-white shadow-sm shadow-brand-green/25"
                  : "bg-zinc-100 text-zinc-500"
              )}
            >
              {step.label}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function FlippingHubLogo({
  reduce,
  processActive,
}: {
  reduce: boolean;
  processActive: boolean;
}) {
  const [flipped, setFlipped] = React.useState(false);

  React.useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setFlipped((f) => !f), 2000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const showBack = !reduce && flipped;

  return (
    <div className="relative h-12 w-12 [perspective:600px] sm:h-14 sm:w-14 lg:h-16 lg:w-16">
      <div
        className="relative h-full w-full overflow-hidden rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]"
        style={{ transform: showBack ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-full [backface-visibility:hidden]">
          <Image
            src="/images/maxxit-logo.png"
            alt="Maxxit"
            width={64}
            height={64}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Image
            src="/images/maxxit-logo.png"
            alt="Maxxit processing"
            width={64}
            height={64}
            className={cn(
              "h-full w-full rounded-full object-cover brightness-0 invert",
              processActive && "animate-gentle-pulse"
            )}
          />
        </div>
      </div>
    </div>
  );
}

function ProcessHub({
  reduce,
  processActive,
  showProcess,
  size = "lg",
}: {
  reduce: boolean;
  processActive: boolean;
  showProcess: boolean;
  size?: "lg" | "sm";
}) {
  const dim =
    size === "lg"
      ? "h-28 w-28 md:h-32 md:w-32 lg:h-36 lg:w-36"
      : "h-24 w-24 sm:h-28 sm:w-28";

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-emerald-600 shadow-xl transition-shadow duration-300",
          processActive
            ? "shadow-brand-green/40 ring-4 ring-white/40"
            : "shadow-brand-green/25",
          dim
        )}
      >
        <FlippingHubLogo reduce={reduce} processActive={processActive} />
      </div>
      <span
        className={cn(
          "mt-3 inline-flex rounded-full bg-amber-400 px-4 py-1.5 text-sm font-semibold text-white shadow-md transition-opacity duration-300",
          showProcess ? "opacity-100" : "opacity-60"
        )}
      >
        Process
      </span>
    </div>
  );
}

function TallyDestination({
  syncActive,
  reduce,
  className,
}: {
  syncActive: boolean;
  reduce: boolean;
  className?: string;
}) {
  const showPosted = syncActive || reduce;

  return (
    <div className={cn("relative pb-10", className)}>
      <div
        className={cn(
          "flex h-[88px] w-full items-center justify-center rounded-2xl border border-zinc-200/80 bg-white px-6 shadow-lg transition-shadow duration-300",
          syncActive && "shadow-brand-green/25"
        )}
      >
        <Image
          src="/images/tally-logo-black.svg"
          alt="Tally"
          width={80}
          height={32}
          className="h-8 w-auto object-contain"
        />
      </div>
      <div
        className={cn(
          "absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap text-xs font-semibold text-brand-green transition-opacity duration-300",
          showPosted ? "opacity-100" : "opacity-0"
        )}
      >
        <CheckCircle2 className="h-3.5 w-3.5" />
        Posted
      </div>
    </div>
  );
}

function DocumentCard({
  label,
  icons,
  active,
}: {
  label: string;
  icons: readonly { src: string; alt: string }[];
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[min(100%,200px)] overflow-hidden rounded-2xl border bg-white shadow-lg transition-all duration-300 sm:max-w-[200px]",
        active
          ? "border-brand-green/40 shadow-brand-green/15 ring-2 ring-brand-green/30"
          : "border-zinc-200/80 shadow-zinc-900/5"
      )}
    >
      <div className="bg-amber-400 px-3 py-2 text-center text-xs font-semibold text-white sm:px-4 sm:text-sm">
        {label}
      </div>
      <div className="flex items-center justify-center gap-2 px-4 py-4">
        {icons.map((icon) => (
          <Image
            key={icon.alt}
            src={icon.src}
            alt={icon.alt}
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
        ))}
      </div>
    </div>
  );
}

function FlowConnector({
  pathId,
  pathD,
  pathLen,
  visible,
  active,
  dimmed,
  animKey,
}: {
  pathId: string;
  pathD: string;
  pathLen: number;
  visible: boolean;
  active: boolean;
  dimmed: boolean;
  animKey: number;
}) {
  if (!visible) return null;

  const len = pathLen > 0 ? pathLen : 500;

  return (
    <path
      key={`${pathId}-${animKey}`}
      id={pathId}
      d={pathD}
      className={cn(
        "flow-line",
        active ? "is-animating" : "is-drawn",
        dimmed && "opacity-[0.35]"
      )}
      style={{ "--path-len": len } as React.CSSProperties}
    />
  );
}

function FlowCanvas({ reduce }: { reduce: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: false });
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [pathLengths, setPathLengths] = React.useState<Record<string, number>>(
    {}
  );
  const [extractAnimKey, setExtractAnimKey] = React.useState(0);
  const [syncAnimKey, setSyncAnimKey] = React.useState(0);
  const [linesDrawn, setLinesDrawn] = React.useState(false);

  const measurePaths = React.useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ids = [...INPUTS.map((i) => i.pathId), SYNC_PATH_ID];
    const lengths: Record<string, number> = {};
    for (const id of ids) {
      const el = svg.querySelector<SVGPathElement>(`#${id}`);
      if (el) lengths[id] = el.getTotalLength();
    }
    if (Object.keys(lengths).length > 0) setPathLengths(lengths);
  }, []);

  React.useLayoutEffect(() => {
    measurePaths();
  }, [measurePaths, extractAnimKey, syncAnimKey]);

  React.useEffect(() => {
    if (!inView || reduce) {
      setPhase(reduce ? "sync" : "idle");
      return;
    }

    const phases: Exclude<Phase, "idle">[] = ["extraction", "process", "sync"];
    let index = 0;
    let timeoutId = 0;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      const next = phases[index];
      setPhase(next);
      if (next === "extraction") {
        setExtractAnimKey((k) => k + 1);
        setLinesDrawn(true);
      }
      if (next === "sync") setSyncAnimKey((k) => k + 1);

      timeoutId = window.setTimeout(() => {
        index = (index + 1) % phases.length;
        run();
      }, PHASE_MS[next]);
    };

    run();
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [inView, reduce]);

  const extractionActive = phase === "extraction" && !reduce;
  const processActive = phase === "process" && !reduce;
  const syncActive = phase === "sync" && !reduce;
  const extractionLinesVisible = linesDrawn || reduce || phase !== "idle";
  const syncLineVisible = syncActive || reduce;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-5xl">
      <PhaseStepper phase={phase} reduce={reduce} />

      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(0,204,106,0.12),transparent_70%)]"
        aria-hidden
      />

      {/* Tablet + desktop */}
      <div className="hidden md:block">
        <div className="relative min-h-[360px] w-full min-w-[680px] lg:aspect-[900/400] lg:min-h-0 lg:min-w-0">
          <svg
            ref={svgRef}
            viewBox="0 0 900 400"
            className="absolute inset-0 z-[25] h-full w-full"
            aria-hidden
          >
            {INPUTS.map((input) => (
              <FlowConnector
                key={input.pathId}
                pathId={input.pathId}
                pathD={input.pathD}
                pathLen={pathLengths[input.pathId] ?? 0}
                visible={extractionLinesVisible}
                active={extractionActive}
                dimmed={!extractionActive && extractionLinesVisible}
                animKey={extractAnimKey}
              />
            ))}
            <FlowConnector
              pathId={SYNC_PATH_ID}
              pathD={SYNC_PATH_D}
              pathLen={pathLengths[SYNC_PATH_ID] ?? 0}
              visible={syncLineVisible || reduce}
              active={syncActive}
              dimmed={false}
              animKey={syncAnimKey}
            />
          </svg>

          <div className="absolute left-[30%] top-[38%] z-40 -translate-x-1/2 -translate-y-1/2">
            <PhaseLabel active={extractionActive}>
              Extraction <ArrowRight className="h-4 w-4" />
            </PhaseLabel>
          </div>

          <div className="absolute left-[70%] top-[38%] z-40 -translate-x-1/2 -translate-y-1/2">
            <PhaseLabel active={syncActive}>
              Sync <ArrowRight className="h-4 w-4" />
            </PhaseLabel>
          </div>

          <div className="absolute left-0 top-0 z-20 flex h-full w-[24%] flex-col justify-between py-2 sm:w-[22%]">
            {INPUTS.map((input) => (
              <DocumentCard
                key={input.id}
                label={input.label}
                icons={input.icons}
                active={extractionActive}
              />
            ))}
          </div>

          <div className="absolute left-1/2 top-[54%] z-30 -translate-x-1/2 -translate-y-1/2">
            <ProcessHub
              reduce={reduce}
              processActive={processActive}
              showProcess={phase === "process" || reduce}
              size="lg"
            />
          </div>

          <div className="absolute right-0 top-1/2 z-20 w-[20%] -translate-y-1/2 sm:w-[18%]">
            <TallyDestination syncActive={syncActive} reduce={reduce} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col items-center gap-5 md:hidden">
        <div className="mx-auto flex w-full max-w-xs flex-col gap-3">
          {INPUTS.map((input) => (
            <DocumentCard
              key={input.id}
              label={input.label}
              icons={input.icons}
              active={extractionActive}
            />
          ))}
        </div>

        <div className="flex w-full flex-col items-center">
          <PhaseLabel active={extractionActive} className="mb-3">
            Extraction <ArrowRight className="h-4 w-4 rotate-90" />
          </PhaseLabel>
          <div
            className={cn(
              "h-12 w-0.5 bg-brand-green transition-opacity duration-300",
              extractionActive ? "opacity-100" : "opacity-[0.35]"
            )}
          />
        </div>

        <ProcessHub
          reduce={reduce}
          processActive={processActive}
          showProcess={phase === "process" || reduce}
          size="sm"
        />

        <div className="flex w-full flex-col items-center">
          <div
            className={cn(
              "h-12 w-0.5 bg-brand-green transition-opacity duration-300",
              syncActive ? "opacity-100" : "opacity-[0.35]"
            )}
          />
          <PhaseLabel active={syncActive} className="mt-3">
            Sync <ArrowRight className="h-4 w-4 rotate-90" />
          </PhaseLabel>
        </div>

        <TallyDestination
          syncActive={syncActive}
          reduce={reduce}
          className="w-full max-w-[200px]"
        />
      </div>
    </div>
  );
}

export function DataFlowAnimation() {
  const reduce = useReducedMotion();

  return (
    <section id="data-flow" className="relative overflow-hidden py-20 sm:py-28">
      <GradientBlur variant="soft" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading className="text-ink-primary">
              <BrandHighlight>Extraction · Process · Sync</BrandHighlight>
            </SectionHeading>
            <p className="mt-3 text-pretty text-ink-muted">
              Purchase, sales, and bank statements flow into Maxxit - processed
              locally, posted to TallyPrime.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mt-8 overflow-x-auto overflow-y-hidden rounded-[2rem] border border-zinc-200/60 bg-white/60 p-4 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.15)] backdrop-blur-sm sm:p-6 md:p-8 lg:p-10">
            <FlowCanvas reduce={reduce === true} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}