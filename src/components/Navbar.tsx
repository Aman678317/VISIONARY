import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search } from 'lucide-react';

export const Navbar = ({ onSearchOpen }: { onSearchOpen: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Vision', href: '#vision' },
    { name: 'Scale', href: '#scale' },
    { name: 'Retail', href: '#retail' },
    { name: 'Couture', href: '#couture' },
    { name: 'Events', href: '#entertainment' },
    { name: 'Lifestyle', href: '#lifestyle' },
    { name: 'Design', href: '#design' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 glass-morphism' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-widest text-white flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-full border-2 border-luxury-gold flex items-center justify-center">
            <span className="text-xs">V</span>
          </div>
          VISIONARY
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={onSearchOpen}
            className="text-white/60 hover:text-luxury-gold transition-colors p-2"
          >
            <Search size={20} />
          </button>
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs uppercase tracking-widest font-medium hover:text-luxury-gold transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 border border-luxury-gold rounded-full text-xs uppercase tracking-widest hover:bg-luxury-gold hover:text-white transition-all"
          >
            Invest Now
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={onSearchOpen}
            className="text-white/60 hover:text-luxury-gold transition-colors"
          >
            <Search size={20} />
          </button>
          <button 
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-morphism border-b border-white/10"
          >
            <div className="flex flex-col gap-6 p-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-display tracking-widest"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
