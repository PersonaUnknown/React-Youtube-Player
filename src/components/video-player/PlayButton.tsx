/** 
 * @description Component to display the play/pause button for video player
*/
import { Pause, Play } from "lucide-react";
import {
	MediaActionTypes,
	useMediaDispatch,
	useMediaSelector,
} from "media-chrome/dist/react/media-store.js";
const PlayButton = () => {
	// Dispatch media state change requests using useMediaDispatch()
	const dispatch = useMediaDispatch();
	// Get the latest media state you care about in your component using useMediaSelector()
	const mediaPaused = useMediaSelector((state) => state.mediaPaused);
	return (
		<button
			type="button"
			className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:text-accent-foreground h-9 rounded-md text-white hover:bg-white/20 p-2"
			onClick={() => {
				// Select from a set of well-defined actions for state change requests
				// using MediaActionTypes
				const type = mediaPaused
					? MediaActionTypes.MEDIA_PLAY_REQUEST
					: MediaActionTypes.MEDIA_PAUSE_REQUEST;
				dispatch({ type });
			}}
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
