import { useYoutubeVideo } from "../contexts/IFrameYoutubeVideoContext";
import { secondsToVideoFormat } from "../../utils/utils";
const VideoTime = () => {
    // Setup
    const { currentTime, duration } = useYoutubeVideo();
    // Render
    return (
        <span className="text-white text-xs sm:text-sm font-medium">
            {secondsToVideoFormat(currentTime)} / {secondsToVideoFormat(duration)}
        </span>
    );
}

export default VideoTime;