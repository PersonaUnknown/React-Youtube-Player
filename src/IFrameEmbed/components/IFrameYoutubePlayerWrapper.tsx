import { IFrameYoutubeVideoProvider } from "../contexts/IFrameYoutubeVideoContext";
import IFrameYoutubePlayer from "./IFrameYoutubePlayer";

const IFrameYoutubePlayerWrapper = () => {
    return (
        <IFrameYoutubeVideoProvider>
            <IFrameYoutubePlayer videoId="m-x101n0gh4" />
        </IFrameYoutubeVideoProvider>
    )
}

export default IFrameYoutubePlayerWrapper;