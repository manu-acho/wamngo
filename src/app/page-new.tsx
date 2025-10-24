import { Layout } from "@/components/layout/layout";
import { HeroSection, MissionSection, StatsSection } from "@/components/sections/hero";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <MissionSection />
      <StatsSection />
    </Layout>
  );
}
