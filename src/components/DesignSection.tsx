import React from 'react';
import { motion } from 'motion/react';
import { YouTubeBackground } from './YouTubeBackground';
import { Compass, Layers, Zap } from 'lucide-react';

export const DesignSection = () => {
  const principles = [
    { title: "Fluid Architecture", desc: "Organic forms that mimic the natural flow of water and wind.", icon: Compass },
    { title: "Smart Integration", desc: "Seamless IoT and AI-driven infrastructure for hyper-efficiency.", icon: Zap },
    { title: "Sustainable Core", desc: "Net-zero target through regenerative energy and biophilic design.", icon: Layers }
  ];

  return (
    <section id="design" className="relative min-h-screen py-32 bg-luxury-black overflow-hidden group">
      <div className="absolute inset-0 z-0">
        <YouTubeBackground videoId="ocxFTVKQyGM" overlayOpacity={0.7} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2 className="text-xs uppercase tracking-[0.6em] text-luxury-gold mb-8 font-bold flex items-center gap-4">
              <span className="w-12 h-px bg-luxury-gold"></span> Architecture & Design
            </h2>
            <h3 className="text-5xl md:text-8xl font-display mb-10 leading-tight">
              Blueprints <br /> <span className="italic font-light text-white/90">of the Sublime</span>
            </h3>
            <p className="text-xl text-white/50 font-light leading-relaxed mb-12 max-w-xl">
              Our design philosophy is rooted in the "Sublime"—an intersection of awe, scale, 
              and technical perfection. Every line is intentional; every curve is a promise of comfort.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((p, i) => (
                <motion.div 
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="p-6 border border-white/5 bg-white/5 backdrop-blur-md hover:border-luxury-gold/50 transition-all"
                >
                  <p.icon className="text-luxury-gold mb-4" size={24} />
                  <h4 className="font-display italic text-lg mb-2">{p.title}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[3/4] glass-morphism p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-luxury-gold/5 mix-blend-overlay"></div>
                <img 
                   src="https://picsum.photos/seed/dubai-architecture/800/1200" 
                   alt="Architectural Detail"
                   className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                   referrerPolicy="no-referrer"
                />
                <div className="absolute top-0 right-0 p-8">
                     <div className="text-[120px] font-display font-black text-white/5 leading-none">05</div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
