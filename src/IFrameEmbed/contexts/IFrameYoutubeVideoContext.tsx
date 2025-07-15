import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";

var player: YT.Player | null = null;
interface IFrameYoutubeVideoContextType {
    player: YT.Player | null;
    setPlayer: (newPlayer: YT.Player) => void;
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

interface IFrameYoutubeVideoProviderProps {
    children: React.ReactNode;
}

export const IFrameYoutubeVideoContext = createContext<IFrameYoutubeVideoContextType>(
    {} as IFrameYoutubeVideoContextType
);

export const IFrameYoutubeVideoProvider = ({ children }: IFrameYoutubeVideoProviderProps) => {
    // Setup
    const [hasPlayedVideo, setHasPlayedVideo] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volumeLevel, setVolumeLevel] = useState<number>(0);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    // Methods
    const setPlayer = (newPlayer: YT.Player) => {
        player = newPlayer;
        const notMuted = false;
        const fullVolume = 100;
        setIsMuted(notMuted);
        setVolumeLevel(fullVolume);
        player.unMute();
        player.setVolume(fullVolume);
    }
    const setSize = (width: number, height: number) => {
        if (!player) {
            return;
        }

        player.setSize(width, height);
    }
    const onPlayback = () => {
        if (!player) {
            return;
        }

        const playerState = player.getPlayerState();
        switch (playerState) {
            case YT.PlayerState.ENDED:
            case YT.PlayerState.UNSTARTED:
            case YT.PlayerState.PAUSED:
            case YT.PlayerState.CUED:
                player.playVideo();
                setIsPaused(false);
                break;
            case YT.PlayerState.PLAYING:
                player.pauseVideo();
                setIsPaused(true);
                break;
            default:
                break;
        }
    }

    const seekTo = (seconds: number) => {
        if (!player) {
            return;
        }

        const allowSeekAhead = true;
        player.seekTo(seconds, allowSeekAhead);
        setCurrentTime(seconds);
    }

    const mute = () => {
        if (!player) {
            return;
        }

        player.mute();
        setIsMuted(true);
    }

    const unMute = () => {
        if (!player) {
            return;
        }

        player.unMute();
        setIsMuted(false);
    }

    const setVolume = (volume: number) => {
        if (!player) {
            return;
        }

        player.setVolume(volume);
        setVolumeLevel(volume);
    }

    useEffect(() => {
        const interval = setInterval(async () => { 
            if (player) {
                const seconds = player.getCurrentTime();
                setCurrentTime(seconds);
                const duration = player.getDuration();
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
        <IFrameYoutubeVideoContext.Provider
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
        </IFrameYoutubeVideoContext.Provider>
    )
};

export const useYoutubeVideo = (): IFrameYoutubeVideoContextType => {
    const context = useContext(IFrameYoutubeVideoContext);
    if (!context) {
        throw new Error("useYoutubeVideo must be used within a VideoUIProvider");
    }
    return context;
}
