import { MediaProvider } from "media-chrome/dist/react/media-store.js";
import MediaChromeYoutubeVideo from "./MediaChromeYoutubeVideo";
import MediaControls from "./components/MediaControls";
const MediaChromeYoutubePlayer = ({
    src
}: MediaChromeYoutubePlayerProps) => {
    // Render
    return (
        <MediaProvider>
            <div className="relative max-w-7xl aspect-video overflow-hidden" id="media-chrome-player">
                <MediaChromeYoutubeVideo 
                    src={src}
                />
                <MediaControls />
            </div>
        </MediaProvider>
    );
}

interface MediaChromeYoutubePlayerProps {
    src: string;
}

export default MediaChromeYoutubePlayer;