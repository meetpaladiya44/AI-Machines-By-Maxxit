import { Hero } from "@/components/sections/hero";
import { IdealFor } from "@/components/sections/ideal-for";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { InvoiceGeneration } from "@/components/sections/invoice-generation";
import { InteractiveDemo } from "@/components/sections/interactive-demo";
import { Benefits } from "@/components/sections/benefits";
import { Security } from "@/components/sections/security";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <Hero />
      <IdealFor />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <InvoiceGeneration />
      <InteractiveDemo />
      <Benefits />
      <Security />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}
