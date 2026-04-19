import { useState, useEffect } from 'react';
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
import { SearchOverlay } from './components/SearchOverlay';
import { ChatWidget } from './components/ChatWidget';

export default function App() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    fetch('/api/sections')
      .then(res => res.json())
      .then(data => {
        setSections(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load Dubai Mall sections", err);
        setLoading(false);
      });

    // Global Search Shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return (
      <div className="bg-luxury-black min-h-screen flex items-center justify-center">
        <div className="text-luxury-gold animate-pulse text-xs tracking-[0.5em] uppercase">
          Initializing Cinematic Experience...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-luxury-black min-h-screen text-white">
      <Navbar onSearchOpen={() => setIsSearchOpen(true)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ChatWidget />
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
