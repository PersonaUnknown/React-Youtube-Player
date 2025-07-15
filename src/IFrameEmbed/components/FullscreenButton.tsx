import { Maximize } from "lucide-react";
import { useYoutubeVideo } from "../contexts/IFrameYoutubeVideoContext";

const FullscreenButton = () => {
    // Setup
    const { isFullscreen } = useYoutubeVideo();
    // Methods
    const toggleFullscreen = () => {
        const videoContainer = document.getElementById("iframe-yt-player");
        if (!videoContainer) {
            return;
        }

        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            videoContainer.requestFullscreen();
        }
    }
    // Render
    return (
		<button
			type="button"
			className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:text-accent-foreground h-9 rounded-md text-white hover:bg-white/20 p-2"
            onClick={toggleFullscreen}
        >
			<Maximize className="h-6 w-6 rotate-45" />
		</button>
	);
}

export default FullscreenButton;