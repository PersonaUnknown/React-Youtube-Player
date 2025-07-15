import { useMediaSelector } from "media-chrome/dist/react/media-store.js";
import { secondsToVideoFormat } from "../../utils/utils";
const VideoTime = () => {
    // Setup
    const currentTime = useMediaSelector((state) => state.mediaCurrentTime);
	const duration = useMediaSelector((state) => state.mediaDuration);
    // Render
    return (
        <span className="text-white text-xs sm:text-sm font-medium">
            {secondsToVideoFormat(currentTime ?? 0)} / {secondsToVideoFormat(duration ?? 0)}
        </span>
    );
}

export default VideoTime;