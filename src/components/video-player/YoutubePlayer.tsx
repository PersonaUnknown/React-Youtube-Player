/** 
 * @description Custom Youtube player component
 * @prop url: string for URL of current Youtube video playing
 * @prop timestamps: array of Timestamp objects to be passed to YoutubeVideo component
*/
import { useMediaSelector } from "media-chrome/dist/react/media-store.js";
import "youtube-video-element";
import useWindowDimensions from "../../dimensions/windowDimensions";
import type { Timestamp } from "../../types/types";
import CurrentVideoTime from "./CurrentVideoTime";
import DurationVideoTime from "./DurationVideoTime";
import FullScreenButton from "./FullScreenButton";
import PlayButton from "./PlayButton";
import VideoProgressBar from "./VideoProgressBar";
import VolumeControls from "./VolumeControls";
import YoutubeVideo from "./YoutubeVideo";
const YoutubePlayer = ({ url, timestamps }: YoutubePlayerProps) => {
	const isVideoLoading = useMediaSelector((state) => state.mediaLoading);
	const { isMobile } = useWindowDimensions();
	return (
        <div className="w-full aspect-[9/16] md:aspect-[16/9] relative rounded-xl overflow-hidden">
            <YoutubeVideo url={url} />
            {!isVideoLoading && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    {isMobile ? (
                        <div className="flex-1 flex items-center space-x-3">
                            <CurrentVideoTime />
                            <VideoProgressBar timestamps={timestamps} />
                            <DurationVideoTime />
                            <FullScreenButton />
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <PlayButton />
                            <div className="flex-1 flex items-center space-x-3">
                                <CurrentVideoTime />
                                <VideoProgressBar timestamps={timestamps} />
                                <DurationVideoTime />
                            </div>
                            <VolumeControls />
                            <FullScreenButton />
                        </div>
                    )}
                </div>
            )}
        </div>
	);
};

interface YoutubePlayerProps {
	url: string;
	timestamps: Timestamp[];
}

export default YoutubePlayer;
