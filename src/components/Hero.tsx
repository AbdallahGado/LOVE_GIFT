'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-accent/20 to-cream animate-gradient-xy" />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, var(--primary) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <div className="glass-card p-12 rounded-[3rem] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          
          {/* Animated heart icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8 flex justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <Heart className="w-20 h-20 text-primary fill-primary relative z-10" />
            </motion.div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-serif font-bold text-primary mb-6 tracking-tight"
          >
            For Malaak
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="text-xl md:text-2xl text-secondary/80 font-light mb-8 font-serif italic"
          >
            A journey of love, trust, and beautiful moments
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <p className="text-sm text-secondary/60 mb-2 font-medium tracking-widest uppercase text-[10px]">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2 backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
