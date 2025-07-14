import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { YouTubeEvent } from "react-youtube";

var player: YouTubeEvent | null = null;

interface YoutubeVideoContextType {
    player: YouTubeEvent | null;
    setPlayer: (newPlayer: YouTubeEvent) => void;
    setSize: (width: number, height: number) => void;
    hasPlayedVideo: boolean;
    setHasPlayedVideo: Dispatch<SetStateAction<boolean>>;
    isPaused: boolean;
    setIsPaused: Dispatch<SetStateAction<boolean>>;
    onPlayback: () => void;
    currentTime: number;
    setCurrentTime: Dispatch<SetStateAction<number>>;
    duration: number;
    setDuration: Dispatch<SetStateAction<number>>;
    seekTo: (seconds: number) => void;
    volumeLevel: number;
    setVolumeLevel: Dispatch<SetStateAction<number>>;
    isMuted: boolean;
    setIsMuted: Dispatch<SetStateAction<boolean>>;
    mute: () => void;
    unMute: () => void;
    setVolume: (volume: number) => void;
    isFullscreen: boolean;
    setIsFullscreen: Dispatch<SetStateAction<boolean>>;
}

interface YoutubeVideoProviderProps {
    children: React.ReactNode;
}

export const YoutubeVideoContext = createContext<YoutubeVideoContextType>(
    {} as YoutubeVideoContextType
);

export const YoutubeVideoProvider = ({ children }: YoutubeVideoProviderProps) => {
    // Setup
    const [hasPlayedVideo, setHasPlayedVideo] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volumeLevel, setVolumeLevel] = useState<number>(0);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    // Methods
    const setPlayer = (newPlayer: YouTubeEvent) => {
        player = newPlayer;
        setIsMuted(newPlayer.target.isMuted());
        setVolumeLevel(newPlayer.target.getVolume());
    }

    const onPlayback = () => {
        if (!player?.target) {
            return;
        }

        const playerState = player.target.getPlayerState();
        switch (playerState) {
            case YT.PlayerState.ENDED:
            case YT.PlayerState.UNSTARTED:
            case YT.PlayerState.PAUSED:
            case YT.PlayerState.CUED:
                player.target.playVideo();
                setIsPaused(false);
                break;
            case YT.PlayerState.PLAYING:
                player.target.pauseVideo();
                setIsPaused(true);
                break;
            default:
                break;
        }
    }

    const seekTo = (seconds: number) => {
        if (!player?.target) {
            return;
        }

        player.target.seekTo(seconds);
        setCurrentTime(seconds);
    }

    const mute = () => {
        if (!player?.target) {
            return;
        }

        player.target.mute();
        setIsMuted(true);
    }

    const unMute = () => {
        if (!player?.target) {
            return;
        }

        player.target.unMute();
        setIsMuted(false);
    }

    const setVolume = (volume: number) => {
        if (!player?.target) {
            return;
        }

        player.target.setVolume(volume);
        setVolumeLevel(volume);
    }

    const setSize = (width: number, height: number) => {
        if (!player?.target) {
            return;
        }

        player.target.setSize(width, height);
    }

    useEffect(() => {
        const interval = setInterval(async () => { 
            if (player?.target) {
                const seconds = player.target.getCurrentTime();
                setCurrentTime(seconds);
                const duration = player.target.getDuration();
                setDuration(duration);
            }
        }, 1000);

        const onFullScreenChange = () => {
            const fullScreenElement = document.fullscreenElement;
            setIsFullscreen(fullScreenElement !== null);
        }

        document.addEventListener("fullscreenchange", onFullScreenChange);
        return () => {
            clearInterval(interval);
            document.removeEventListener("fullscreenchange", onFullScreenChange);
        };
    }, []);

    // Render
    return (
        <YoutubeVideoContext.Provider
            value={{
                player,
                setPlayer,
                setSize,
                hasPlayedVideo,
                setHasPlayedVideo,
                isPaused,
                setIsPaused,
                onPlayback,
                currentTime,
                setCurrentTime,
                duration,
                setDuration,
                seekTo,
                volumeLevel,
                setVolumeLevel,
                isMuted,
                setIsMuted,
                mute,
                unMute,
                setVolume,
                isFullscreen,
                setIsFullscreen
            }}
        >
            {children}
        </YoutubeVideoContext.Provider>
    )
};

export const useYoutubeVideo = (): YoutubeVideoContextType => {
    const context = useContext(YoutubeVideoContext);
    if (!context) {
        throw new Error("useYoutubeVideo must be used within a VideoUIProvider");
    }
    return context;
}
