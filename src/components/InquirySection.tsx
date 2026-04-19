import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { YouTubeBackground } from './YouTubeBackground';

export const InquirySection = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business_type: '',
    interest_type: 'leasing',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      
      setFormState('success');
    } catch (error) {
      console.error('Inquiry submission failed:', error);
      // Fallback to API if Firestore fails (or just show error)
      try {
        const response = await fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
            setFormState('success');
            return;
        }
      } catch (fallbackError) {
        console.error('API Fallback failed:', fallbackError);
      }
      setFormState('idle');
      alert("There was an error sending your inquiry. Please try again later.");
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-luxury-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <YouTubeBackground videoId="mIyQZpFnGhE" overlayOpacity={0.8} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-xs uppercase tracking-[0.5em] text-luxury-gold mb-6 font-bold">Partner With Us</h2>
          <h3 className="text-5xl font-display mb-12 leading-tight">
            Secure Your Place <br /> in the <span className="italic">Future</span>
          </h3>
          <p className="text-white/60 font-light leading-relaxed mb-12 max-w-md">
            We are curating a select group of investment partners and brands. 
            Tell us about your vision and how it fits within the Oasis ecosystem.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-luxury-gold flex items-center justify-center text-luxury-gold italic font-display">01</div>
              <div>
                <p className="font-bold text-sm tracking-widest uppercase">Select Opportunities</p>
                <p className="text-xs text-white/40 italic">Limited flagship locations remaining</p>
              </div>
            </div>
             <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-luxury-gold flex items-center justify-center text-luxury-gold italic font-display">02</div>
              <div>
                <p className="font-bold text-sm tracking-widest uppercase">Global Activations</p>
                <p className="text-xs text-white/40 italic">Sponsorship slots for Q4 now open</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-morphism p-12 cinematic-shadow text-white"
        >
          {formState === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <CheckCircle size={64} className="text-luxury-gold mb-8" />
              <h4 className="text-3xl font-display mb-4 italic">Vision Received</h4>
              <p className="text-white/50 font-light">An associate from our global commercial team will contact you within 24 hours.</p>
              <button 
                onClick={() => setFormState('idle')}
                className="mt-12 text-xs uppercase tracking-widest font-bold text-luxury-gold hover:tracking-[0.3em] transition-all"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-transparent border-b border-white/10 py-2 focus:border-luxury-gold outline-none text-sm transition-colors text-white"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Email Address</label>
                  <input 
                   required
                    type="email" 
                    className="w-full bg-transparent border-b border-white/10 py-2 focus:border-luxury-gold outline-none text-sm transition-colors text-white"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Business Category</label>
                  <select 
                    className="w-full bg-transparent border-b border-white/10 py-2 focus:border-luxury-gold outline-none text-sm transition-colors appearance-none text-white [&>option]:text-luxury-black"
                    value={formData.business_type}
                    onChange={e => setFormData({...formData, business_type: e.target.value})}
                  >
                    <option value="">Select...</option>
                    <option value="fashion">Luxury Fashion</option>
                    <option value="tech">Technology</option>
                    <option value="fb">Food & Beverage</option>
                    <option value="lifestyle">Lifestyle & Leisure</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Interest Type</label>
                  <select 
                    className="w-full bg-transparent border-b border-white/10 py-2 focus:border-luxury-gold outline-none text-sm transition-colors appearance-none text-white [&>option]:text-luxury-black"
                    value={formData.interest_type}
                    onChange={e => setFormData({...formData, interest_type: e.target.value})}
                  >
                    <option value="leasing">Retail Leasing</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="venue">Venue Booking</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Your Vision / Requirement</label>
                <textarea 
                  rows={4}
                  className="w-full bg-transparent border-b border-white/10 py-2 focus:border-luxury-gold outline-none text-sm transition-colors resize-none text-white"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={formState === 'loading'}
                className="w-full py-5 bg-white text-luxury-black text-xs uppercase tracking-[0.3em] font-bold rounded-full hover:bg-luxury-gold hover:text-white transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {formState === 'loading' ? 'Encrypting Connection...' : (
                  <>
                    Initiate Connection <Send size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
