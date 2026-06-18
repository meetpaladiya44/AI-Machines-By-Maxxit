import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/ui/book-demo-button";
import { Reveal } from "@/components/ui/reveal";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";
import { GET_STARTED_HREF } from "@/lib/site-links";

export function FinalCta() {
  return (
    <section id="cta" className="relative px-4 pb-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-ink-dark px-6 py-14 text-center shadow-[0_40px_80px_-40px_rgba(0,204,106,0.35)] sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-green/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-brand-green/10 blur-3xl"
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <SectionHeading className="text-balance text-white">
              Maxxit Tally -{" "}
              <BrandHighlight>ready to automate?</BrandHighlight>
            </SectionHeading>
            <p className="mt-4 text-balance text-base text-zinc-300 sm:text-lg">
              Install on your premises, connect TallyPrime, and start processing
              purchase, sales, and bank documents with full review before every
              post.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button href={GET_STARTED_HREF} size="lg">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <BookDemoButton size="lg" variant="on-dark">
                Request a Demo
              </BookDemoButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}