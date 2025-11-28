  'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Camera, X, Plus } from 'lucide-react';

// Real gallery data
const photos = [
  { id: 1, caption: 'Beautiful Moments', tall: false, color: 'from-rose-200 to-pink-100', src: '/photos/WhatsApp Image 2025-11-28 at 9.05.23 PM.jpeg' },
  { id: 2, caption: 'Us', tall: true, color: 'from-blue-200 to-cyan-100', src: '/photos/WhatsApp Image 2025-11-28 at 9.05.27 PM (1).jpeg' },
  { id: 3, caption: 'Together Forever', tall: false, color: 'from-amber-200 to-yellow-100', src: '/photos/WhatsApp Image 2025-11-28 at 9.05.27 PM (2).jpeg' },
  { id: 4, caption: 'My Love', tall: false, color: 'from-violet-200 to-purple-100', src: '/photos/WhatsApp Image 2025-11-28 at 9.05.27 PM (3).jpeg' },
  { id: 5, caption: 'Sweet Memories', tall: true, color: 'from-emerald-200 to-green-100', src: '/photos/WhatsApp Image 2025-11-28 at 9.05.27 PM (4).jpeg' },
  { id: 6, caption: 'Adventures', tall: false, color: 'from-orange-200 to-red-100', src: '/photos/WhatsApp Image 2025-11-28 at 9.05.27 PM (5).jpeg' },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Our Memories
          </h2>
          <p className="text-xl text-secondary/70 font-serif italic">
            Snapshots of our beautiful journey together
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, rotate: Math.random() * 2 - 1 }}
              onClick={() => setSelectedPhoto(photo.id)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-lg glass-card ${
                photo.tall ? 'row-span-2' : ''
              }`}
              style={{ minHeight: photo.tall ? '400px' : '250px' }}
            >
              {/* Image */}
              <div className={`absolute inset-0 bg-gradient-to-br ${photo.color} opacity-80 flex items-center justify-center group`}>
                <img 
                  src={photo.src} 
                  alt={photo.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </div>

              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-6 translate-y-full hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium font-serif">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
          

        </div>

        {/* Photo modal */}
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-white hover:text-accent transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative max-w-4xl w-full h-[80vh] bg-white/10 rounded-2xl flex items-center justify-center overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${photos.find(p => p.id === selectedPhoto)?.color || 'from-gray-200 to-gray-100'} opacity-30`} />
              {(() => {
                const photo = photos.find(p => p.id === selectedPhoto);
                return photo ? (
                  <img 
                    src={photo.src} 
                    alt={photo.caption}
                    className="relative z-10 max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                  />
                ) : null;
              })()}
            </motion.div>
          </motion.div>
        )}

        {/* Note about photos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-secondary/60 italic font-serif">
            ✨ That's was a really long journey ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}
