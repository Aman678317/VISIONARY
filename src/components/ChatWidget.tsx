import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Minus, Maximize2, User, Bot, Sparkles } from 'lucide-react';
import { chatWithConcierge } from '../services/aiChatService';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Welcome to the Platinum Concierge. I am here to assist you with leasing inquiries, event opportunities, and any questions regarding the Dubai Mall ecosystem. How may I serve your vision today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sync context for the assistant
    const fetchContext = async () => {
      try {
        const [sections, highlights] = await Promise.all([
          fetch('/api/sections').then(res => res.json()),
          fetch('/api/highlights').then(res => res.json())
        ]);
        setContext(`Sections: ${JSON.stringify(sections)}. Highlights: ${JSON.stringify(highlights)}`);
      } catch (err) {
        console.error("Context fetch failed", err);
      }
    };
    fetchContext();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    history.push({ role: 'user', parts: [{ text: userMessage }] });

    const response = await chatWithConcierge(history, context);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-luxury-gold text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group relative"
          >
            <MessageSquare size={28} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-ping opacity-75"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full"></div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className="w-[90vw] md:w-[400px] h-[600px] bg-luxury-black border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden glass-morphism"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-luxury-gold flex items-center justify-center text-luxury-gold">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white">Platinum Concierge</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Elite Support Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <Minus size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-white/10 text-white' : 'border border-luxury-gold/30 text-luxury-gold'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-light leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white text-luxury-black rounded-tr-none' 
                      : 'bg-white/5 text-white/80 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                    <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center gap-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="How may we assist you?"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-luxury-gold transition-all text-white placeholder:text-white/20"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-luxury-gold text-white flex items-center justify-center disabled:opacity-50 hover:scale-110 active:scale-95 transition-all"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="mt-3 text-[10px] text-center text-white/20 uppercase tracking-[0.2em]">
                Direct connection to Global Commercial Team
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
