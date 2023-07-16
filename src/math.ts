export const toDegrees = (radians: number): number => (radians * 180) / Math.PI;

export const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const getRandomNumber = (to: number, from = 0): number =>
	Math.random() * (to - from) + from;
