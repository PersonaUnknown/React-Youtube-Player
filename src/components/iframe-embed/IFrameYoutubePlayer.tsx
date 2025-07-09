import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        onYouTubePlayerAPIReady: () => void;
    }
}


const IFrameYoutubePlayer = ({
    videoId
}: IFrameYoutubePlayerProps) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializePlayer = () => {
        if (playerRef.current) {
            new window.YT.Player(playerRef.current, {
                height: '324',
                width: '576',
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    fs: 0,
                    disablekb: 1
                }
            });
        }
    };

    // Check if YouTube API is already loaded
    if (window.YT && window.YT.Player) {
        initializePlayer();
    } else {
        // Load YouTube API
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        window.onYouTubePlayerAPIReady = initializePlayer;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag) {
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
    }

    // Cleanup function
    return () => {
        window.onYouTubePlayerAPIReady = () => {};
    };
  }, [videoId]);

  return (
    <div 
        ref={playerRef} 
        className="flex px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto gap-6" 
    >
    </div>
  );
};

interface IFrameYoutubePlayerProps {
    videoId: string;
}

export default IFrameYoutubePlayer;