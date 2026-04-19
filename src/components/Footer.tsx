import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-24 bg-luxury-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div>
           <div className="text-2xl font-display font-bold tracking-widest text-white mb-4">VISIONARY</div>
           <p className="text-white/30 text-[10px] uppercase tracking-[0.4em]">Where Vision Meets Scale</p>
        </div>
        
        <div className="flex gap-12 text-[10px] uppercase tracking-[0.2em] font-bold">
            <a href="#" className="hover:text-luxury-gold transition-colors">Press</a>
            <a href="#" className="hover:text-luxury-gold transition-colors">Investors</a>
            <a href="#" className="hover:text-luxury-gold transition-colors">Legal</a>
            <a href="#" className="hover:text-luxury-gold transition-colors">Careers</a>
        </div>

        <div className="text-[10px] uppercase tracking-widest text-white/30 italic">
          &copy; 2026 Visionary Destinations Group. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
