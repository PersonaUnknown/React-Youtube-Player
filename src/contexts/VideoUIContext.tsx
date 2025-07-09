/** 
 * @description Context for managing the state of additional UI components for video player component to ensure that media components are mostly propless and do not require a prop(s) to send back to the parent media controller
*/

import { createContext, memo, useContext, useState, type ReactNode } from "react";
import type { HorizontalPosition, VideoElement, VideoUIContextType } from "../types/contexts";

export const VideoUIContext = createContext<VideoUIContextType>(
    {} as VideoUIContextType,
);

export const VideoUIProvider = memo(({ children }: VideoUIProviderProps) => {
    const [currSelectedElement, setCurrSelectedElement] = useState<VideoElement>("NONE");
    const [selectedElementOffset, setSelectedElementOffset] = useState<HorizontalPosition>({ 
        left: undefined, 
        right: undefined
    });
    const [videoContainerWidth, setVideoContainerWidth] = useState<number>(0);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    return (
        <VideoUIContext.Provider
            value={{
                currSelectedElement,
                setCurrSelectedElement,
                selectedElementOffset,
                setSelectedElementOffset,
                videoContainerWidth,
                setVideoContainerWidth,
                isFullScreen,
                setIsFullScreen
            }}
        >
            {children}
        </VideoUIContext.Provider>
    );
});

export const useVideoUI = (): VideoUIContextType => {
    const context = useContext(VideoUIContext);
    if (!context) {
        throw new Error("useVideoUI must be used within a VideoUIProvider");
    }
    return context;
}

interface VideoUIProviderProps {
    children: ReactNode;
}