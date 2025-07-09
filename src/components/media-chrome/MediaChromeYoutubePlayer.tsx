import { MediaProvider } from "media-chrome/dist/react/media-store.js";
import MediaChromeYoutubeVideo from "./MediaChromeYoutubeVideo";
const MediaChromeYoutubePlayer = ({
    src
}: MediaChromeYoutubePlayerProps) => {
    // Setup
    // Methods
    // Render
    return (
        <MediaProvider>
            <div className="p-6">
                <MediaChromeYoutubeVideo 
                    src={src}
                />
            </div>
        </MediaProvider>
    );
}

interface MediaChromeYoutubePlayerProps {
    src: string;
}

export default MediaChromeYoutubePlayer;