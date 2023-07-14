import { useTick } from "@pixi/react";
import { useState, type FC } from "react";
import { Ball } from "./ball";
import { GAME_HEIGHT, GAME_WIDTH } from "./contants";
import { Divider } from "./divider";
import { InputContext } from "./input/context";
import type { InputManager } from "./input/keys";
import { Paddle } from "./paddle";
import type { Vector2 } from "./vector2";
import { vector2Copy, vector2Create } from "./vector2";

const BALL_RADIUS = 10;
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 5;

export interface Props {
	inputManager: InputManager;
}

export const Game: FC<Props> = ({ inputManager }) => {
	const [leftPaddlePosition, setLeftPaddlePosition] = useState<Vector2>(
		vector2Create(PADDLE_WIDTH / 2, PADDLE_HEIGHT / 2),
	);
	const [rightPaddlePosition] = useState<Vector2>(
		vector2Create(GAME_WIDTH - PADDLE_WIDTH / 2, PADDLE_HEIGHT / 2),
	);
	const [ballPosition] = useState<Vector2>(
		vector2Create(GAME_WIDTH / 2, GAME_HEIGHT / 2),
	);

	useTick((delta) => {
		const newPosition = vector2Copy(leftPaddlePosition);

		if (inputManager.keys.KeyW) {
			newPosition.y -= PADDLE_SPEED * delta;
		}

		if (inputManager.keys.KeyS) {
			newPosition.y += PADDLE_SPEED * delta;
		}

		if (newPosition.y < PADDLE_HEIGHT / 2) {
			newPosition.y = PADDLE_HEIGHT / 2;
		}

		if (newPosition.y > GAME_HEIGHT - PADDLE_HEIGHT / 2) {
			newPosition.y = GAME_HEIGHT - PADDLE_HEIGHT / 2;
		}

		setLeftPaddlePosition(newPosition);
	});

	return (
		<InputContext.Provider value={inputManager}>
			<Divider />
			<Paddle
				position={leftPaddlePosition}
				height={PADDLE_HEIGHT}
				width={PADDLE_WIDTH}
			/>
			<Paddle
				position={rightPaddlePosition}
				height={PADDLE_HEIGHT}
				width={PADDLE_WIDTH}
			/>
			<Ball position={ballPosition} radius={BALL_RADIUS} />
		</InputContext.Provider>
	);
};
