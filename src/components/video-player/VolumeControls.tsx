/** 
 * @description Video volume control component
*/
import { Volume1, Volume2, VolumeOff, VolumeX } from "lucide-react";
import {
	MediaActionTypes,
	useMediaDispatch,
	useMediaSelector,
} from "media-chrome/dist/react/media-store.js";
const VolumeControls = () => {
	const dispatch = useMediaDispatch();
	const volumeLevel = useMediaSelector((state) => state.mediaVolumeLevel);
	const isMuted = useMediaSelector((state) => state.mediaMuted);
	const getVolumeIcon = () => {
		if (isMuted) {
			return <VolumeOff className="h-6 w-6" />;
		}
		switch (volumeLevel) {
			case "high":
			case "medium":
				return <Volume2 className="h-6 w-6" />;
			case "low":
				return <Volume1 className="h-6 w-6" />;
			default:
				return <VolumeX className="h-6 w-6" />;
		}
	};
	return (
		<div className="inline-flex gap-1 items-center mr-1 relative">
			<button
				type="button"
				className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:text-accent-foreground rounded-md text-white hover:bg-white/20 p-2"
				onClick={() => {
					const type = isMuted
						? MediaActionTypes.MEDIA_UNMUTE_REQUEST
						: MediaActionTypes.MEDIA_MUTE_REQUEST;
					dispatch({ type });
				}}
			>
				{getVolumeIcon()}
			</button>
			<input
				type="range"
				min={0}
				max={100}
				defaultValue={volumeLevel}
				className="slider rounded-full"
				onChange={(e) => {
					const value = Number.parseInt(e.currentTarget.value);
					const type = MediaActionTypes.MEDIA_VOLUME_REQUEST;
					const detail = value / 100;
					dispatch({ type, detail });
				}}
			/>
		</div>
	);
};

export default VolumeControls;
