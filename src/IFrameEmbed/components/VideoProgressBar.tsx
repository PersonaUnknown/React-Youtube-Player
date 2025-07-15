/** 
 * @description Video progress bar component able to display timestamped sections and control / display video progress
 * @prop timestamp: array of Timestamp objects to represent sectioned areas of a video
*/
import { cn } from "@sglara/cn";
import { motion } from "motion/react";
import { type MouseEventHandler, useRef, useState } from "react";
import { useYoutubeVideo } from "../contexts/IFrameYoutubeVideoContext";

const VideoProgressBar = () => {
	// Setup
    const { currentTime, duration, seekTo } = useYoutubeVideo();
	const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
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
		<div className="flex flex-1 items-center">
            <button
                className="cursor-pointer flex-1 rounded-full h-2 relative"
                ref={containerRef}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
            >
                <motion.div
                    className={cn(
                        "w-full overflow-hidden absolute bg-white/30 rounded-full inset-y-0",
                    )}
                    whileHover={{
                        scaleY: 1.5,
                    }}
                    onMouseDown={(e) => {
                        if (containerRef.current) {
                            setIsMouseDown(true);
                            const percentage =
                                e.nativeEvent.offsetX / e.currentTarget.clientWidth;
                            const seconds = percentage * duration;
                            seekTo(seconds);
                        }
                        // Prevent drag event which causes jank behavior on dragging video bar
                        e.preventDefault();
                    }}
                    onMouseMove={(e) => {
                        if (containerRef.current && isMouseDown) {
                            const percentage =
                                e.nativeEvent.offsetX / e.currentTarget.clientWidth;
                            const seconds = percentage * duration;
                            seekTo(seconds);
                        }
                    }}
                >
                    <div
                        className="select-none bg-white h-2"
                        style={{
                            width: `${(currentTime / duration) * 100}%`
                        }}
                    />
                </motion.div>
            </button>
        </div>
	);
};

export default VideoProgressBar;
