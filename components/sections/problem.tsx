import {
  AlertTriangle,
  Clock,
  FileX,
  Repeat,
  AlertCircle,
  TrendingDown,
} from "lucide-react";
import { Card, CardIcon } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

const PROBLEMS = [
  {
    icon: Clock,
    title: "Manual entry eats the day",
    desc: "Accountants spend hours every week typing invoices and bills into Tally — line by line.",
  },
  {
    icon: FileX,
    title: "WhatsApp documents get lost",
    desc: "Bills sent over chat slip through the cracks, fall behind, or never make it into the books.",
  },
  {
    icon: Repeat,
    title: "Repetitive Tally voucher work",
    desc: "Same vendors, same ledgers, same GST splits — typed again and again for every client.",
  },
  {
    icon: AlertCircle,
    title: "Human errors at scale",
    desc: "Wrong amounts, wrong ledgers, wrong tax rates. Reconciliations later cost even more time.",
  },
  {
    icon: AlertTriangle,
    title: "Month-end becomes month-long",
    desc: "Backlogs pile up, clients wait, and the team is permanently catching up.",
  },
  {
    icon: TrendingDown,
    title: "Hard to scale CA operations",
    desc: "Adding more clients means hiring more juniors — eroding margins and quality.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-[60%] bg-gradient-to-b from-rose-50/60 via-white to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="rose" className="mx-auto">
              The accounting bottleneck
            </Badge>
            <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Manual data entry is the silent tax on every CA firm
            </h2>
            <p className="mt-3 text-pretty text-zinc-600">
              Most teams aren’t slow because they’re bad at accounting — they’re
              slow because the workflow around accounting is broken.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.05}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <CardIcon tone="rose">
                        <Icon className="h-5 w-5" />
                      </CardIcon>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold tracking-tight text-zinc-900">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-zinc-600">{p.desc}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
