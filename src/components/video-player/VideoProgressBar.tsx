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
import { type MouseEventHandler, useRef, useState } from "react";
import type { Timestamp } from "../../types/types";
const VideoProgressBar = ({ timestamps }: VideoProgressBarProps) => {
	const dispatch = useMediaDispatch();
	const currentTime = useMediaSelector((state) => state.mediaCurrentTime);
	const duration = useMediaSelector((state) => state.mediaDuration);
	const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const onMouseUp: MouseEventHandler<HTMLDivElement> = (_) => {
		setIsMouseDown(false);
	};
	const onMouseLeave: MouseEventHandler<HTMLDivElement> = (_) => {
		setIsMouseDown(false);
	};
	const getSectionClasses = (index: number, length: number): string => {
		if (index === 0) {
			return "rounded-l-full";
		}
		if (index >= length - 1) {
			return "rounded-r-full";
		}
		return "";
	};
	const calcStartPercentage = (start: number): string => {
		return `${(start / (duration ?? 0)) * 100}%`;
	};
	const calcEndPercentage = (end: number): string => {
		return `${100 - (end / (duration ?? 0)) * 100}%`;
	};
	const calcInnerPercentageCompletion = (
		start: number,
		end: number,
	): string => {
		if ((currentTime ?? 0) >= end) {
			return "100%";
		}
		if ((currentTime ?? 0) <= start) {
			return "0%";
		}

		const adjustedCurrTime = Math.max((currentTime ?? 0) - start, 0);
		const adjustedEnd = Math.max(end - start, 0);
		const adjustedCompletion = (adjustedCurrTime / adjustedEnd) * 100;
		return `${adjustedCompletion}%`;
	};
	return (
		<div
			className="cursor-pointer flex-1 rounded-full h-2 relative"
			ref={containerRef}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
		>
			{timestamps.length === 0 && (
				<motion.div
					className={cn(
						"w-full overflow-hidden absolute bg-white/30 h-2 rounded-full",
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
							width: `${((currentTime ?? 0) / (duration ?? 0)) * 100}%`,
							// width: calcInnerPercentageCompletion(start, end)
						}}
					/>
				</motion.div>
			)}
			{timestamps.map((timestamp, index) => {
				const { start, end, label } = timestamp;
				return (
					<>
						<motion.div
							key={`${label}-section`}
							className={cn(
								"overflow-hidden absolute bg-white/30 h-2",
								getSectionClasses(index, timestamps.length),
							)}
							whileHover={{
								scaleY: 1.5,
							}}
							style={{
								left: calcStartPercentage(start),
								right: calcEndPercentage(end),
								userSelect: "none",
							}}
							onMouseDown={(e) => {
								if (containerRef.current) {
									setIsMouseDown(true);
									const type = MediaActionTypes.MEDIA_SEEK_REQUEST;
									const percentage =
										e.nativeEvent.offsetX / e.currentTarget.clientWidth;
									const detail = percentage * (end - start) + start;
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
									const detail = percentage * (end - start) + start;
									dispatch({ type, detail });
								}
							}}
						>
							<div
								className="select-none bg-white h-2"
								style={{
									width: calcInnerPercentageCompletion(start, end),
								}}
							/>
						</motion.div>
						{index < timestamps.length - 1 && (
							<div
								key={`${label}-segment`}
								className="select-none pointer-events-none absolute bg-white w-0.5 h-4"
								style={{
									top: -4,
									left: `${(end / (duration ?? 0)) * 100}%`,
								}}
							/>
						)}
					</>
				);
			})}
		</div>
	);
};

interface VideoProgressBarProps {
	timestamps: Timestamp[];
}

export default VideoProgressBar;
