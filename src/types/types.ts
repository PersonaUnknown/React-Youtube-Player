/** 
 * @description Represents a timestamped section in video
 * @prop start: start of section in seconds
 * @prop end: end of section in seconds
 * @props label: optional description to associate with section
*/
export interface Timestamp {
	start: number;
	end: number;
	label: string;
}