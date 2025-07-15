import { useEffect, useRef } from 'react';
import type { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import { useYoutubeVideo } from '../contexts/IFrameYoutubeVideoContext';
import MediaControls from './MediaControls';

declare global {
    interface Window {
        onYouTubePlayerAPIReady: () => void;
    }
}

const IFrameYoutubePlayer = ({
    videoId
}: IFrameYoutubePlayerProps) => {
    // Setup
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    // Methods
    const { setPlayer, setSize, setIsPaused, hasPlayedVideo, setHasPlayedVideo } = useYoutubeVideo();
    // Methods
    const onReady = () => {
        onResize();
    }
    const onStateChange = (e: YouTubeEvent) => {
        const player: YouTubePlayer = e.target;
        const playerState = player.getPlayerState();
        if (playerState === YT.PlayerState.PLAYING) {
            if (!hasPlayedVideo) {
                setHasPlayedVideo(true);
            }
            setIsPaused(false);
        }
        if (playerState === YT.PlayerState.PAUSED) {
            setIsPaused(true);
        }
    }
    const onResize = () => {
        if (!containerRef?.current) {
            return;
        }
        const clientWidth = containerRef.current.clientWidth;
        const height = clientWidth * 9 / 16;
        setSize(clientWidth, height);
    }
    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, []);
    useEffect(() => {
        const initializePlayer = () => {
            if (playerRef.current) {
                const newPlayer = new window.YT.Player(playerRef.current, {
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
                        onReady: onReady,
                        onStateChange: onStateChange,
                    }
                });
                setPlayer(newPlayer);
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

    return (
        <div
            className="relative max-w-7xl aspect-video" 
            id="iframe-yt-player" 
            ref={containerRef}
        >
            <div ref={playerRef} />
            <MediaControls />
        </div>
    );
};

interface IFrameYoutubePlayerProps {
    videoId: string;
}

export default IFrameYoutubePlayer;