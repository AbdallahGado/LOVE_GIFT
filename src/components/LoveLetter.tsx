/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Heart, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveLetter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });
  const [isOpen, setIsOpen] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: number; top: number; duration: number; delay: number; }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setHearts(newHearts);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    
    // Trigger confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const colors = ['#be185d', '#fb7185', '#fff1f2'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Background hearts */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
            }}
          >
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            A Letter For You
          </h2>
          <p className="text-xl text-secondary/70 font-serif italic">
            A message from my heart to yours
          </p>
        </motion.div>

        {/* Letter envelope */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: 90 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="relative group"
              >
                <div className="glass-card p-12 rounded-3xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Mail className="w-32 h-32 text-primary group-hover:text-primary/80 transition-colors relative z-10" />
                  
                  {/* Wax Seal Effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <Heart className="w-8 h-8 text-white fill-white" />
                  </div>

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-0 -right-0 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                  >
                    Open me ✨
                  </motion.div>
                </div>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="glass-card p-8 md:p-16 rounded-3xl relative"
            >
              {/* Decorative corner flourishes */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-primary/10 rounded-tl-3xl m-4" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-primary/10 rounded-br-3xl m-4" />

              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary fill-primary" />
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none font-serif">
                <p className="text-primary/90 leading-relaxed mb-6 text-xl">
                  Dear Malaak,
                </p>
                
                <p className="text-secondary/80 leading-relaxed mb-6">
                  From the moment we met in June 2023, my life has been filled with warmth, 
                  joy, and a sense of home I never knew I was missing. You are my comfort, my 
                  safe place, and the most beautiful part of my days.
                </p>
                
                <p className="text-secondary/80 leading-relaxed mb-6">
                  With you, I've learned what it means to truly love someone, to be vulnerable, and to 
                  love without reservation. Your presence brings peace to my chaos, and your smile 
                  lights up even my darkest moments.
                </p>
                
                <p className="text-secondary/80 leading-relaxed mb-6">
                  Thank you for being patient, for understanding, and for choosing to build this 
                  beautiful life with me. Every day with you is a gift, and I promise to cherish 
                  you, support you, and love you with everything I have, be strong and never 
                  forget that you are the most beautiful person I have ever met.
                </p>
                
                <p className="text-primary/90 leading-relaxed text-xl mt-8">
                  Forever yours,<br />
                  <span className="font-dancing text-3xl mt-2 block">Abdallah</span>
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 text-center"
              >
                <p className="text-sm text-secondary/60 italic">
                  ✨ With all my love ✨
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
