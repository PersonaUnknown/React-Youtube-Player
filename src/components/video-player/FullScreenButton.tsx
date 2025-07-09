/** 
 * @description Component to display and handle video full screen button
*/
import { Maximize } from "lucide-react";
import { useRef } from "react";
import { useVideoUI } from "../../contexts/VideoUIContext";
const FullScreenButton = () => {
	// Setup
   const { setCurrSelectedElement, setSelectedElementOffset, videoContainerWidth, setIsFullScreen } = useVideoUI();
    const containerRef = useRef<HTMLButtonElement>(null);

    // Methods
    const onFullScreenToggle = () => {
        setIsFullScreen(prev => !prev);
    }
    const onMouseEnter = () => {
        const leftOffset = containerRef?.current?.offsetLeft ?? 0;
        const widthOffset = containerRef?.current?.offsetWidth ?? 0;
        const rightOffset = videoContainerWidth - leftOffset - widthOffset;
        setSelectedElementOffset({ left: undefined, right: rightOffset });
        setCurrSelectedElement("FULLSCREEN_BUTTON");
    }
    const onMouseLeave = () => {
        setSelectedElementOffset({ left: undefined, right: undefined});
        setCurrSelectedElement("VIDEO_PLAYER_CONTAINER");
    }

    // Render
    return (
		<button
			type="button"
			className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:text-accent-foreground h-9 rounded-md text-white hover:bg-white/20 p-2"
			onClick={onFullScreenToggle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={containerRef}
		>
			<Maximize className="h-6 w-6 rotate-45" />
		</button>
	);
};

export default FullScreenButton;
