/** 
 * @description Component that controls YoutubePlayer and allows additional components to have access to MediaProvider
*/
import { MediaProvider } from 'media-chrome/dist/react/media-store.js'
import YoutubePlayer from './YoutubePlayer';
const YoutubePlayerController = () => {
    return (
        <MediaProvider>
            <div className="flex px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto gap-6">
                <YoutubePlayer 
                    url="https://youtu.be/m-x101n0gh4?si=n7klPSy4B0ggE2KK"
                    timestamps={[]}
                />
            </div>
        </MediaProvider>
    );    
}

export default YoutubePlayerController;