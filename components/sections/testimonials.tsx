"use client";

import * as React from "react";
import { Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote:
      "We stopped losing WhatsApp invoices. Juniors reconcile in the mornings now instead of chasing files all week.",
    name: "Rajesh Kapoor",
    title: "Partner, Kapoor & Associates",
    initials: "RK",
    tone: "from-emerald-500/15 to-transparent",
    ring: "ring-emerald-500/25",
  },
  {
    quote:
      "The agent gets GST splits and narration right nine times out of ten. I skim, tap approve, move on.",
    name: "Ananya Deshpande",
    title: "Senior Accountant, Prism Books",
    initials: "AD",
    tone: "from-violet-500/15 to-transparent",
    ring: "ring-violet-500/25",
  },
  {
    quote:
      "I invoice from the road. Knowing my CA sees it in Tally the same afternoon changed how we plan cash.",
    name: "Vikram Patel",
    title: "Owner, Lattice Components",
    initials: "VP",
    tone: "from-rose-500/15 to-transparent",
    ring: "ring-rose-500/25",
  },
];

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, [reduce]);

  const active = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-x-0 top-1/4 -z-10 h-[50%] bg-gradient-to-br from-emerald-100/30 via-transparent to-violet-100/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="rose" className="mx-auto">
              Testimonials
            </Badge>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Teams shipping faster closes with AI Machines by Maxxit
            </h2>
            <p className="mt-3 text-balance text-zinc-600">
              Synthetic quotes for layout purposes — swap in verified customer
              stories when ready.
            </p>
          </div>
        </Reveal>

        <div className="relative mx-auto mt-12 max-w-3xl">
          <motion.div
            key={active.name}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Card className="relative overflow-hidden p-8 sm:p-10">
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br blur-2xl",
                  active.tone,
                )}
              />
              <Quote className="h-10 w-10 text-zinc-200" />
              <blockquote className="relative mt-6 text-xl font-medium leading-relaxed tracking-tight text-zinc-900 sm:text-[1.35rem]">
                “{active.quote}”
              </blockquote>
              <div className="relative mt-8 flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white ring-4",
                    active.ring,
                  )}
                >
                  {active.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-900">
                    {active.name}
                  </div>
                  <div className="text-sm text-zinc-600">{active.title}</div>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
                className={cn(
                  "hover:cursor-pointer h-2 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-emerald-600" : "w-2 bg-zinc-300 hover:bg-zinc-400",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
