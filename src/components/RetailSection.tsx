import React from 'react';
import { motion } from 'motion/react';
import { YouTubeBackground } from './YouTubeBackground';
import { ShoppingBag } from 'lucide-react';

export const RetailSection = () => {
  const categories = [
    { name: "Haute Couture", desc: "Flagship spaces for the world's most iconic fashion houses.", img: "https://picsum.photos/seed/dubai-luxury-fashion/800/1200" },
    { name: "Artisanal", desc: "Curated boutiques showcasing exceptional craftsmanship.", img: "https://picsum.photos/seed/dubai-old-souk/800/1200" },
    { name: "Digital First", desc: "Experiential retail concepts for the next generation.", img: "https://picsum.photos/seed/dubai-future-museum/800/1200" }
  ];

  return (
    <section id="retail" className="relative py-32 bg-luxury-black overflow-hidden bg-white/5">
      <div className="absolute inset-0 z-0 opacity-40">
        <YouTubeBackground videoId="Rjf5BFxiOKA" startTime={1800} overlayOpacity={0.8} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col mb-24 items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mb-8"
          >
            <ShoppingBag size={24} />
          </motion.div>
          <h2 className="text-xs uppercase tracking-[0.5em] text-luxury-gold mb-6 font-bold">The Stage of Commerce</h2>
          <h3 className="text-5xl md:text-8xl font-display mb-8">
            Retail <span className="italic font-light">Evolved</span>
          </h3>
          <p className="text-white/50 max-w-2xl font-light leading-relaxed text-lg">
            Beyond transaction, we provide a narrative platform. Our spaces are curated to 
            transform brand stories into visceral consumer experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer overflow-hidden h-[500px] border border-white/5 bg-luxury-black/40 backdrop-blur-sm"
            >
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent" />
              
              <div className="absolute bottom-10 left-8 right-8">
                <h4 className="text-2xl font-display italic mb-3">{cat.name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-6 font-bold">{cat.desc}</p>
                <div className="w-8 h-0.5 bg-luxury-gold group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
