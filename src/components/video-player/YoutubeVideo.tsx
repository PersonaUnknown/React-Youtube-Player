/** 
 * @description Youtube video component
 * @prop url: string for URL of current Youtube video playing
*/
import { useMediaRef } from "media-chrome/dist/react/media-store.js";
const YoutubeVideo = ({ url }: YoutubeVideoProps) => {
	const mediaRef = useMediaRef();
	return (
		// @ts-ignore
		<youtube-video
			ref={mediaRef}
			src={url}
			slot="media"
			crossorigin
			className="w-full aspect-[9/16] md:aspect-[16/9]"
		/>
	);
};

interface YoutubeVideoProps {
	url: string;
}

export default YoutubeVideo;
