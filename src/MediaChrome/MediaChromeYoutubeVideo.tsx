import { useMediaRef } from "media-chrome/dist/react/media-store.js";
import "youtube-video-element";
const MediaChromeYoutubeVideo = ({
    src
}: MediaChromeYoutubeVideoProps) => {
    // Setup
    const mediaRef = useMediaRef();
    // Render
    return (
        // @ts-ignore
        <youtube-video
            ref={mediaRef}
            src={src}
            slot="media"
            crossorigin
            className="w-full h-full"
            config={{
                disablekb: 1,
                fs: 0,
                rel: 0
            }}
        />
    );
}

interface MediaChromeYoutubeVideoProps {
    src: string;
}

export default MediaChromeYoutubeVideo;