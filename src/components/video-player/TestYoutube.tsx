import { useEffect, useRef } from 'react';

const TestYoutube = () => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if YouTube API is already loaded
    if (window.YT && window.YT.Player) {
        initializePlayer();
    } else {
        // Load YouTube API
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/player_api';
        window.onYouTubePlayerAPIReady = initializePlayer;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Cleanup function
    return () => {
      if (window.onYouTubePlayerAPIReady) {
        window.onYouTubePlayerAPIReady = null;
      }
    };
  }, []);

  const initializePlayer = () => {
    if (playerRef.current) {
      new window.YT.Player(playerRef.current, {
        height: '720',
        width: '1280',
        host: 'https://www.youtube-nocookie.com',
        videoId: 'M7lc1UVf-VE',
        playerVars: {
          autoplay: 0,
          controls: 1,
          showinfo: 1,
          rel: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          fs: 0,
          disablekb: 1
        }
      });
    }
  };

  return (
    <div ref={playerRef} className="flex px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto gap-6" 

    >
        <button className="bottom-0">
            Click
        </button>
    </div>
  );
};

export default TestYoutube;