import { useTick } from "@pixi/react";
import { useState, type FC } from "react";
import { Ball } from "./ball";
import { GAME_WIDTH, GAME_HEIGHT } from "./contants";
import { Divider } from "./divider";
import { useInput } from "./input/hooks";
import { getRandomAngle } from "./math";
import { Paddle } from "./paddle";
import { rectangleCreate, rectangleIntersects } from "./rectangle";
import { Score } from "./score";
import type { Vector2 } from "./vector2";
import { vector2Create, vector2Copy, vector2Normalize } from "./vector2";

const BALL_RADIUS = 10;
const BALL_SPEED = 5;
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 5;

interface BallState {
	position: Vector2;
	velocity: Vector2;
}

interface PlayerState {
	position: Vector2;
	score: number;
}

export const PlayState: FC = () => {
	const input = useInput();
	const [leftPlayer, setLeftPlayer] = useState<PlayerState>(() => ({
		position: vector2Create(PADDLE_WIDTH / 2, PADDLE_HEIGHT / 2),
		score: 0,
	}));
	const [rightPlayer, setRightPlayer] = useState<PlayerState>(() => ({
		position: vector2Create(GAME_WIDTH - PADDLE_WIDTH / 2, PADDLE_HEIGHT / 2),
		score: 0,
	}));
	const [ball, setBall] = useState<BallState>(() => ({
		position: vector2Create(GAME_WIDTH / 2, GAME_HEIGHT / 2),
		velocity: getRandomDirection(),
	}));

	useTick((delta) => {
		const newLeftPaddlePosition = vector2Copy(leftPlayer.position);
		const newRightPaddlePosition = vector2Copy(rightPlayer.position);

		if (input.keys.KeyW) {
			newLeftPaddlePosition.y -= PADDLE_SPEED * delta;
		}

		if (input.keys.KeyS) {
			newLeftPaddlePosition.y += PADDLE_SPEED * delta;
		}

		if (newLeftPaddlePosition.y < PADDLE_HEIGHT / 2) {
			newLeftPaddlePosition.y = PADDLE_HEIGHT / 2;
		}

		if (newLeftPaddlePosition.y > GAME_HEIGHT - PADDLE_HEIGHT / 2) {
			newLeftPaddlePosition.y = GAME_HEIGHT - PADDLE_HEIGHT / 2;
		}

		if (input.keys.ArrowUp) {
			newRightPaddlePosition.y -= PADDLE_SPEED * delta;
		}

		if (input.keys.ArrowDown) {
			newRightPaddlePosition.y += PADDLE_SPEED * delta;
		}

		if (newRightPaddlePosition.y < PADDLE_HEIGHT / 2) {
			newRightPaddlePosition.y = PADDLE_HEIGHT / 2;
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
			newLeftPaddlePosition.x - PADDLE_WIDTH / 2,
			newLeftPaddlePosition.y - PADDLE_HEIGHT / 2,
			PADDLE_WIDTH,
			PADDLE_HEIGHT,
		);

		const rightPaddleCollisionRect = rectangleCreate(
			newRightPaddlePosition.x - PADDLE_WIDTH / 2,
			newRightPaddlePosition.y - PADDLE_HEIGHT / 2,
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

		let roundOver = false;

		if (newBallPosition.x < 0 - BALL_RADIUS) {
			roundOver = true;
			setRightPlayer((rightPaddle) => ({
				...rightPaddle,
				score: rightPaddle.score + 1,
			}));
		}
		if (newBallPosition.x > GAME_WIDTH + BALL_RADIUS) {
			roundOver = true;
			setLeftPlayer((leftPaddle) => ({
				...leftPaddle,
				score: leftPaddle.score + 1,
			}));
		}

		if (roundOver) {
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

		setLeftPlayer((player) => ({
			...player,
			position: newLeftPaddlePosition,
		}));
		setRightPlayer((player) => ({
			...player,
			position: newRightPaddlePosition,
		}));
	});

	return (
		<>
			<Divider />
			<Paddle
				position={leftPlayer.position}
				height={PADDLE_HEIGHT}
				width={PADDLE_WIDTH}
			/>
			<Paddle
				position={rightPlayer.position}
				height={PADDLE_HEIGHT}
				width={PADDLE_WIDTH}
			/>
			<Ball position={ball.position} radius={BALL_RADIUS} />
			<Score
				position={vector2Create(GAME_WIDTH / 2 - 60, 50)}
				value={leftPlayer.score}
			/>
			<Score
				position={vector2Create(GAME_WIDTH / 2 + 60, 50)}
				value={rightPlayer.score}
			/>
		</>
	);
};

const getRandomDirection = (): Vector2 => {
	const angle = getRandomAngle();

	return vector2Normalize(vector2Create(Math.cos(angle), Math.sin(angle)));
};
