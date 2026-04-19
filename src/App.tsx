import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VisionSection } from './components/VisionSection';
import { StatsSection } from './components/StatsSection';
import { RetailSection } from './components/RetailSection';
import { CoutureSection } from './components/CoutureSection';
import { EntertainmentSection } from './components/EntertainmentSection';
import { LifestyleSection } from './components/LifestyleSection';
import { DesignSection } from './components/DesignSection';
import { InquirySection } from './components/InquirySection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="bg-luxury-black min-h-screen text-white">
      <Navbar />
      <main>
        <HeroSection />
        <VisionSection />
        <StatsSection />
        <RetailSection />
        <CoutureSection />
        <EntertainmentSection />
        <LifestyleSection />
        <DesignSection />
        <InquirySection />
      </main>
      <Footer />
    </div>
  );
}
