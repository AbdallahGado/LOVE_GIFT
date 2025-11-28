'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingParticles() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number; isHeart: boolean; }[]>([]);

  useEffect(() => {
    // Generate random particles only on client side
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 5, // Slightly smaller
      duration: Math.random() * 10 + 20, // Slower animation
      delay: Math.random() * 5,
      isHeart: Math.random() > 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        >
          {particle.isHeart ? (
            <Heart
              className="text-primary fill-primary"
              style={{ width: particle.size, height: particle.size }}
            />
          ) : (
            <Sparkles
              className="text-accent"
              style={{ width: particle.size, height: particle.size }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
