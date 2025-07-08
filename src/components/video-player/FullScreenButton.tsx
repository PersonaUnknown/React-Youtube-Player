/** 
 * @description Component to display and handle video full screen button
*/
import { Maximize } from "lucide-react";
import {
	MediaActionTypes,
	useMediaDispatch,
	useMediaSelector,
} from "media-chrome/dist/react/media-store.js";
const FullScreenButton = () => {
	const dispatch = useMediaDispatch();
	const isFullScreen = useMediaSelector((state) => state.mediaIsFullscreen);
	return (
		<button
			type="button"
			className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:text-accent-foreground h-9 rounded-md text-white hover:bg-white/20 p-2"
			onClick={() => {
				const type = isFullScreen
					? MediaActionTypes.MEDIA_EXIT_FULLSCREEN_REQUEST
					: MediaActionTypes.MEDIA_ENTER_FULLSCREEN_REQUEST;
				dispatch({ type });
			}}
		>
			<Maximize className="h-6 w-6 rotate-45" />
		</button>
	);
};

export default FullScreenButton;
