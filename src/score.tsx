import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import type { FC } from "react";
import type { Vector2 } from "./vector2";

export interface Props {
	position: Vector2;
	value: number;
}

const anchor: Vector2 = {
	x: 0.5,
	y: 0.5,
};

const textStyle = new TextStyle({
	fill: "#fff",
	fontSize: 72,
	fontFamily: "Courier New",
	fontWeight: "bold",
});

export const Score: FC<Props> = ({ position, value }) => {
	return (
		<Text
			anchor={anchor}
			style={textStyle}
			text={`${value}`}
			x={position.x}
			y={position.y}
		/>
	);
};
