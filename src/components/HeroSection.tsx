import React from 'react';
import { motion } from 'motion/react';
import { YouTubeBackground } from './YouTubeBackground';
import { ArrowDown } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <YouTubeBackground videoId="RD0xom40iEE" startTime={0} overlayOpacity={0.6} />
      
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xs md:text-sm uppercase tracking-[0.4em] font-medium text-luxury-gold mb-6"
        >
          A Global Destination Landmark
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-display font-medium leading-tight mb-8"
        >
          Where Vision <br className="hidden md:block" />
          <span className="italic font-light">Meets Scale</span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="mt-12"
        >
          <button className="px-10 py-4 bg-white text-luxury-black font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-luxury-gold hover:text-white transition-all transform hover:scale-105">
            Discover The Experience
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-50"
      >
        <ArrowDown className="text-white" size={32} />
      </motion.div>
    </section>
  );
};
