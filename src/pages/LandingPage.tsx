import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { AppPreview } from "@/components/landing/AppPreview";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { BuildCtaSection } from "@/components/landing/BuildCtaSection";
import { Footer } from "@/components/landing/Footer";

import { PhysicsSection } from "@/components/landing/PhysicsSection";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/10">
      <Navbar />
      <main className="flex-1 pt-16 w-full overflow-x-hidden">
        <Hero />
        <AppPreview />
        <PhysicsSection />
        <Features />
        <Pricing />
        <BuildCtaSection />
      </main>
      <Footer />
    </div>
  );
}
