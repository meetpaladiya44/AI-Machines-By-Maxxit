import { Brain, PlugZap, FileText, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardIcon } from "@/components/ui/card";

const AI_POINTS = [
  "Reads scanned PDFs, phone photos, and multi-page documents",
  "Classifies purchase, sales, and bank statement types",
  "Extracts Indian GST fields and bank transaction rows",
  "Detects spreadsheet columns for Excel and CSV imports",
];

const MCP_POINTS = [
  "Connects directly to your live Tally data",
  "Matches parties and stock items against real masters",
  "Detects document company and suggests company switch",
  "Builds vouchers from your Tally configuration - not templates",
];

export function AiMcp() {
  return (
    <section id="ai-mcp" className="relative py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-linear-to-b from-brand-green/5 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="brand" className="mx-auto">
              Intelligent automation
            </Badge>
            <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-ink-primary sm:text-4xl">
              AI reads. MCP tools match. You approve.
            </h2>
            <p className="mt-3 text-pretty text-ink-muted">
              AI handles document understanding. MCP tools bridge extraction to
              your live Tally masters. You stay in control of every post.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <CardIcon tone="emerald">
                <Brain className="h-5 w-5" />
              </CardIcon>
              <h3 className="mt-4 text-xl font-semibold text-ink-primary">
                AI reads and understands documents
              </h3>
              <ul className="mt-4 space-y-2.5">
                {AI_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink-muted">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                    {p}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.06}>
            <Card className="h-full">
              <CardIcon tone="sky">
                <PlugZap className="h-5 w-5" />
              </CardIcon>
              <h3 className="mt-4 text-xl font-semibold text-ink-primary">
                MCP tools match your Tally masters
              </h3>
              <ul className="mt-4 space-y-2.5">
                {MCP_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink-muted">
                    <Database className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                    {p}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-border-subtle bg-white px-6 py-5 text-center text-sm text-ink-muted">
            <span className="rounded-full bg-brand-green/10 px-3 py-1 font-medium text-brand-green">
              Document
            </span>
            <span aria-hidden>→</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-ink-primary">
              AI extraction
            </span>
            <span aria-hidden>→</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-ink-primary">
              MCP + Tally
            </span>
            <span aria-hidden>→</span>
            <span className="rounded-full bg-brand-green/10 px-3 py-1 font-medium text-brand-green">
              Your review
            </span>
            <span aria-hidden>→</span>
            <span className="rounded-full bg-brand-green px-3 py-1 font-medium text-white">
              Post
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}