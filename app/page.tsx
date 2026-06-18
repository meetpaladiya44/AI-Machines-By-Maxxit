import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { DataFlowAnimation } from "@/components/sections/data-flow-animation";
import { IdealFor } from "@/components/sections/ideal-for";
import { DocumentTypes } from "@/components/sections/document-types";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { ReviewWorkspace } from "@/components/sections/review-workspace";
import { InteractiveDemo } from "@/components/sections/interactive-demo";
import { BankStatements } from "@/components/sections/bank-statements";
import { FormatsSupport } from "@/components/sections/formats-support";
import { AiMcp } from "@/components/sections/ai-mcp";
import { Security } from "@/components/sections/security";
import { ClientAgent } from "@/components/sections/client-agent";
import { FirmFeatures } from "@/components/sections/firm-features";
import { DashboardOps } from "@/components/sections/dashboard-ops";
import { Benefits } from "@/components/sections/benefits";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <Hero />
      <TrustBar />
      <DataFlowAnimation />
      <Problem />
      <Solution />
      <Security />
      <IdealFor />
      <DocumentTypes />
      {/* <HowItWorks />
      <Features />
      <ReviewWorkspace /> */}
      <InteractiveDemo />
      <BankStatements />
      <FormatsSupport />
      {/* <AiMcp /> */}
      <ClientAgent />
      {/* <FirmFeatures /> */}
      {/* <DashboardOps /> */}
      {/* <Benefits /> */}
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}