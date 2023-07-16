import { useTick } from "@pixi/react";
import * as Sound from "@pixi/sound";
import { Bodies, Body, Composite, Engine, Events, Vector } from "matter-js";
import { useEffect, useState, type FC } from "react";
import ballPaddleAudio from "./assets/sounds/ball-paddle.mp3";
import ballWallAudio from "./assets/sounds/ball-wall.mp3";
import scoreAudio from "./assets/sounds/score.mp3";
import { Ball } from "./ball";
import { GAME_HEIGHT, GAME_WIDTH } from "./contants";
import { Divider } from "./divider";
import { useInput } from "./input/hooks";
import { getRandomAngle } from "./math";
import { Paddle } from "./paddle";
import { usePhysics } from "./physics/hooks";
import { Score } from "./score";

const BALL_RADIUS = 10;
const BALL_SPEED_INITIAL = 5;
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 5;

interface BallState {
	position: Vector;
	speed: number;
}

interface PlayerState {
	position: Vector;
	score: number;
}

const ballPaddleSound = Sound.Sound.from({
	url: ballPaddleAudio,
});
const ballWallSound = Sound.Sound.from({
	url: ballWallAudio,
});
const scoreSound = Sound.Sound.from({
	url: scoreAudio,
});

export const PlayState: FC = () => {
	const physicsEngine = usePhysics();
	const input = useInput();
	const [ballBody] = useState<Body>(() =>
		Bodies.circle(GAME_WIDTH / 2, GAME_HEIGHT / 2, BALL_RADIUS, {
			force: getRandomDirection(),
			friction: 0,
			frictionStatic: 0,
			frictionAir: 0,
			inertia: Infinity,
			label: "ball",
			restitution: 1,
		}),
	);
	const [leftPlayerBody] = useState<Body>(() =>
		Bodies.rectangle(
			0 + PADDLE_WIDTH / 2,
			GAME_HEIGHT / 2,
			PADDLE_WIDTH,
			PADDLE_HEIGHT,
			{
				friction: 0,
				frictionAir: 0,
				frictionStatic: 0,
				inertia: Infinity,
				isStatic: true,
				label: "leftPlayer",
				restitution: 1,
			},
		),
	);
	const [rightPlayerBody] = useState<Body>(() =>
		Bodies.rectangle(
			GAME_WIDTH - PADDLE_WIDTH / 2,
			GAME_HEIGHT / 2,
			PADDLE_WIDTH,
			PADDLE_HEIGHT,
			{
				friction: 0,
				frictionAir: 0,
				frictionStatic: 0,
				inertia: Infinity,
				isStatic: true,
				label: "rightPlayer",
				restitution: 1,
			},
		),
	);

	const [shouldTick, setShouldTick] = useState(false);

	const [leftPlayer, setLeftPlayer] = useState<PlayerState>(() => ({
		position: Vector.create(PADDLE_WIDTH / 2, PADDLE_HEIGHT / 2),
		score: 0,
	}));
	const [rightPlayer, setRightPlayer] = useState<PlayerState>(() => ({
		position: Vector.create(GAME_WIDTH - PADDLE_WIDTH / 2, PADDLE_HEIGHT / 2),
		score: 0,
	}));
	const [ball, setBall] = useState<BallState>(() => ({
		position: Vector.create(GAME_WIDTH / 2, GAME_HEIGHT / 2),
		speed: BALL_SPEED_INITIAL,
	}));

	useEffect(() => {
		Composite.add(physicsEngine.world, [
			Bodies.rectangle(GAME_WIDTH / 2, 0, GAME_WIDTH, 1, {
				isStatic: true,
				label: "top",
				restitution: 1,
			}),
			Bodies.rectangle(GAME_WIDTH / 2, GAME_HEIGHT, GAME_WIDTH, 1, {
				isStatic: true,
				label: "bottom",
				restitution: 1,
			}),
			ballBody,
			leftPlayerBody,
			rightPlayerBody,
		]);

		Events.on(physicsEngine, "collisionStart", ({ pairs }) => {
			pairs.forEach(({ bodyA, bodyB }) => {
				if (
					(bodyA.label === "ball" && bodyB.label === "leftPlayer") ||
					(bodyA.label === "leftPlayer" && bodyB.label === "ball") ||
					(bodyA.label === "ball" && bodyB.label === "rightPlayer") ||
					(bodyA.label === "rightPlayer" && bodyB.label === "ball")
				) {
					void ballPaddleSound.play();
				}

				if (
					(bodyA.label === "top" && bodyB.label === "ball") ||
					(bodyA.label === "ball" && bodyB.label === "top") ||
					(bodyA.label === "bottom" && bodyB.label === "ball") ||
					(bodyA.label === "ball" && bodyB.label === "bottom")
				) {
					void ballWallSound.play();
				}
			});
		});

		setShouldTick(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useTick((delta) => {
		if (!shouldTick) {
			return;
		}

		// Left player
		if (input.keys.KeyW) {
			Body.setPosition(leftPlayerBody, {
				x: leftPlayerBody.position.x,
				y: leftPlayerBody.position.y - PADDLE_SPEED * delta,
			});
		}

		if (input.keys.KeyS) {
			Body.setPosition(leftPlayerBody, {
				x: leftPlayerBody.position.x,
				y: leftPlayerBody.position.y + PADDLE_SPEED * delta,
			});
		}

		if (leftPlayerBody.position.y < PADDLE_HEIGHT / 2) {
			Body.setPosition(leftPlayerBody, {
				x: leftPlayerBody.position.x,
				y: PADDLE_HEIGHT / 2,
			});
		}

		if (leftPlayerBody.position.y > GAME_HEIGHT - PADDLE_HEIGHT / 2) {
			Body.setPosition(leftPlayerBody, {
				x: leftPlayerBody.position.x,
				y: GAME_HEIGHT - PADDLE_HEIGHT / 2,
			});
		}

		// Right player
		if (input.keys.ArrowUp) {
			Body.setPosition(rightPlayerBody, {
				x: rightPlayerBody.position.x,
				y: rightPlayerBody.position.y - PADDLE_SPEED * delta,
			});
		}

		if (input.keys.ArrowDown) {
			Body.setPosition(rightPlayerBody, {
				x: rightPlayerBody.position.x,
				y: rightPlayerBody.position.y + PADDLE_SPEED * delta,
			});
		}

		if (rightPlayerBody.position.y < PADDLE_HEIGHT / 2) {
			Body.setPosition(rightPlayerBody, {
				x: rightPlayerBody.position.x,
				y: PADDLE_HEIGHT / 2,
			});
		}

		if (rightPlayerBody.position.y > GAME_HEIGHT - PADDLE_HEIGHT / 2) {
			Body.setPosition(rightPlayerBody, {
				x: rightPlayerBody.position.x,
				y: GAME_HEIGHT - PADDLE_HEIGHT / 2,
			});
		}

		Engine.update(physicsEngine, delta);

		let roundOver = false;

		if (ballBody.position.x < 0 - BALL_RADIUS) {
			roundOver = true;
			setRightPlayer((rightPaddle) => ({
				...rightPaddle,
				score: rightPaddle.score + 1,
			}));
		}
		if (ballBody.position.x > GAME_WIDTH + BALL_RADIUS) {
			roundOver = true;
			setLeftPlayer((leftPaddle) => ({
				...leftPaddle,
				score: leftPaddle.score + 1,
			}));
		}

		if (roundOver) {
			void scoreSound.play();
			Body.setVelocity(ballBody, Vector.create(0, 0));
			Body.setPosition(ballBody, {
				x: GAME_WIDTH / 2,
				y: GAME_HEIGHT / 2,
			});
			Body.applyForce(ballBody, ballBody.position, getRandomDirection());
			Body.setPosition(leftPlayerBody, {
				x: 0 + PADDLE_WIDTH / 2,
				y: GAME_HEIGHT / 2,
			});
			Body.setPosition(rightPlayerBody, {
				x: GAME_WIDTH - PADDLE_WIDTH / 2,
				y: GAME_HEIGHT / 2,
			});
		}

		setBall((ball) => {
			return {
				...ball,
				position: Vector.clone(ballBody.position),
			};
		});

		setLeftPlayer((leftPlayer) => {
			return {
				...leftPlayer,
				position: Vector.clone(leftPlayerBody.position),
			};
		});

		setRightPlayer((rightPlayer) => {
			return {
				...rightPlayer,
				position: Vector.clone(rightPlayerBody.position),
			};
		});
	});

	if (!shouldTick) {
		return null;
	}

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
				position={Vector.create(GAME_WIDTH / 2 - 60, 50)}
				value={leftPlayer.score}
			/>
			<Score
				position={Vector.create(GAME_WIDTH / 2 + 60, 50)}
				value={rightPlayer.score}
			/>
		</>
	);
};

const getRandomDirection = (): Vector => {
	const angle = getRandomAngle();

	return Vector.mult(
		Vector.normalise(Vector.create(Math.cos(angle), Math.sin(angle))),
		BALL_SPEED_INITIAL,
	);
};
