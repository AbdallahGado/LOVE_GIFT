'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Our Journey', href: '#journey' },
  { name: 'Memories', href: '#memories' },
  { name: 'Letter', href: '#letter' },
];

export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="glass-card rounded-full px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="font-serif font-bold text-primary text-lg">For Malaak</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 rounded-full text-secondary/70 hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Indicator */}
          <div className="md:hidden">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
