import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { YouTubeBackground } from './YouTubeBackground';

export const VisionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <section 
      id="vision"
      ref={containerRef}
      className="relative min-h-screen bg-luxury-black flex items-center justify-center py-24 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <YouTubeBackground videoId="sARrB94jInQ" startTime={52} overlayOpacity={0.7} />
      </div>

      <motion.div 
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center"
      >
        <div className="w-px h-24 bg-luxury-gold mb-12" />
        
        <h2 className="text-xs uppercase tracking-[0.5em] text-luxury-gold mb-6">The Concept</h2>
        <h3 className="text-4xl md:text-6xl font-display mb-12 leading-tight">
          Redefining Human <br /> <span className="italic font-light">Connectivity & Retail</span>
        </h3>
        
        <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-16 max-w-3xl">
          Inspired by the seamless integration of nature and urban luxury, The Oasis represents 
          a paradigm shift. It is a canvas where global brands manifest their grandest 
          visions, surrounded by an environment that breathes with life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left w-full mt-12">
          {[
            { 
              title: "Serenity", 
              desc: "1.5M Sq Ft of water features and green corridors." 
            },
            { 
              title: "Innovation", 
              desc: "Next-gen immersive commercial spaces." 
            },
            { 
              title: "Exclusivity", 
              desc: "A curated ecosystem of 500+ ultra-luxury boutiques." 
            }
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              viewport={{ once: true }}
              className="border-l border-white/10 pl-6"
            >
              <h4 className="text-xl font-display mb-4 italic">{item.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
