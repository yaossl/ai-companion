import ParticleBackground from "@/components/landing/ParticleBackground";
import HeroSection from "@/components/landing/HeroSection";
import FeatureGrid from "@/components/landing/FeatureGrid";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <HeroSection />
      <FeatureGrid />
    </main>
  );
}
