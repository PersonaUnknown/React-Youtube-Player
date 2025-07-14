import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import type { YouTubeEvent, YouTubeProps } from "react-youtube";
import MediaControls from "./MediaControls";
import { useYoutubeVideo } from "../contexts/YoutubeVideoContext";
const ReactYoutubePlayer = ({
    videoId
}: ReactYoutubePlayerProps) => {
    // Setup
   const { setPlayer, setIsPaused, setSize, hasPlayedVideo, setHasPlayedVideo } = useYoutubeVideo();
    const containerRef = useRef<HTMLDivElement>(null);
    const opts: YouTubeProps["opts"] = {
        playerVars: {
            controls: 0,
            fs: 0,
            disablekb: 1,
            rel: 0
        },
    }
    // Methods
    const onReady = (event: YouTubeEvent) => {
        setPlayer(event);
        onResize();
    };
    const onPlay = () => {
        if (!hasPlayedVideo) {
            setHasPlayedVideo(true);
        }
        setIsPaused(false);
    }
    const onPause = () => {
        setIsPaused(true);
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
    // Render
    return (
        <div 
            className="relative max-w-7xl aspect-video" 
            id="react-yt-player" 
            ref={containerRef}
        >
            <YouTube 
                videoId={videoId} 
                opts={opts}
                onReady={onReady}
                onPlay={onPlay}
                onPause={onPause}
            />
            <MediaControls />
        </div>
    );
}

interface ReactYoutubePlayerProps {
    videoId: string;
}

export default ReactYoutubePlayer;