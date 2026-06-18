import {
  Clock,
  FileX,
  AlertCircle,
  TrendingDown,
  Landmark,
  CloudOff,
} from "lucide-react";
import { Card, CardIcon } from "@/components/ui/card";
import { FallingStagger, FallingStaggerItem } from "@/components/ui/falling-stagger";
import { Reveal } from "@/components/ui/reveal";
import { GridPattern } from "@/components/ui/grid-pattern";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const PROBLEMS = [
  {
    icon: Clock,
    title: "Manual entry eats the day",
    desc: "Hours spent retyping invoices, GST splits, and ledgers into Tally - every week.",
    index: "01",
    severity: "high" as const,
    span: "hero" as const,
  },
  {
    icon: Landmark,
    title: "Bank statements consume mornings",
    desc: "Hundreds of lines per PDF - voucher type, party, reference - one statement, one morning.",
    index: "02",
    severity: "high" as const,
    span: "wide" as const,
  },
  {
    icon: FileX,
    title: "Client documents get lost",
    desc: "Bills over WhatsApp or email slip through; juniors chase files instead of books.",
    index: "03",
    severity: "medium" as const,
    span: "default" as const,
  },
  {
    icon: AlertCircle,
    title: "Human errors compound",
    desc: "Wrong amounts, ledgers, or GST rates - fixes cost more than getting it right first.",
    index: "04",
    severity: "medium" as const,
    span: "default" as const,
  },
  {
    icon: CloudOff,
    title: "Cloud tools create trust friction",
    desc: "Many CAs won't upload client financials to third-party servers.",
    index: "05",
    severity: "low" as const,
    span: "bottom-wide" as const,
  },
  {
    icon: TrendingDown,
    title: "Hard to scale without hiring",
    desc: "More clients traditionally means more juniors for data entry.",
    index: "06",
    severity: "low" as const,
    span: "bottom-wide" as const,
  },
];

const SEVERITY_BAR: Record<(typeof PROBLEMS)[number]["severity"], string> = {
  high: "from-rose-500 via-rose-400 to-rose-300",
  medium: "from-rose-400 via-rose-300 to-rose-200",
  low: "from-rose-300 via-rose-200 to-rose-100",
};

const SPAN_CLASS: Record<(typeof PROBLEMS)[number]["span"], string> = {
  hero: "lg:col-span-2 lg:row-span-2",
  wide: "lg:col-span-2",
  default: "lg:col-span-1",
  "bottom-wide": "lg:col-span-2",
};

const FLOAT_DECOR = [
  { icon: Clock, className: "left-[8%] top-[18%] [animation-delay:0s]" },
  { icon: FileX, className: "right-[12%] top-[28%] [animation-delay:2s]" },
  { icon: AlertCircle, className: "left-[18%] bottom-[22%] [animation-delay:4s]" },
];

export function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-[70%] bg-linear-to-b from-rose-50/50 via-surface-page to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(251,113,133,0.08),transparent_55%)]"
      />
      <GridPattern className="absolute inset-0 -z-10 text-rose-200/40" size={32} />

      {FLOAT_DECOR.map(({ icon: Icon, className }) => (
        <Icon
          key={className}
          aria-hidden
          className={cn(
            "pointer-events-none absolute -z-10 h-16 w-16 text-rose-300/20 animate-float sm:h-20 sm:w-20",
            className
          )}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading className="text-ink-primary">
              The accounting bottleneck -{" "}
              <BrandHighlight>manual entry taxes every firm</BrandHighlight>
            </SectionHeading>
            <p className="mt-3 text-pretty text-ink-muted">
              Firms lose time to retyping - not to lack of skill.
            </p>
          </div>
        </Reveal>

        <FallingStagger once={false} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3">
          {PROBLEMS.map((p) => {
            const Icon = p.icon;
            const isHero = p.span === "hero";

            return (
              <FallingStaggerItem
                key={p.title}
                className={cn(SPAN_CLASS[p.span])}
              >
                <Card
                  className={cn(
                    "card-shine group relative h-full overflow-hidden transition-all duration-300 hover:border-rose-200/80 hover:shadow-[0_22px_40px_-18px_rgba(244,63,94,0.12)]",
                    isHero && "lg:min-h-[280px]"
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 top-0 h-[3px] bg-linear-to-r",
                      SEVERITY_BAR[p.severity]
                    )}
                  />

                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute right-4 bottom-4 z-0 select-none font-bold leading-none tracking-tighter text-rose-100/50",
                      isHero ? "text-5xl lg:text-6xl" : "text-4xl"
                    )}
                  >
                    {p.index}
                  </span>

                  <div
                    className={cn(
                      "relative z-10 flex h-full gap-4",
                      isHero ? "flex-col justify-between lg:p-2" : "items-start"
                    )}
                  >
                    <div className="shrink-0">
                      <CardIcon
                        tone="rose"
                        className="transition-transform duration-300 group-hover:scale-105"
                      >
                        <Icon className="h-5 w-5" />
                      </CardIcon>
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={cn(
                          "font-semibold tracking-tight text-ink-primary",
                          isHero ? "text-lg sm:text-xl" : "text-base"
                        )}
                      >
                        {p.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-1.5 text-ink-muted",
                          isHero ? "text-sm leading-relaxed sm:text-base" : "text-sm"
                        )}
                      >
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </FallingStaggerItem>
            );
          })}
        </FallingStagger>
      </div>
    </section>
  );
}