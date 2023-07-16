import { Text, useTick } from "@pixi/react";
import type { Vector } from "matter-js";
import { TextStyle } from "pixi.js";
import { useState, type FC } from "react";
import { GAME_HEIGHT, GAME_WIDTH } from "./contants";
import { useInput } from "./input/hooks";

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

const instructionsStyle = new TextStyle({
	fill: "#fff",
	fontSize: 24,
	fontFamily: "Courier New",
});

export interface Props {
	onStart: () => void;
}

export const MenuState: FC<Props> = ({ onStart }) => {
	const input = useInput();
	const [alpha, setAlpha] = useState({ value: 0, state: "backward" });

	useTick((delta) => {
		if (input.keys.Space) {
			onStart();
		}
		setAlpha((prev) => {
			let newValue = prev.value;

			if (prev.state === "backward") {
				newValue -= delta * 0.02;
			} else {
				newValue += delta * 0.02;
			}

			if (prev.value <= 0) {
				return {
					state: "forward",
					value: newValue,
				};
			}

			if (prev.value >= 1) {
				return {
					state: "backward",
					value: newValue,
				};
			}

			return {
				...prev,
				value: newValue,
			};
		});
	});

	return (
		<>
			<Text
				anchor={anchor}
				isSprite
				style={titleStyle}
				text="PONG"
				x={GAME_WIDTH / 2}
				y={GAME_HEIGHT / 2 - 100}
			/>
			<Text
				alpha={alpha.value}
				anchor={anchor}
				isSprite
				style={startStyle}
				text="Press SPACE to start!"
				x={GAME_WIDTH / 2}
				y={GAME_HEIGHT / 2}
			/>
			<Text
				anchor={anchor}
				isSprite
				style={instructionsStyle}
				text="Left paddle keys: W/S"
				x={GAME_WIDTH / 2}
				y={GAME_HEIGHT / 2 + 100}
			/>
			<Text
				anchor={anchor}
				isSprite
				style={instructionsStyle}
				text="Right paddle keys: Up/Down"
				x={GAME_WIDTH / 2}
				y={GAME_HEIGHT / 2 + 150}
			/>
		</>
	);
};
