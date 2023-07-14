import { useTick } from "@pixi/react";
import { useState, type FC } from "react";
import { GAME_HEIGHT, GAME_WIDTH } from "./contants";
import { InputContext } from "./input/context";
import type { InputManager } from "./input/keys";
import { Player } from "./player";
import type { Vector2 } from "./vector2";
import { vector2Copy, vector2Create } from "./vector2";

export interface Props {
	inputManager: InputManager;
}

export const Game: FC<Props> = ({ inputManager }) => {
	const [leftPaddlePosition, setLeftPaddlePosition] = useState<Vector2>(
		vector2Create(10, 50),
	);
	const [rightPaddlePosition] = useState<Vector2>(
		vector2Create(GAME_WIDTH - 10, 50),
	);

	useTick((delta) => {
		const newPosition = vector2Copy(leftPaddlePosition);

		if (inputManager.keys.KeyW) {
			newPosition.y -= 5 * delta;
		}

		if (inputManager.keys.KeyS) {
			newPosition.y += 5 * delta;
		}

		if (newPosition.y < 50) {
			newPosition.y = 50;
		}

		if (newPosition.y > GAME_HEIGHT - 50) {
			newPosition.y = GAME_HEIGHT - 50;
		}

		setLeftPaddlePosition(newPosition);
	});

	return (
		<InputContext.Provider value={inputManager}>
			<Player position={leftPaddlePosition} />
			<Player position={rightPaddlePosition} />
		</InputContext.Provider>
	);
};
