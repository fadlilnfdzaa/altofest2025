'use client';

import { useState, useEffect, useRef } from 'react';

interface YouTubeBackgroundMusicProps {
  videoId: string;
}

export default function YouTubeBackgroundMusic({ videoId }: YouTubeBackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load YouTube API
  useEffect(() => {
    // Only load the script once
    if (!document.getElementById('youtube-api-script')) {
      // Create script element
      const tag = document.createElement('script');
      tag.id = 'youtube-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';

      // Add script to document
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Define the onYouTubeIframeAPIReady function
    // This is called by the YouTube API when it's ready
    window.onYouTubeIframeAPIReady = () => {
      if (containerRef.current) {
        playerRef.current = new YT.Player(containerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            loop: 1,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      }
    };

    return () => {
      // Clean up
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Handle player ready event
  const onPlayerReady = (event: YT.PlayerEvent) => {
    setIsPlayerReady(true);
    event.target.setVolume(30); // Set volume to 30%

    // Try to autoplay (may be blocked by browser)
    // This will likely fail due to browser autoplay policies
    if (!hasScrolled && isFirstInteraction) {
      try {
        event.target.playVideo();
        setIsPlaying(true);
        setIsFirstInteraction(false);
      } catch (error) {
        console.error('Autoplay prevented:', error);
        setIsPlaying(false);
        // We'll wait for scroll event instead
      }
    }
  };

  // Handle player state change
  const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === YT.PlayerState.ENDED) {
      // Loop the video
      if (playerRef.current) {
        playerRef.current.playVideo();
      }
    }

    // Update playing state
    setIsPlaying(event.data === YT.PlayerState.PLAYING);
  };

  // Function to play video
  const playVideo = () => {
    if (playerRef.current && isPlayerReady && !isPlaying) {
      playerRef.current.playVideo();
      setIsFirstInteraction(false);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!playerRef.current || !isPlayerReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playVideo();
    }
  };

  // Add scroll event listener to play music on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && isFirstInteraction && isPlayerReady) {
        setHasScrolled(true);
        playVideo();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled, isFirstInteraction, isPlayerReady]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Hidden YouTube player */}
      <div
        ref={containerRef}
        className="hidden"
      ></div>

      {/* Control button */}
      <button
        onClick={togglePlayPause}
        className="bg-[#FFC700] hover:bg-[#e6b400] text-[#7a3c20] p-3 rounded-full shadow-lg transition-all flex items-center justify-center"
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'Pause background music' : 'Play background music'}
        disabled={!isPlayerReady}
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
