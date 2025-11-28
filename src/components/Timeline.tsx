'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Heart, Sparkles, Star, type LucideIcon } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const events: TimelineEvent[] = [
  {
    date: 'September 2023',
    title: 'Our Beginning',
    description: 'When two hearts found each other and started a beautiful journey together.',
    icon: Heart,
  },
  {
    date: 'Every Day Since',
    title: 'Building Trust',
    description: 'Each moment we share strengthens our bond and deepens our connection.',
    icon: Sparkles,
  },
  {
    date: 'Today',
    title: 'Growing Together',
    description: 'Creating memories, supporting each other, and building something beautiful.',
    icon: Star,
  },
  {
    date: 'Forever',
    title: 'Our Future',
    description: 'A promise of continued love, safety, and countless adventures ahead.',
    icon: Calendar,
  },
];

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative flex items-center mb-16 md:mb-24"
    >
      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 -translate-x-1/2 hidden md:block" />

      {/* Content */}
      <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="glass-card p-8 rounded-2xl relative overflow-hidden group"
        >
          {/* Hover gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className={`relative z-10 flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'}`}>
            <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              {(() => {
                const IconComponent = event.icon;
                return <IconComponent className="w-6 h-6" />;
              })()}
            </div>
            <p className="text-sm font-medium text-primary/70 font-serif italic">{event.date}</p>
          </div>
          
          <h3 className="relative z-10 text-2xl font-serif font-semibold text-primary mb-3">
            {event.title}
          </h3>
          
          <p className="relative z-10 text-secondary/70 leading-relaxed">
            {event.description}
          </p>
        </motion.div>
      </div>

      {/* Center dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-cream hidden md:block shadow-[0_0_0_4px_rgba(190,24,93,0.2)]" />
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  return (
    <section ref={ref} className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Our Journey
          </h2>
          <p className="text-xl text-secondary/70 max-w-2xl mx-auto font-serif italic">
            Every moment with you has been a treasure, building a foundation of love and trust.
          </p>
        </motion.div>

        {/* Timeline events */}
        <div className="relative">
          {events.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
