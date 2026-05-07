import {
  TrendingDown,
  Users,
  Gauge,
  ShieldCheck,
  Layers,
  ClipboardList,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Card, CardIcon } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

const STATS = [
  {
    prefix: "",
    value: 80,
    suffix: "%",
    label: "less time on repetitive data entry",
    sub: "Give your seniors back billable hours every week.",
    icon: Gauge,
    tone: "emerald" as const,
  },
  {
    prefix: "",
    value: 10,
    suffix: "×",
    label: "more documents cleared per teammate",
    sub: "Same headcount — dramatically higher throughput.",
    icon: Users,
    tone: "violet" as const,
  },
  {
    prefix: "",
    value: 99,
    suffix: "%",
    label: "extraction accuracy in pilot programmes",
    sub: "Built-in checks catch anomalies before posting.",
    icon: ShieldCheck,
    tone: "sky" as const,
  },
  {
    prefix: "",
    value: 5,
    suffix: "×",
    label: "faster path to month-end close",
    sub: "Backlogs shrink when intake is instantaneous.",
    icon: TrendingDown,
    tone: "rose" as const,
  },
  {
    prefix: "",
    value: 24,
    suffix: "/7",
    label: "always-on intake over WhatsApp",
    sub: "Clients send when convenient; you batch review when ready.",
    icon: Layers,
    tone: "amber" as const,
  },
  {
    prefix: "",
    value: 100,
    suffix: "%",
    label: "traceable audit trail",
    sub: "Every document ties back to vouchers and exports.",
    icon: ClipboardList,
    tone: "zinc" as const,
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative py-20 sm:py-24">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-gradient-to-t from-emerald-50/50 via-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="emerald" className="mx-auto">
              Outcomes finance teams feel
            </Badge>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Operational metrics that compound month after month
            </h2>
            <p className="mt-3 text-balance text-zinc-600">
              Automation is not about replacing accountants — it is about
              removing the parts of the job that machines already do better.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={i * 0.05}>
                <Card className="flex h-full flex-col">
                  <CardIcon tone={s.tone}>
                    <Icon className="h-5 w-5" />
                  </CardIcon>
                  <div className="mt-4 text-4xl font-semibold tabular-nums tracking-tight text-zinc-900 sm:text-[2.65rem]">
                    <AnimatedCounter
                      to={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </div>
                  <p className="mt-3 text-base font-semibold text-zinc-900">
                    {s.label}
                  </p>
                  <p className="mt-1.5 text-sm text-zinc-600">{s.sub}</p>
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
