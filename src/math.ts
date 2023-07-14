export const toDegrees = (radians: number): number => (radians * 180) / Math.PI;

export const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const getRandomAngle = (): number => Math.random() * Math.PI * 2;
