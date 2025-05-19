'use client';

import { useState, useEffect, useRef } from 'react';

interface BackgroundMusicProps {
  audioSrc: string;
}

export default function BackgroundMusic({ audioSrc }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [showInitialPrompt, setShowInitialPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3; // Set initial volume to 30%

      // Add event listeners
      audioRef.current.addEventListener('play', () => setIsPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));

      // Clean up on unmount
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
        }
      };
    }
  }, [audioSrc]);

  // Function to play audio
  const playAudio = () => {
    if (audioRef.current && !isPlaying) {
      // Play the audio
      const playPromise = audioRef.current.play();

      // Handle autoplay restrictions
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsFirstInteraction(false);
            setShowInitialPrompt(false);
          })
          .catch(error => {
            console.error('Playback prevented:', error);
            setIsPlaying(false);
          });
      }
    }
  };

  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        playAudio();
      }
    }
  };

  // Initial play button (large, centered)
  if (showInitialPrompt) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
        <div className="bg-[#FFC700]/90 p-6 rounded-xl shadow-2xl text-center max-w-md mx-4">
          <h2 className="text-[#7a3c20] text-xl font-bold mb-3">Musik Festival</h2>
          <p className="text-[#7a3c20] mb-4">
            Nikmati pengalaman ALTOFEST 2025 dengan musik latar yang akan menemani kunjungan Anda.
          </p>
          <button
            onClick={() => {
              playAudio();
              setShowInitialPrompt(false);
            }}
            className="bg-[#7a3c20] hover:bg-[#8B4513] text-white font-bold py-3 px-8 rounded-full transition-all flex items-center justify-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Putar Musik
          </button>
          <button
            onClick={() => setShowInitialPrompt(false)}
            className="mt-3 text-[#7a3c20] hover:underline text-sm"
          >
            Lanjutkan tanpa musik
          </button>
        </div>
      </div>
    );
  }

  // Regular control button (small, bottom-right corner)
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={togglePlayPause}
        className="bg-[#FFC700] hover:bg-[#e6b400] text-[#7a3c20] p-3 rounded-full shadow-lg transition-all flex items-center justify-center"
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'Pause background music' : 'Play background music'}
      >
        {isPlaying ? (
          // Pause icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          // Play icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        )}
      </button>
    </div>
  );
}
