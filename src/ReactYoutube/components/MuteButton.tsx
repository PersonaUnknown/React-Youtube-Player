import { Volume1, Volume2, VolumeOff, VolumeX } from "lucide-react";
import { useYoutubeVideo } from "../contexts/YoutubeVideoContext";
const MuteButton = () => {
    // Setup
    const { volumeLevel, isMuted, mute, unMute } = useYoutubeVideo();
    // Methods
    const onMuteToggle = () => {
        if (isMuted) {
            unMute();
        } else {
            mute();
        }
    }
    // Render
    const getVolumeIcon = () => {
        if (isMuted) {
            return <VolumeOff className="h-6 w-6" />;
        }
        if (volumeLevel >= 50) {
            return <Volume2 className="h-6 w-6" />;
        }
        if (volumeLevel >= 25) {
            return <Volume1 className="h-6 w-6" />;
        }
        return <VolumeX className="h-6 w-6" />;
    };
    return (
        <button
            type="button"
            className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:text-accent-foreground rounded-md text-white hover:bg-white/20 p-2"
            onClick={onMuteToggle}
        >
            {getVolumeIcon()}
        </button>
    );
}

export default MuteButton;