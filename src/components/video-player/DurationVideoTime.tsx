/** 
 * @description Component to display the duration time of the video the user is on
*/
import { useMediaSelector } from "media-chrome/dist/react/media-store.js";
import { secondsToVideoFormat } from "../../utils/utils";
const DurationVideoTime = () => {
	const duration = useMediaSelector((state) => state.mediaDuration);
	return (
		<span className="text-white text-xs sm:text-sm font-medium">
			{secondsToVideoFormat(duration ?? 0)}
		</span>
	);
};

export default DurationVideoTime;
