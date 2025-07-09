/** 
 * @description Component that controls YoutubePlayer and allows additional components to have access to MediaProvider
*/
import { MediaProvider, useMediaSelector } from 'media-chrome/dist/react/media-store.js';
import { useRef } from 'react';
import "youtube-video-element";
import { useVideoUI } from '../../contexts/VideoUIContext';
import type { VideoElement } from '../../types/contexts';
import CurrentVideoTime from './CurrentVideoTime';
import DurationVideoTime from './DurationVideoTime';
import FullScreenButton from './FullScreenButton';
import PlayButton from './PlayButton';
import VideoContainer from './VideoContainer';
import VideoProgressBar from './VideoProgressBar';
import VolumeButton from './VolumeButton';
import YoutubePlayer from './YoutubePlayer';
import YoutubeVideo from './YoutubeVideo';

const YoutubePlayerController = () => {
    // Setup
    // const isVideoLoading = useMediaSelector((state) => state.mediaLoading);
    const mediaContainerRef = useRef<HTMLDivElement>(null);
    const mediaControlsRef = useRef<HTMLDivElement>(null);
    const mediaPopupRef = useRef<HTMLDivElement>(null);
    // const { currSelectedElement, setCurrSelectedElement, selectedElementOffset, setVideoContainerWidth, isFullScreen, setIsFullScreen } = useVideoUI();
    const listOfInvalidElements: VideoElement[] = [
        "NONE",
        "VIDEO_PLAYER_CONTAINER",
        "VIDEO_PROGRESS_BAR"
    ];

    // Methods

    // Render
    return (
        <MediaProvider>
            <div className="flex px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto gap-6">
                <YoutubePlayer 
                    url="https://youtu.be/m-x101n0gh4?si=n7klPSy4B0ggE2KK"
                    timestamps={[]}
                />
            </div>
        </MediaProvider>
    );    
}

export default YoutubePlayerController;