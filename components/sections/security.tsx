import { LockKeyhole, Building2, BadgeCheck, ServerCog, HardDrive } from "lucide-react";
import { Card, CardIcon } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

const ITEMS = [
  {
    title: "Secure document processing",
    desc: "Uploaded files travel through encrypted channels and ephemeral processing pipelines designed for firm workflows.",
    icon: LockKeyhole,
    tone: "emerald" as const,
  },
  {
    title: "Company-wise data separation",
    desc: "Each client company stays logically isolated — routing rules keep vouchers out of the wrong books.",
    icon: Building2,
    tone: "violet" as const,
  },
  {
    title: "On-prem by design (no cloud exposure)",
    desc: "Documents and extracted accounting data stay on your local system — nothing needs to be sent to third‑party cloud servers to run the workflow.",
    icon: HardDrive,
    tone: "sky" as const,
  },
  {
    title: "Human-in-the-loop, like your normal workflow",
    desc: "Your team reviews what the agent drafts and catches anything incorrect before it’s finalised in Tally — the same checks you already do, just faster.",
    icon: BadgeCheck,
    tone: "rose" as const,
  },
  {
    title: "Reliable backend automation",
    desc: "Reliable automation keeps WhatsApp ingress, retries, and Tally handshake logic consistent even during peak season.",
    icon: ServerCog,
    tone: "amber" as const,
  },
];

export function Security() {
  return (
    <section id="security" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="zinc" className="mx-auto">
              Security & trust
            </Badge>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Built for regulated professionals who sleep better with guardrails
            </h2>
            <p className="mt-3 text-balance text-zinc-600">
              We steer clear of marketing certifications we have not earned. What
              we publish here reflects how partner practices actually deploy the
              product today.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <Card className="flex h-full flex-col">
                  <CardIcon tone={item.tone}>
                    <Icon className="h-5 w-5" />
                  </CardIcon>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {item.desc}
                  </p>
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
