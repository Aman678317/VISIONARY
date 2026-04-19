import React from 'react';
import { motion } from 'motion/react';
import { YouTubeBackground } from './YouTubeBackground';
import { Play, Calendar, Star } from 'lucide-react';

export const EntertainmentSection = () => {
  const features = [
    { title: "Arena Vision", desc: "A 20,000-seat multi-purpose venue for global concert tours." },
    { title: "Digital Odyssey", desc: "The world's largest immersive digital art auditorium." },
    { title: "Sky Gallery", desc: "Premium events space with 360° views of the Dubai skyline." }
  ];

  return (
    <section id="entertainment" className="relative min-h-screen py-32 bg-luxury-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <YouTubeBackground videoId="xshkQS54Eww" startTime={300} overlayOpacity={0.7} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2 className="text-xs uppercase tracking-[0.6em] text-luxury-gold mb-8 font-bold flex items-center gap-4">
              <Star size={16} /> Entertainment & Attractions
            </h2>
            <h3 className="text-5xl md:text-7xl font-display mb-10 leading-tight">
              Spectacle <br /> <span className="italic font-light text-luxury-gold/80">Reimagined</span>
            </h3>
            <p className="text-xl text-white/60 font-light leading-relaxed mb-12 max-w-xl">
              From the high-octane energy of global sports to the ethereal beauty of digital art, 
              we host the experiences that define the cultural zeitgeist.
            </p>
            
            <div className="space-y-6">
              {features.map((f, i) => (
                <motion.div 
                  key={f.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-morphism p-6 flex items-start gap-6 group hover:border-luxury-gold/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                    <Play size={16} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg italic mb-1">{f.title}</h4>
                    <p className="text-xs text-white/40">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-full aspect-[4/5] border border-white/10 p-4">
                <div className="w-full h-full overflow-hidden">
                    <img 
                      src="https://picsum.photos/seed/event/800/1000" 
                      alt="Event Space" 
                      className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                </div>
                <div className="absolute -bottom-10 -right-10 glass-morphism p-10 flex flex-col items-center">
                    <Calendar className="text-luxury-gold mb-4" size={32} />
                    <p className="text-xs uppercase tracking-widest font-bold">Book a Venue</p>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
