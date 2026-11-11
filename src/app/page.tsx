import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features, PathPreview, HowItWorks, Testimonials } from "@/components/landing/sections";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PathPreview />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
