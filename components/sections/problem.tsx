import {
  AlertTriangle,
  Clock,
  FileX,
  Repeat,
  AlertCircle,
  TrendingDown,
  Landmark,
  CloudOff,
} from "lucide-react";
import { Card, CardIcon } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

const PROBLEMS = [
  {
    icon: Clock,
    title: "Manual entry eats the day",
    desc: "Accountants spend hours every week typing invoices and bills into Tally — vendor, line items, GST splits, ledgers — again and again.",
  },
  {
    icon: FileX,
    title: "Client documents get lost",
    desc: "Bills sent over WhatsApp, email, or shared drives slip through the cracks. Juniors chase files instead of reconciling books.",
  },
  {
    icon: Landmark,
    title: "Bank statements consume mornings",
    desc: "Hundreds of lines per statement. Each needs the right voucher type, party ledger, and reference — one PDF can take an entire morning.",
  },
  {
    icon: Repeat,
    title: "Repetitive voucher work at scale",
    desc: "Same vendors, same ledgers, same tax rates — retyped for every invoice. Month-end multiplies the backlog.",
  },
  {
    icon: AlertCircle,
    title: "Human errors compound",
    desc: "Wrong amounts, wrong ledgers, wrong GST rates. Fixing reconciliations later costs more than entering correctly the first time.",
  },
  {
    icon: CloudOff,
    title: "Cloud tools create trust friction",
    desc: "Many CAs will not upload client financial documents to third-party servers. They need automation that respects confidentiality.",
  },
  {
    icon: AlertTriangle,
    title: "Month-end becomes month-long",
    desc: "Backlogs pile up, clients wait, and the team is permanently catching up.",
  },
  {
    icon: TrendingDown,
    title: "Hard to scale without hiring",
    desc: "Adding clients traditionally means more juniors for data entry — eroding margins and consistency.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-[60%] bg-linear-to-b from-rose-50/40 via-surface-page to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="rose" className="mx-auto">
              The accounting bottleneck
            </Badge>
            <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-ink-primary sm:text-4xl">
              Manual data entry is the silent tax on every CA firm
            </h2>
            <p className="mt-3 text-pretty text-ink-muted">
              Most firms are not slow because accountants lack skill — they are
              slow because the workflow around Tally is broken.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.04}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <CardIcon tone="rose">
                        <Icon className="h-5 w-5" />
                      </CardIcon>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold tracking-tight text-ink-primary">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-muted">{p.desc}</p>
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