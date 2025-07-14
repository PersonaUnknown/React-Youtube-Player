import { YoutubeVideoProvider } from "../contexts/YoutubeVideoContext";
import ReactYoutubePlayer from "./ReactYoutubePlayer";
const ReactYoutubePlayerWrapper = () => {
    return (
        <YoutubeVideoProvider>
            <ReactYoutubePlayer videoId="m-x101n0gh4" />
        </YoutubeVideoProvider>
    )
}

export default ReactYoutubePlayerWrapper;