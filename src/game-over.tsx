import { Text } from "@pixi/react";
import type { Vector } from "matter-js";
import { TextStyle } from "pixi.js";
import { type FC } from "react";
import { useTimeoutWhen } from "rooks";
import { GAME_HEIGHT, GAME_WIDTH } from "./contants";
import type { Player } from "./types";

const EXPIRATION_TIME = 5000;
const anchor: Vector = {
	x: 0.5,
	y: 0.5,
};

const titleStyle = new TextStyle({
	fill: "#fff",
	fontSize: 72,
	fontFamily: "Courier New",
	fontWeight: "bold",
});

const startStyle = new TextStyle({
	fill: "#fff",
	fontSize: 32,
	fontFamily: "Courier New",
});

export interface Props {
	onExpired: () => void;
	winner: Player;
}

export const GameOverState: FC<Props> = ({ onExpired, winner }) => {
	useTimeoutWhen(() => {
		onExpired();
	}, EXPIRATION_TIME);

	return (
		<>
			<Text
				anchor={anchor}
				isSprite
				style={titleStyle}
				text="GAME OVER"
				x={GAME_WIDTH / 2}
				y={GAME_HEIGHT / 2 - 100}
			/>
			<Text
				anchor={anchor}
				isSprite
				style={startStyle}
				text={winner === "PLAYER1" ? "Player 1 Wins!" : "Player 2 Wins!"}
				x={GAME_WIDTH / 2}
				y={GAME_HEIGHT / 2}
			/>
		</>
	);
};
