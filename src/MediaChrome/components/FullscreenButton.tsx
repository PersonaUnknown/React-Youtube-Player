/** 
 * @description Component to display and handle video full screen button
*/
import { Maximize } from "lucide-react";
import { useRef } from "react";

const FullScreenButton = () => {
	// Setup
    const containerRef = useRef<HTMLButtonElement>(null);

    // Methods
    const onFullScreenToggle = () => {
        const videoContainer = document.getElementById("media-chrome-player");
        if (!videoContainer) {
            return;
        }

        if (document.fullscreenElement) {
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
			onClick={onFullScreenToggle}
            ref={containerRef}
		>
			<Maximize className="h-6 w-6 rotate-45" />
		</button>
	);
};

export default FullScreenButton;
