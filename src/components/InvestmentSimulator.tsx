import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Zap, TrendingUp, BarChart3 } from 'lucide-react';

type BusinessType = 'luxury' | 'boutique' | 'fb' | 'entertainment';

export const InvestmentSimulator = () => {
  const [selected, setSelected] = useState<BusinessType | null>(null);

  const businessData: Record<BusinessType, {
    title: string;
    description: string;
    growth: string;
    traffic: string;
    synergy: string;
  }> = {
    luxury: {
      title: "Haute Luxury",
      description: "Position your flagship in the high-net-worth corridor. Benefit from dedicated VIP entrances and private concierge services.",
      growth: "45% YoY",
      traffic: "High AOV / Targeted",
      synergy: "Adjacent to 5-star Hospitality"
    },
    boutique: {
      title: "Artisanal Boutique",
      description: "Curated spaces for unique craftsmanship and limited editions. Capture the 'discovery' shopper segment.",
      growth: "32% YoY",
      traffic: "High Engagement",
      synergy: "Creative Arts District"
    },
    fb: {
      title: "Gastronomic Concept",
      description: "From rooftop fine dining to waterfront casual. Take advantage of our 18,000+ per hour dinner traffic.",
      growth: "55% YoY",
      traffic: "High Frequency",
      synergy: "Entertainment Anchors"
    },
    entertainment: {
      title: "Experiential Venue",
      description: "Digital art, virtual theaters, or live performance spaces. Become a regional attractor.",
      growth: "60% YoY",
      traffic: "Mass Volume",
      synergy: "Event Center Proximity"
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {(Object.keys(businessData) as BusinessType[]).map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`p-6 border transition-all duration-500 text-left group ${
              selected === key 
                ? 'bg-white text-luxury-black border-luxury-gold' 
                : 'bg-white/5 border-white/10 text-white hover:border-luxury-gold'
            }`}
          >
            <div className={`text-[10px] uppercase tracking-widest font-bold mb-4 ${
                selected === key ? 'text-luxury-gold' : 'text-white/40 group-hover:text-luxury-gold'
            }`}>
              {key}
            </div>
            <h4 className="font-display italic text-lg">{businessData[key].title}</h4>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start"
          >
            <div className="md:col-span-1">
              <h5 className="text-xl font-display italic mb-6">Strategic Outlook</h5>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                {businessData[selected].description}
              </p>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                    { label: "Est. Growth", val: businessData[selected].growth, icon: TrendingUp },
                    { label: "Traffic Type", val: businessData[selected].traffic, icon: Zap },
                    { label: "Location Synergy", val: businessData[selected].synergy, icon: BarChart3 }
                ].map((stat, i) => (
                    <motion.div 
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 glass-morphism border-white/10 flex flex-col items-center text-center"
                    >
                        <stat.icon size={20} className="text-luxury-gold mb-4" />
                        <div className="text-2xl font-display mb-2">{stat.val}</div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-white/40">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center text-white/30 italic"
          >
            <Calculator size={48} className="mb-6 opacity-20" />
            <p>Select your business category to see our tailored projection.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
