"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CLIENT_AGENT_VISUALS } from "@/lib/landing-images";
import { cn } from "@/lib/utils";

type AgentVisual =
  (typeof CLIENT_AGENT_VISUALS)[keyof typeof CLIENT_AGENT_VISUALS];

type DeckItem = {
  visual: AgentVisual;
  variant: "chat" | "viewer";
};

const DRAG_THRESHOLD = 100;
const PEEL_DISTANCE = 160;

const SPRING = { type: "spring" as const, stiffness: 380, damping: 34 };

const DECK_ITEMS: DeckItem[] = [
  { visual: CLIENT_AGENT_VISUALS.intake, variant: "chat" },
  { visual: CLIENT_AGENT_VISUALS.invoiceFlow, variant: "chat" },
  { visual: CLIENT_AGENT_VISUALS.generatedInvoice, variant: "viewer" },
];

const CARD_SLOTS = [
  {
    className: "lg:left-0 lg:top-0 lg:w-[58%]",
    rotate: -2,
    zIndex: 10,
  },
  {
    className: "lg:right-0 lg:top-10 lg:w-[68%]",
    rotate: 1,
    zIndex: 20,
  },
  {
    className: "lg:bottom-0 lg:left-[10%] lg:w-[82%]",
    rotate: -1,
    zIndex: 30,
  },
] as const;

function AgentScreenshotCard({
  visual,
  variant,
  priority = false,
}: {
  visual: AgentVisual;
  variant: "chat" | "viewer";
  priority?: boolean;
}) {
  const isChat = variant === "chat";

  return (
    <figure className="overflow-hidden rounded-2xl bg-zinc-950 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.45)] ring-1 ring-white/10">
      <div
        className={cn(
          "flex items-center gap-2 border-b px-3 py-2.5",
          isChat
            ? "border-zinc-800 bg-zinc-950"
            : "border-zinc-800/80 bg-zinc-900",
        )}
      >
        {isChat ? (
          <>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600/90 text-[10px] font-bold text-white">
              M
            </span>
            <span className="truncate text-xs font-semibold text-zinc-100">
              Agent by Maxxit
            </span>
            <span className="ml-auto text-[10px] text-emerald-400">online</span>
          </>
        ) : (
          <>
            <span className="h-2 w-2 rounded-full bg-red-400/90" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-amber-400/90" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-emerald-400/90" aria-hidden />
            <span className="ml-1 truncate text-[11px] text-zinc-400">
              invoice_G-207.pdf
            </span>
          </>
        )}
      </div>

      <div className="relative overflow-hidden bg-zinc-900">
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          priority={priority}
          className="h-auto w-full object-cover object-top"
          draggable={false}
        />
      </div>

      <figcaption className="flex items-center justify-between gap-2 border-t border-zinc-800 bg-zinc-950 px-3 py-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-300">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-400 ring-1 ring-emerald-500/25">
            {visual.step}
          </span>
          {visual.label}
        </span>
        {isChat ? (
          <Image
            src="/images/whatsapp.png"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 rounded-sm opacity-80"
            aria-hidden
          />
        ) : (
          <span className="text-[10px] font-medium uppercase tracking-wider text-violet-300/80">
            PDF
          </span>
        )}
      </figcaption>
    </figure>
  );
}

function DeckDecorations() {
  return (
    <>
      <div
        className="pointer-events-none absolute left-[28%] top-[34%] z-0 hidden text-emerald-500/40 lg:block"
        aria-hidden
      >
        <ArrowRight className="h-6 w-6 rotate-12" />
      </div>
      <div
        className="pointer-events-none absolute bottom-[38%] right-[18%] z-0 hidden text-violet-500/40 lg:block"
        aria-hidden
      >
        <ArrowRight className="h-6 w-6 -rotate-12" />
      </div>
    </>
  );
}

function StaticAgentVisual() {
  return (
    <div className="relative min-h-0 space-y-5 sm:space-y-6 lg:min-h-[620px] lg:space-y-0">
      {DECK_ITEMS.map((item, i) => (
        <div
          key={i}
          className={cn(
            "relative lg:absolute",
            CARD_SLOTS[i].className,
            i === 0 && "lg:-rotate-2",
            i === 1 && "lg:rotate-1",
            i === 2 && "lg:-rotate-1",
          )}
          style={{ zIndex: CARD_SLOTS[i].zIndex }}
        >
          <AgentScreenshotCard
            visual={item.visual}
            variant={item.variant}
            priority={i === 0}
          />
        </div>
      ))}
      <DeckDecorations />
    </div>
  );
}

