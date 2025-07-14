/** 
 * @description Converts from seconds into a format to be displayed on videos
 * @param seconds number of seconds
 * @returns string representing the video duration in parsed format HH:MM:SS
*/
export const secondsToVideoFormat = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const remainingSeconds = seconds - hours * 3600;
	const minutes = Math.floor(remainingSeconds / 60);
	const finalRemainingSeconds = Math.ceil(
		seconds - hours * 3600 - minutes * 60,
	);
	let output = "";
	if (hours > 0) {
		output += `${hours}:`;
	}
	const parsedSeconds =
		finalRemainingSeconds <= 9
			? `0${finalRemainingSeconds}`
			: finalRemainingSeconds;
	output += `${minutes}:${parsedSeconds}`;
	if (output.includes("NaN")) {
		return "0:00";
	}
	return output;
};
