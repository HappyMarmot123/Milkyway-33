import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { AppPreview } from "@/components/landing/AppPreview";
import { Features } from "@/components/landing/Features";
import { RollingTextList } from "@/components/ui/rolling-list"; 
import { BuildCtaSection } from "@/components/landing/BuildCtaSection";
import { BrandBanner } from "@/components/landing/BrandBanner";

import { PhysicsSection } from "@/components/landing/PhysicsSection";

export function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.4,
      orientation: 'vertical', 
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/10">
      <Navbar />
      <main className="flex-1 pt-16 w-full overflow-x-hidden">
        <Hero />
        <BrandBanner />
        <AppPreview />
        <PhysicsSection />
        <Features />
        <RollingTextList />
        <BuildCtaSection />
      </main>
    </div>
  );
}
