'use client';

import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Gallery from '@/components/Gallery';
import LoveLetter from '@/components/LoveLetter';
import Countdown from '@/components/Countdown';
import ReasonsCarousel from '@/components/ReasonsCarousel';
import MusicPlayer from '@/components/MusicPlayer';
import WelcomeOverlay from '@/components/WelcomeOverlay';
import { useState } from 'react';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen relative">
      <WelcomeOverlay onStart={() => setStarted(true)} />
      
      <div id="home">
        <Hero />
      </div>
      
      <Countdown />
      
      <div id="journey">
        <Timeline />
      </div>
      
      <ReasonsCarousel />
      
      <div id="memories">
        <Gallery />
      </div>
      
      <div id="letter">
        <LoveLetter />
      </div>

      <MusicPlayer start={started} />
    </main>
  );
}
