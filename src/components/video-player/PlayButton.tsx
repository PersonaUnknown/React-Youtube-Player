/** 
 * @description Component to display the play/pause button for video player
*/
import { Pause, Play } from "lucide-react";
import {
	MediaActionTypes,
	useMediaDispatch,
	useMediaSelector,
} from "media-chrome/dist/react/media-store.js";
import { useRef } from "react";
import { useVideoUI } from "../../contexts/VideoUIContext";
const PlayButton = () => {
	// Setup
    const dispatch = useMediaDispatch();
	const mediaPaused = useMediaSelector((state) => state.mediaPaused);
	const { setCurrSelectedElement, setSelectedElementOffset } = useVideoUI();
    const containerRef = useRef<HTMLButtonElement>(null);

    // Methods
    const onVideoPlayback = () => {
        const type = mediaPaused
            ? MediaActionTypes.MEDIA_PLAY_REQUEST
            : MediaActionTypes.MEDIA_PAUSE_REQUEST;
        dispatch({ type });
    }
    const onMouseEnter = () => {
        const leftOffset = containerRef?.current?.offsetLeft ?? 0;
        setSelectedElementOffset({ left: leftOffset, right: undefined});
        setCurrSelectedElement("PLAYBACK_BUTTON");
    }
    const onMouseLeave = () => {
        setSelectedElementOffset({ left: undefined, right: undefined});
        setCurrSelectedElement("VIDEO_PLAYER_CONTAINER");
    }
    
    // Render
    return (
		<button
			type="button"
			className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:text-accent-foreground h-9 rounded-md text-white hover:bg-white/20 p-2"
			onClick={onVideoPlayback}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={containerRef}
		>
			{mediaPaused ? (
				<Play color="white" className="h-6 w-6" />
			) : (
				<Pause color="white" className="h-6 w-6" />
			)}
		</button>
	);
};

export default PlayButton;
