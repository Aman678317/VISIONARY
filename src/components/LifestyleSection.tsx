import React from 'react';
import { motion } from 'motion/react';
import { YouTubeBackground } from './YouTubeBackground';

export const LifestyleSection = () => {
  return (
    <section id="lifestyle" className="relative min-h-[150vh] flex flex-col items-center py-32 bg-luxury-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <YouTubeBackground videoId="RD0xom40iEE" overlayOpacity={0.7} />
        
        <div className="relative z-10 text-center max-w-4xl px-6">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-xs uppercase tracking-[0.5em] text-luxury-gold mb-12"
           >
             The Experience
           </motion.h2>
           <motion.h3 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="text-5xl md:text-8xl font-display mb-12"
           >
             Life in <br /> <span className="italic font-light">High Definition</span>
           </motion.h3>
        </div>
      </div>

      <div className="relative z-20 w-full bg-luxury-black/90 py-32 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-3xl font-display italic mb-8">Culinary Landscapes</h4>
            <p className="text-white/50 font-light leading-relaxed mb-12">
              From Michelin-starred excellence to curated casual dining, our gastronomic offerings 
              are designed to excite the most discerning palates.
            </p>
            <div className="aspect-video w-full overflow-hidden border border-white/10">
                <img 
                  src="https://picsum.photos/seed/dining/1200/800" 
                  alt="Dining" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
            </div>
          </motion.div>

           <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             <div className="aspect-square w-full mb-12 overflow-hidden border border-white/10">
                <img 
                  src="https://picsum.photos/seed/leisure/1200/1200" 
                  alt="Leisure" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
            </div>
            <h4 className="text-3xl font-display italic mb-8">The Social Core</h4>
            <p className="text-white/50 font-light leading-relaxed">
              Every space is a meeting point. Every corner is a social catalyst. Join a community 
              where global trends are born and social memories are crafted.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
