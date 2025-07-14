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
                },
                events: {
                    // "onReady":
                    // "onStateChange":
                }
            });
        }
    };

    // Check if YouTube API is already loaded (optional)
    if (window.YT?.Player) {
        initializePlayer();
    } else {
        // Load YouTube API (mandatory)
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

  const toggleVideoPlayback = () => {
    
  }

  return (
    <div
        className="relative px-4 sm:px-6 py-4 sm:py-6 max-w-7xl aspect-[9/16] md:aspect-[16/9]"
    >
        <div 
            ref={playerRef} 
            className="flex max-w-7xl mx-auto gap-6" 
        >
        </div>
        {/* Media Controls */}
        <div 
            className="z-50 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
        >
            <div className="flex flex-col gap-2">
                <div className="text-white">
                    Hello
                </div>
            </div>
        </div>
    </div>
  );
};

interface IFrameYoutubePlayerProps {
    videoId: string;
}

export default IFrameYoutubePlayer;