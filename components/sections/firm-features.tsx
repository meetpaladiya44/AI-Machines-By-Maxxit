import { Building2, Users, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardIcon } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Building2,
    title: "Personal or firm workspace",
    desc: "Solo practitioners get full access. CA firms create a shared workspace with firm identity and team management.",
    tone: "emerald" as const,
  },
  {
    icon: Users,
    title: "Owner, admin, and member roles",
    desc: "Invite team members by email. Owners and admins manage the team; all roles can process documents and post to Tally.",
    tone: "sky" as const,
  },
  {
    icon: GitBranch,
    title: "Multi-company routing",
    desc: "Connect to all open Tally companies. Auto-detect document company and prevent cross-posting with mismatch guards.",
    tone: "amber" as const,
  },
];

export function FirmFeatures() {
  return (
    <section id="firm-features" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="brand" className="mx-auto">
              Firm & team
            </Badge>
            <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-ink-primary sm:text-4xl">
              Built for CA firms - team workspaces and roles
            </h2>
            <p className="mt-3 text-pretty text-ink-muted">
              Set up your workspace for personal use or your CA firm. Manage
              dozens of Tally companies without losing control.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 0.05}>
                <Card className="h-full">
                  <CardIcon tone={f.tone}>
                    <Icon className="h-5 w-5" />
                  </CardIcon>
                  <h3 className="mt-4 text-base font-semibold text-ink-primary">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">{f.desc}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}