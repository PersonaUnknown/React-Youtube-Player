/** 
 * @description Custom Youtube player component
 * @prop url: string for URL of current Youtube video playing
 * @prop timestamps: array of Timestamp objects to be passed to YoutubeVideo component
*/
import { useMediaFullscreenRef, useMediaSelector } from "media-chrome/dist/react/media-store.js";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import "youtube-video-element";
import { useVideoUI } from "../../contexts/VideoUIContext";
import type { VideoElement } from "../../types/contexts";
import type { Timestamp } from "../../types/types";
import CurrentVideoTime from "./CurrentVideoTime";
import DurationVideoTime from "./DurationVideoTime";
import FullScreenButton from "./FullScreenButton";
import PlayButton from "./PlayButton";
import VideoProgressBar from "./VideoProgressBar";
import VolumeButton from "./VolumeButton";
import VolumeControls from "./VolumeControls";
import YoutubeVideo from "./YoutubeVideo";
const YoutubePlayer = ({ url, timestamps }: YoutubePlayerProps) => {
    // Setup
	const isVideoLoading = useMediaSelector((state) => state.mediaLoading);
    const mediaContainerRef = useRef<HTMLDivElement>(null);
	const mediaControlsRef = useRef<HTMLDivElement>(null);
    const mediaPopupRef = useRef<HTMLDivElement>(null);
    const { currSelectedElement, setCurrSelectedElement, selectedElementOffset, setVideoContainerWidth, isFullScreen, setIsFullScreen } = useVideoUI();
    const listOfInvalidElements: VideoElement[] = [
        "NONE",
        "VIDEO_PLAYER_CONTAINER",
        "VIDEO_PROGRESS_BAR"
    ]
    const fullscreenRef = useMediaFullscreenRef();
    // Methods
    useEffect(() => {
        const initContainerWidth = () => {
            const width = mediaContainerRef?.current?.scrollWidth ?? 0;
            setVideoContainerWidth(width); 
        }

        const toggleFullscreen = (e: KeyboardEvent) => {
            if (e.key === "f") {
                setIsFullScreen(prev => !prev);
            }
            e.stopPropagation();
        }

        const fullScreenCheck = () => {
            if (document.fullscreenElement) {
                setIsFullScreen(true);
            } else {
                setIsFullScreen(false);
            }
        }
        initContainerWidth();
        window.addEventListener("resize", initContainerWidth);
        document.addEventListener("keydown", toggleFullscreen);
        mediaContainerRef.current?.addEventListener("keydown", (e) => {
            e.stopPropagation();
        })
        return () => {
            window.removeEventListener("resize", initContainerWidth);
            window.removeEventListener("keydown", toggleFullscreen);
        }
    }, []);
    useEffect(() => {
        const mediaContainer = mediaContainerRef.current;
        if (!mediaContainer) {
            return;
        }
        if (isFullScreen) {
            mediaContainer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }, [isFullScreen]);
    const onMouseEnter = () => {
        setCurrSelectedElement("VIDEO_PLAYER_CONTAINER");
    }
    const onMouseLeave = () => {
        setCurrSelectedElement("NONE");
    }

    // Render
    return (
        <div 
            className="w-full aspect-[9/16] md:aspect-[16/9] relative rounded-xl overflow-hidden"
            // style={{
            //     position: "absolute",
            //     inset: 0,
            //     width: "100vw",
            //     height: "100vh",
            //     overflow: "hidden"
            // }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={mediaContainerRef}
        >
            {/* Youtube Video */}
            <YoutubeVideo url={url} />

            {/* Media Controls */}
            <div ref={mediaControlsRef} className="z-50 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                {!isVideoLoading &&
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <CurrentVideoTime />
                            <VideoProgressBar timestamps={timestamps} />
                            <DurationVideoTime />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <PlayButton />
                                <VolumeButton />
                            </div>
                            <div>
                                <FullScreenButton />
                            </div>
                            {/* <VolumeControls /> */}
                        </div>
                    </div>
                }
            </div>

            {/* UI Popups */}
            {!listOfInvalidElements.includes(currSelectedElement) && (
                <motion.div 
                    className="bg-[#1f1d1b] text-white rounded-lg p-2 text-xs absolute select-none"
                    style={{
                        bottom: mediaControlsRef?.current?.clientHeight ?? 0,
                        left: selectedElementOffset.left,
                        right: selectedElementOffset.right
                    }}
                    ref={mediaPopupRef}
                >
                    {currSelectedElement}
                </motion.div>
            )}
        </div>
	);
};

interface YoutubePlayerProps {
	url: string;
	timestamps: Timestamp[];
}

export default YoutubePlayer;
