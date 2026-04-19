import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, ShoppingBag, Globe } from 'lucide-react';
import { InvestmentSimulator } from './InvestmentSimulator';
import { YouTubeBackground } from './YouTubeBackground';

export const StatsSection = () => {
  const stats = [
    { label: "Annual Footfall", value: "85M", sub: "Global Visitors", icon: Users },
    { label: "Gross Leasable Area", value: "2.8M", sub: "Sq Ft Luxury Retail", icon: ShoppingBag },
    { label: "Revenue Target", value: "$5.2B", sub: "Annual GMV Potential", icon: TrendingUp },
    { label: "Regional Reach", value: "350M", sub: "People in 4hr Flight", icon: Globe },
  ];

  return (
    <section id="scale" className="py-32 bg-luxury-black text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <YouTubeBackground videoId="upFoXg7myu8" startTime={60} overlayOpacity={0.8} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-[0.5em] text-luxury-gold mb-6 font-bold">Performance & Power</h2>
            <h3 className="text-5xl font-display leading-tight">
              The Architecture <br /> of <span className="italic">Influence</span>
            </h3>
          </div>
          <p className="text-white/60 max-w-sm text-right font-light leading-relaxed">
            Data that drives investment. We provide the platform; the world provides the audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-12 border border-white/10 bg-luxury-black/40 backdrop-blur-sm cinematic-shadow hover:border-luxury-gold transition-colors group"
            >
              <stat.icon className="text-luxury-gold mb-8 transition-transform group-hover:scale-110" size={32} />
              <div className="text-6xl font-display font-medium mb-4">{stat.value}</div>
              <div className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">{stat.label}</div>
              <div className="text-xs italic text-luxury-gold">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-24 p-12 bg-luxury-black text-white cinematic-shadow border border-white/5 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-60">
                <YouTubeBackground videoId="_kvEuReNgsw" overlayOpacity={0.8} />
            </div>
            <div className="relative z-10">
                <div className="mb-12">
                    <h4 className="text-3xl font-display italic mb-4">Strategic Selection</h4>
                    <p className="text-white/60 font-light max-w-2xl">
                        Discover how your brand aligns with our destination architecture. 
                        Choose your category to explore localized footfall and growth projections.
                    </p>
                </div>
                <InvestmentSimulator />
            </div>
        </div>
      </div>
    </section>
  );
};
