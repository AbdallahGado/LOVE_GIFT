'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface WelcomeOverlayProps {
  onStart: () => void;
}

export default function WelcomeOverlay({ onStart }: WelcomeOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleStart = () => {
    setIsVisible(false);
    setTimeout(onStart, 500); // Slight delay to allow animation to start
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
        >
          <div className="text-center px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8 flex justify-center"
            >
              <Heart className="w-20 h-20 text-primary fill-primary animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4"
            >
              For Malaak
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl text-secondary/70 mb-12 font-serif italic"
            >
              A special surprise awaits you...
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-4 bg-primary text-white rounded-full text-lg font-medium shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
            >
              <span>Open Gift</span>
              <Heart className="w-5 h-5 fill-white" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
