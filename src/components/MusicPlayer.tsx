'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';

interface MusicPlayerProps {
  start?: boolean;
}

export default function MusicPlayer({ start = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Playlist — first track is the real MP3 you place in /public/music/
  const playlist = [
  "music/Perfect.mp3",
  "music/All_Of_Me.mp3",
];


  const [trackIndex, setTrackIndex] = useState(0);

  // Handle start prop
  useEffect(() => {
    if (start) {
      setIsPlaying(true);
    }
  }, [start]);

  // Play / Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => console.log("Play blocked until user interaction", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, trackIndex]);

  // Mute
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  // Automatically go to next track (optional)
  const handleEnded = () => {
    const nextIndex = (trackIndex + 1) % playlist.length;
    setTrackIndex(nextIndex);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 right-6 z-40"
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={playlist[trackIndex]}
        loop={playlist.length === 1}
        onEnded={handleEnded}
        preload="auto"
      />

      {/* Expandable Playlist */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-card rounded-2xl p-4 mb-2 min-w-[250px]"
          >
            <p className="text-xs text-secondary/60 mb-2 uppercase tracking-wider">Playlist</p>
            <div className="space-y-2">
              {playlist.map((song, index) => (
                <div
                  key={song}
                  className={`text-sm ${index === trackIndex ? 'text-primary font-medium' : 'text-secondary/60'}`}
                >
                  {index === 0 ? "Your Song" : `Track ${index + 1}`}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player Controls */}
      <motion.div
        className="glass-card rounded-full px-6 py-4 flex items-center gap-3 shadow-lg"
        whileHover={{ scale: 1.05 }}
      >
        {/* Expand/Collapse */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary/70 hover:text-primary transition-colors"
        >
          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </motion.button>

        {/* Music Icon */}
        <motion.div
          animate={isPlaying ? { rotate: [0, 10, -10, 0] } : {}}
          transition={isPlaying ? { duration: 1, repeat: Infinity } : {}}
        >
          <Music className="w-5 h-5 text-primary" />
        </motion.div>

        {/* Play / Pause */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </motion.button>

        {/* Mute / Unmute */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMuted(!isMuted)}
          className="text-primary/70 hover:text-primary transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
