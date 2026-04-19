import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Loader2, Command, ArrowRight } from 'lucide-react';
import { searchWebsite } from '../services/aiSearchService';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch site data for context
    const fetchContext = async () => {
      try {
        const [sections, highlights] = await Promise.all([
          fetch('/api/sections').then(res => res.json()),
          fetch('/api/highlights').then(res => res.json())
        ]);
        
        const contextString = `
          Sections: ${JSON.stringify(sections)}
          Global Highlights: ${JSON.stringify(highlights)}
        `;
        setContext(contextString);
      } catch (err) {
        console.error("Context fetch failed", err);
      }
    };
    
    if (isOpen) {
      fetchContext();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);

    const answer = await searchWebsite(query, context);
    setResult(answer);
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-luxury-black/95 backdrop-blur-xl flex flex-col p-6 md:p-24"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/40 hover:text-luxury-gold transition-colors"
          >
            <X size={32} />
          </button>

          <div className="max-w-4xl mx-auto w-full pt-20">
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-[0.5em] text-luxury-gold mb-4 font-bold">Digital Concierge</h2>
              <p className="text-white/40 text-sm font-light">Ask anything about the Dubai Mall destination experience.</p>
            </div>

            <form onSubmit={handleSearch} className="relative group">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the future..."
                className="w-full bg-transparent border-b border-white/10 py-8 text-4xl md:text-6xl font-display outline-none focus:border-luxury-gold transition-all placeholder:text-white/5"
              />
              <button 
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-luxury-gold hover:translate-x-2 transition-transform"
              >
                {isLoading ? <Loader2 className="animate-spin" size={48} /> : <ArrowRight size={48} />}
              </button>
            </form>

            <div className="mt-12">
              <AnimatePresence mode="wait">
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-12 glass-morphism border border-white/5 text-xl md:text-2xl font-light leading-relaxed text-white/80"
                  >
                    {result}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!result && !isLoading && (
              <div className="mt-12 flex flex-wrap gap-4">
                <span className="text-[10px] uppercase tracking-widest text-white/20 w-full mb-2">Suggestions</span>
                {['Leasing opportunities', 'Annual visitors', 'Luxury fashion brands', 'Global events'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                        setQuery(suggestion);
                        setTimeout(() => handleSearch({ preventDefault: () => {} } as any), 100);
                    }}
                    className="px-6 py-3 rounded-full border border-white/5 text-xs text-white/40 hover:border-luxury-gold hover:text-white transition-all cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-white/20">
            <div className="flex items-center gap-2">
              <Command size={12} /> + K to search
            </div>
            <div>Powered by Gemini AI</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
