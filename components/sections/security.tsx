import {
  HardDrive,
  BadgeCheck,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { Card, CardIcon } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";

const ITEMS = [
  {
    title: "On-premises by design",
    desc: "Files, extracted data, and post history stay on your local system - not third-party cloud.",
    icon: HardDrive,
    tone: "emerald" as const,
  },
  {
    title: "Human-in-the-loop review",
    desc: "Every voucher goes through review - nothing is silently auto-posted.",
    icon: BadgeCheck,
    tone: "sky" as const,
  },
  {
    title: "Company matching guards",
    desc: "Detects the right Tally company and blocks posting when active company mismatches.",
    icon: Building2,
    tone: "amber" as const,
  },
  {
    title: "GSTIN reconciliation",
    desc: "Flags invoice vs ledger GSTIN mismatches before any voucher is posted.",
    icon: ShieldCheck,
    tone: "rose" as const,
  },
];

export function Security() {
  return (
    <section id="security" className="relative bg-ink-dark py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,204,106,0.12),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading className="text-balance text-white">
              On-premises & safe -{" "}
              <BrandHighlight>data stays on your machine</BrandHighlight>
            </SectionHeading>
            <p className="mt-3 text-balance text-zinc-400">
              TallyPrime stays your system of record - Maxxit processes locally
              and keeps you in control at every step.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <Card className="flex h-full flex-col border-white/10 bg-white/5 text-white backdrop-blur-sm hover:border-white/20 hover:bg-white/8">
                  <CardIcon tone={item.tone}>
                    <Icon className="h-5 w-5" />
                  </CardIcon>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.desc}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}