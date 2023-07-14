import { useState, type FC } from "react";
import { Player } from "./player";
import type { Vector2 } from "./vector2";
import { vector2Create } from "./vector2";

export const Game: FC = () => {
	const [leftPaddlePosition] = useState<Vector2>(vector2Create(10, 50));

	return <Player position={leftPaddlePosition} />;
};
