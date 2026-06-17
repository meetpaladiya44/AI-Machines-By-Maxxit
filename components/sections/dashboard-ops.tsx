import { BarChart3, History, Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardIcon } from "@/components/ui/card";

const OPS = [
  {
    icon: BarChart3,
    title: "Cross-company dashboard",
    desc: "Vouchers posted, total value, and company count across every open Tally company on this device.",
    tone: "emerald" as const,
  },
  {
    icon: Landmark,
    title: "Bank statement progress",
    desc: "Per-statement status: complete vs in progress. Posted, pending, and skipped lines at a glance.",
    tone: "sky" as const,
  },
  {
    icon: History,
    title: "Posted transaction history",
    desc: "Filter by type, company, date, and FY. Reconciliation status against Tally on your local machine.",
    tone: "zinc" as const,
  },
];

export function DashboardOps() {
  return (
    <section id="dashboard-ops" className="relative py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-linear-to-b from-white to-surface-page" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="zinc" className="mx-auto">
              Operations
            </Badge>
            <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-ink-primary sm:text-4xl">
              Track what was posted, across every company
            </h2>
            <p className="mt-3 text-pretty text-ink-muted">
              You are not blind to what Maxxit posted. Dashboard and transaction
              history keep operations visible without leaving your desk.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {OPS.map((op, i) => {
            const Icon = op.icon;
            return (
              <Reveal key={op.title} delay={i * 0.05}>
                <Card className="h-full">
                  <CardIcon tone={op.tone}>
                    <Icon className="h-5 w-5" />
                  </CardIcon>
                  <h3 className="mt-4 text-base font-semibold text-ink-primary">
                    {op.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">{op.desc}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}