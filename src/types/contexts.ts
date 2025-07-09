import type { Dispatch, SetStateAction } from "react";
/** 
 * @description Values intended to be updated by a child video element but shared with other child elements or parent video controller
*/
export interface VideoUIContextType {
    currSelectedElement: VideoElement;
    setCurrSelectedElement: Dispatch<SetStateAction<VideoElement>>;
    selectedElementOffset: HorizontalPosition;
    setSelectedElementOffset: Dispatch<SetStateAction<HorizontalPosition>>;
    videoContainerWidth: number;
    setVideoContainerWidth: Dispatch<SetStateAction<number>>;
    isFullScreen: boolean;
    setIsFullScreen: Dispatch<SetStateAction<boolean>>;
}

/** 
 * @description List of all possible video elements the video controller will have (including none)
*/
export type VideoElement = 
    "PLAYBACK_BUTTON" | 
    "MUTE_BUTTON" | 
    "VOLUME_SLIDER" | 
    "FULLSCREEN_BUTTON" | 
    "VIDEO_PROGRESS_BAR" | 
    "VIDEO_PLAYER_CONTAINER" |
    "NONE";

export interface HorizontalPosition {
    left: number | undefined;
    right: number | undefined;
}