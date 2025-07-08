/** 
 * @description Component to display the current time in the video the user is on
*/
import { useMediaSelector } from "media-chrome/dist/react/media-store.js";
import { secondsToVideoFormat } from "../../utils/utils";
const CurrentVideoTime = () => {
	const currentTime = useMediaSelector((state) => state.mediaCurrentTime);
	return (
		<span className="text-white text-xs sm:text-sm font-medium">
			{secondsToVideoFormat(currentTime ?? 0)}
		</span>
	);
};

export default CurrentVideoTime;
