/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Heart, Smile, Star, Sparkles, Sun, Moon, Coffee, Music } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reasons = [
  {
    icon: Heart,
    text: "Your smile brightens even my darkest days",
    color: "from-rose-400 to-pink-500"
  },
  {
    icon: Smile,
    text: "You make me laugh like no one else can",
    color: "from-amber-400 to-orange-500"
  },
  {
    icon: Star,
    text: "You believe in me when I don't believe in myself",
    color: "from-violet-400 to-purple-500"
  },
  {
    icon: Sparkles,
    text: "Every moment with you feels magical",
    color: "from-cyan-400 to-blue-500"
  },
  {
    icon: Sun,
    text: "You bring warmth and light into my life",
    color: "from-yellow-400 to-amber-500"
  },
  {
    icon: Moon,
    text: "You're the calm in my chaos, my peaceful place",
    color: "from-indigo-400 to-blue-500"
  },
  {
    icon: Coffee,
    text: "You make ordinary moments extraordinary",
    color: "from-amber-500 to-brown-500"
  },
  {
    icon: Music,
    text: "My heart sings when I'm with you",
    color: "from-pink-400 to-rose-500"
  },
];

export default function ReasonsCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reasons.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reasons.length);
  };

  const current = reasons[currentIndex];
  const IconComponent = current.icon;

  return (
    <section 
      ref={ref} 
      className="py-24 px-6 bg-gradient-to-br from-cream via-accent/20 to-cream relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Why I Love You
          </h2>
          <p className="text-xl text-secondary/70">
            Just a few of the countless reasons...
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: 20 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-12 md:p-16 rounded-3xl text-center relative"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${current.color} opacity-10 rounded-3xl`} />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`inline-flex p-6 rounded-full bg-gradient-to-br ${current.color} mb-8`}
                >
                  <IconComponent className="w-12 h-12 text-white" />
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl font-serif text-primary leading-relaxed"
                >
                  `"${current.text}"`
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToPrevious}
              className="p-3 rounded-full bg-white/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {reasons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-primary' 
                      : 'w-2 bg-primary/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToNext}
              className="p-3 rounded-full bg-white/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </motion.button>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-secondary/60 italic text-sm"
        >
          💝 And so much more 💝
        </motion.p>
      </div>
    </section>
  );
}
