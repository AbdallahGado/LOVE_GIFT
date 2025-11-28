'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Calendar } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Hydration fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Count since this date
  const targetDate = new Date('2022-06-09T00:00:00');

  const calculateTimePassed = useCallback((): TimeLeft => {
    const difference = +new Date() - +targetDate; // count UP

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!mounted) return;

    // Now safe to set the correct time
    setTimeLeft(calculateTimePassed());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimePassed());
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section ref={ref} className="py-24 px-6 bg-gradient-to-b from-accent/10 to-cream relative overflow-hidden">

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, var(--primary) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Calendar className="w-12 h-12 text-primary" />
            </motion.div>
          </div>

          <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Counting Since That Day
          </h2>

          <p className="text-xl text-secondary/70">
            How long it has been since June 9, 2022
          </p>
        </motion.div>

        {/* Time Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-2xl text-center"
            >
              <motion.div
                key={unit.value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl md:text-6xl font-bold text-primary mb-2 font-serif"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.div>

              <div className="text-sm md:text-base text-secondary/60 uppercase tracking-wider">
                {unit.label}
              </div>

            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-8 text-secondary/60 italic"
        >
          ⏰ Counting every second since June 9, 2023
        </motion.p>

      </div>
    </section>
  );
}
