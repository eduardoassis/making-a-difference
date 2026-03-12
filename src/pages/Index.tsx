import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import HomeBottomSections from "@/components/HomeBottomSections";
import MobileFrame from "@/components/MobileFrame";

const Index = () => {
  return (
    <MobileFrame>
      <StickyHeader />
      <main className="px-4 py-6">
        <HeroSection />
        <HomeBottomSections />
      </main>
    </MobileFrame>
  );
};

export default Index;
