import { type MouseEventHandler, useRef, useState } from "react";
import { useYoutubeVideo } from "../contexts/IFrameYoutubeVideoContext";
const VolumeSlider = () => {
    // Setup
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const { volumeLevel, setVolume } = useYoutubeVideo();
    const containerRef = useRef<HTMLButtonElement>(null);
    // Methods
    const onMouseUp: MouseEventHandler<HTMLButtonElement> = (_) => {
        setIsMouseDown(false);
    };
    const onMouseLeave: MouseEventHandler<HTMLButtonElement> = (_) => {
        setIsMouseDown(false);
    };
    // Render
    return (
        <button
            type="button"
            className="rounded-full h-2 w-24 bg-white/30 relative overflow-hidden cursor-pointer"
            ref={containerRef}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
        >
            <div 
                className="w-full overflow-hidden absolute bg-white/30 rounded-full inset-y-0"
                onMouseDown={(e) => {
                    if (containerRef.current) {
                        setIsMouseDown(true);
                        const percentage =
                            e.nativeEvent.offsetX / e.currentTarget.clientWidth;
                        const volume = percentage * 100;
                        setVolume(volume);
                    }
                    // Prevent drag event which causes jank behavior on dragging video bar
                    e.preventDefault();
                }}
                onMouseMove={(e) => {
                    if (containerRef.current && isMouseDown) {
                        const percentage =
                            e.nativeEvent.offsetX / e.currentTarget.clientWidth;
                        const volume = percentage * 100;
                        setVolume(volume);
                    }
                }}
            >
                <div 
                    className="select-none bg-white h-2"
                    style={{
                        width: `${volumeLevel}%`
                    }}
                />
            </div>
        </button>
    )
}

export default VolumeSlider;