import { cn } from "@sglara/cn";
import FullscreenButton from "./FullscreenButton";
import MuteButton from "./MuteButton";
import PlayButton from "./PlayButton";
import VideoProgressBar from "./VideoProgressBar";
import VideoTime from "./VideoTime";
import VolumeSlider from "./VolumeSlider";
const MediaControls = () => {
    // Render
    return (
        <div
            className={cn(
                "z-50 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
            )}
        >
            <div className="flex gap-4">
                <div className="flex items-center gap-4">
                    <PlayButton />
                </div>
                <VideoProgressBar />
                <div className="flex items-center gap-4">
                    <VideoTime />
                    <div className="flex flex-row items-center">
                        <MuteButton />
                        <VolumeSlider />
                    </div>
                    <FullscreenButton />
                </div>
            </div>
        </div>
    );
}

export default MediaControls;