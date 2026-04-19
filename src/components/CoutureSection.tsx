import React from 'react';
import { motion } from 'motion/react';
import { YouTubeBackground } from './YouTubeBackground';
import { Sparkles, Scissors, Cpu } from 'lucide-react';

export const CoutureSection = () => {
  const pillars = [
    { name: "Haute Couture", desc: "The pinnacle of fashion as a wearable art form.", icon: Sparkles },
    { name: "Artisanal", desc: "Honoring centuries of hand-crafted mastery.", icon: Scissors },
    { name: "Digital Mastery", desc: "The frontier of virtual and phygital luxury.", icon: Cpu }
  ];

  return (
    <section id="couture" className="relative min-h-screen py-32 bg-luxury-black overflow-hidden group">
      <div className="absolute inset-0 z-0">
        <YouTubeBackground videoId="uD0ww8E0Za8" overlayOpacity={0.75} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-3xl mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.6em] text-luxury-gold mb-8 font-bold flex items-center gap-4"
          >
            <span className="w-12 h-px bg-luxury-gold"></span> The Artisan Standard
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-display mb-10 leading-tight"
          >
            Haute Couture <br /> <span className="italic font-light text-white/90">& Digital Craft</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/50 font-light leading-relaxed max-w-2xl"
          >
            We define luxury through the lens of performance and precision. From the meticulous 
            stitch of a bespoke garment to the silicon soul of immersive digital experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 border border-white/10">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-12 bg-luxury-black/60 backdrop-blur-md hover:bg-luxury-black transition-all duration-700 group cursor-pointer"
            >
              <pillar.icon className="text-luxury-gold mb-8 transition-transform group-hover:scale-110 group-hover:rotate-12" size={32} />
              <h4 className="text-3xl font-display italic mb-4">{pillar.name}</h4>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 leading-loose group-hover:text-white/70 transition-colors">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
