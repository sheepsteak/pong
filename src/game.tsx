import { useTick } from "@pixi/react";
import { useState, type FC } from "react";
import { Ball } from "./ball";
import { GAME_HEIGHT, GAME_WIDTH } from "./contants";
import { Divider } from "./divider";
import { InputContext } from "./input/context";
import type { InputManager } from "./input/keys";
import { getRandomAngle } from "./math";
import { Paddle } from "./paddle";
import { rectangleCreate, rectangleIntersects } from "./rectangle";
import type { Vector2 } from "./vector2";
import { vector2Copy, vector2Create, vector2Normalize } from "./vector2";

const BALL_RADIUS = 10;
const BALL_SPEED = 5;
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 5;

export interface Props {
	inputManager: InputManager;
}

interface BallState {
	position: Vector2;
	velocity: Vector2;
}

export const Game: FC<Props> = ({ inputManager }) => {
	const [leftPaddlePosition, setLeftPaddlePosition] = useState<Vector2>(
		vector2Create(PADDLE_WIDTH / 2, PADDLE_HEIGHT / 2),
	);
	const [rightPaddlePosition] = useState<Vector2>(
		vector2Create(GAME_WIDTH - PADDLE_WIDTH / 2, PADDLE_HEIGHT / 2),
	);
	const [ball, setBall] = useState<BallState>(() => ({
		position: vector2Create(GAME_WIDTH / 2, GAME_HEIGHT / 2),
		velocity: getRandomDirection(),
	}));

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

		const newBallPosition = vector2Copy(ball.position);
		const newBallVelocity = vector2Copy(ball.velocity);

		newBallPosition.x += newBallVelocity.x * BALL_SPEED * delta;
		newBallPosition.y += newBallVelocity.y * BALL_SPEED * delta;

		if (newBallPosition.y < BALL_RADIUS) {
			newBallPosition.y = BALL_RADIUS;
			newBallVelocity.y *= -1;
		}

		if (newBallPosition.y > GAME_HEIGHT - BALL_RADIUS) {
			newBallPosition.y = GAME_HEIGHT - BALL_RADIUS;
			newBallVelocity.y *= -1;
		}

		const ballCollisionRect = rectangleCreate(
			newBallPosition.x - BALL_RADIUS,
			newBallPosition.y - BALL_RADIUS,
			BALL_RADIUS * 2,
			BALL_RADIUS * 2,
		);

		const leftPaddleCollisionRect = rectangleCreate(
			leftPaddlePosition.x - PADDLE_WIDTH / 2,
			leftPaddlePosition.y - PADDLE_HEIGHT / 2,
			PADDLE_WIDTH,
			PADDLE_HEIGHT,
		);

		const rightPaddleCollisionRect = rectangleCreate(
			rightPaddlePosition.x - PADDLE_WIDTH / 2,
			rightPaddlePosition.y - PADDLE_HEIGHT / 2,
			PADDLE_WIDTH,
			PADDLE_HEIGHT,
		);

		if (rectangleIntersects(ballCollisionRect, leftPaddleCollisionRect)) {
			newBallPosition.x =
				leftPaddleCollisionRect.x + leftPaddleCollisionRect.width + BALL_RADIUS;
			newBallVelocity.x *= -1;
		}

		if (rectangleIntersects(ballCollisionRect, rightPaddleCollisionRect)) {
			newBallPosition.x = rightPaddleCollisionRect.x - BALL_RADIUS;
			newBallVelocity.x *= -1;
		}

		if (newBallPosition.x < 0 || newBallPosition.x > GAME_WIDTH) {
			newBallPosition.x = GAME_WIDTH / 2;
			newBallPosition.y = GAME_HEIGHT / 2;
			const newDirection = getRandomDirection();
			newBallVelocity.x = newDirection.x;
			newBallVelocity.y = newDirection.y;
		}

		setBall({
			position: newBallPosition,
			velocity: newBallVelocity,
		});

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
			<Ball position={ball.position} radius={BALL_RADIUS} />
		</InputContext.Provider>
	);
};

const getRandomDirection = (): Vector2 => {
	const angle = getRandomAngle();

	return vector2Normalize(vector2Create(Math.cos(angle), Math.sin(angle)));
};