function DeckCard({
  itemIndex,
  stackPosition,
  isTop,
  onPeelComplete,
}: {
  itemIndex: number;
  stackPosition: number;
  isTop: boolean;
  onPeelComplete: () => void;
}) {
  const item = DECK_ITEMS[itemIndex];
  const slot = CARD_SLOTS[stackPosition];
  const x = useMotionValue(0);
  const dragRotate = useTransform(x, [-180, 0, 180], [-10, slot.rotate, 10]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isPeeling, setIsPeeling] = React.useState(false);
  const isBusy = React.useRef(false);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    if (!isTop || isBusy.current) return;

    const offset = info.offset.x;

    if (Math.abs(offset) < DRAG_THRESHOLD) {
      animate(x, 0, SPRING);
      return;
    }

    isBusy.current = true;
    const direction = offset > 0 ? 1 : -1;
    setIsPeeling(true);

    animate(x, direction * PEEL_DISTANCE, {
      duration: 0.22,
      ease: [0.32, 0.72, 0, 1],
      onComplete: () => {
        onPeelComplete();
        x.set(0);
        setIsPeeling(false);
        isBusy.current = false;
      },
    });
  };

  return (
    <motion.div
      layout={false}
      drag={isTop && !isPeeling ? "x" : false}
      dragMomentum={false}
      dragElastic={0.12}
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      style={{
        x: isTop ? x : 0,
        zIndex: slot.zIndex,
        rotate: isTop && isDragging ? dragRotate : undefined,
      }}
      animate={{
        y: isTop && isDragging ? -6 : 0,
        scale: isPeeling ? 0.96 : isTop && isDragging ? 1.02 : 1,
        opacity: isPeeling ? 0 : 1,
        rotate: isTop && isDragging ? undefined : slot.rotate,
      }}
      transition={
        isPeeling
          ? { duration: 0.22, ease: [0.32, 0.72, 0, 1] }
          : SPRING
      }
      role={isTop ? "button" : undefined}
      tabIndex={isTop ? 0 : undefined}
      aria-label={
        isTop ? "Drag left or right to view the next step" : undefined
      }
      className={cn(
        "relative will-change-transform touch-none select-none lg:absolute",
        slot.className,
        isTop && !isPeeling
          ? "cursor-grab active:cursor-grabbing"
          : !isTop && "pointer-events-none",
      )}
    >
      <AgentScreenshotCard
        visual={item.visual}
        variant={item.variant}
        priority={itemIndex === 0}
      />
    </motion.div>
  );
}

export function StackedScreenshotDeck() {
  const reduce = useReducedMotion();
  const [stackOrder, setStackOrder] = React.useState([0, 1, 2]);

  const handlePeelComplete = React.useCallback(() => {
    setStackOrder((prev) => {
      const next = [...prev];
      const top = next.pop()!;
      next.unshift(top);
      return next;
    });
  }, []);

  if (reduce) {
    return (
      <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
        <div
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-linear-to-br from-emerald-200/50 via-white/40 to-violet-200/40 blur-2xl"
          aria-hidden
        />
        <StaticAgentVisual />
        <p className="mt-6 text-center text-xs text-ink-muted lg:mt-8">
          Intake → on-demand invoice → GST PDF returned to the client
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-linear-to-br from-emerald-200/50 via-white/40 to-violet-200/40 blur-2xl"
        aria-hidden
      />

      <div className="relative overflow-hidden">
        <div className="relative min-h-0 space-y-5 sm:space-y-6 lg:min-h-[620px] lg:space-y-0">
          {stackOrder.map((itemIndex, stackPosition) => (
            <DeckCard
              key={itemIndex}
              itemIndex={itemIndex}
              stackPosition={stackPosition}
              isTop={stackPosition === stackOrder.length - 1}
              onPeelComplete={handlePeelComplete}
            />
          ))}
          <DeckDecorations />
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-ink-muted/70">
        Drag the top card to explore the flow
      </p>
      <p className="mt-1 text-center text-xs text-ink-muted lg:mt-2">
        Intake → on-demand invoice → GST PDF returned to the client
      </p>
    </div>
  );
}