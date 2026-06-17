import {
  HardDrive,
  BadgeCheck,
  Building2,
  ShieldCheck,
  UserCheck,
  ClipboardList,
} from "lucide-react";
import { Card, CardIcon } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

const ITEMS = [
  {
    title: "On-premises by design",
    desc: "Uploaded files, extracted review data, and post history stay on your local system. Client documents are not stored on third-party cloud servers.",
    icon: HardDrive,
    tone: "emerald" as const,
  },
  {
    title: "Human-in-the-loop review",
    desc: "Every voucher goes through a structured review workspace. Nothing is silently auto-posted — review is a feature, not a limitation.",
    icon: BadgeCheck,
    tone: "sky" as const,
  },
  {
    title: "Company matching guards",
    desc: "Detects which Tally company a document belongs to and blocks posting when active company does not match.",
    icon: Building2,
    tone: "amber" as const,
  },
  {
    title: "GSTIN reconciliation",
    desc: "Flags when invoice GSTIN differs from ledger GSTIN. You choose how to proceed before any voucher is posted.",
    icon: ShieldCheck,
    tone: "rose" as const,
  },
  {
    title: "Client Agent allowlist",
    desc: "Only pre-approved phone numbers can send documents via messaging. Unknown senders queue for your approval.",
    icon: UserCheck,
    tone: "zinc" as const,
  },
  {
    title: "Local audit trail",
    desc: "Posted transaction history with Tally reconciliation status — verified, posted, or not found — on your machine.",
    icon: ClipboardList,
    tone: "emerald" as const,
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
            <Badge
              tone="brand"
              className="mx-auto bg-white/10 text-white ring-white/20"
            >
              On-premises & safeguards
            </Badge>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Your data stays on your machine
            </h2>
            <p className="mt-3 text-balance text-zinc-400">
              TallyPrime remains your system of record. Maxxit Tally processes
              documents locally and gives you control at every step — built for
              regulated professionals who cannot send client books to the cloud.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
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