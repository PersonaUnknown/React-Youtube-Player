import YouTube, { type YouTubeProps} from 'react-youtube';

const ReactYoutubePlayer = ({
    videoId,
    opts = {
        playerVars: {
            controls: 0,
            fs: 0,
            disablekb: 1,
            rel: 0
        },
    }
}: ReactYoutubePlayerProps) => {
    return (
        <div className="p-6">
            <YouTube 
                videoId={videoId} 
                opts={opts} 
                className='className="relative overflow-hidden w-full aspect-video'
            />
        </div>
    );
}

interface ReactYoutubePlayerProps {
    videoId: string;
    opts?: YouTubeProps["opts"]
}

export default ReactYoutubePlayer;