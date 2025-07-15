/** 
 * @description Video progress bar component able to display timestamped sections and control / display video progress
 * @prop timestamp: array of Timestamp objects to represent sectioned areas of a video
*/
import { cn } from "@sglara/cn";
import {
	MediaActionTypes,
	useMediaDispatch,
	useMediaSelector,
} from "media-chrome/dist/react/media-store.js";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import type { MouseEventHandler } from "react";
const VideoProgressBar = () => {
	// Setup
    const dispatch = useMediaDispatch();
	const currentTime = useMediaSelector((state) => state.mediaCurrentTime);
	const duration = useMediaSelector((state) => state.mediaDuration);
    const containerRef = useRef<HTMLButtonElement>(null);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
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
                            const type = MediaActionTypes.MEDIA_SEEK_REQUEST;
                            const percentage =
                                e.nativeEvent.offsetX / e.currentTarget.clientWidth;
                            const detail = percentage * (duration ?? 0);
                            dispatch({ type, detail });
                        }
                        // Prevent drag event which causes jank behavior on dragging video bar
                        e.preventDefault();
                    }}
                    onMouseMove={(e) => {
                        if (containerRef.current && isMouseDown) {
                            const type = MediaActionTypes.MEDIA_SEEK_REQUEST;
                            const percentage =
                                e.nativeEvent.offsetX / e.currentTarget.clientWidth;
                            const detail = percentage * (duration ?? 0);
                            dispatch({ type, detail });
                        }
                    }}
                >
                    <div
                        className="select-none bg-white h-2"
                        style={{
                            width: `${((currentTime ?? 0) / (duration ?? 0)) * 100}%`
                        }}
                    />
                </motion.div>
            </button>
        </div>
	);
};

export default VideoProgressBar;
