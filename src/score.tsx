import { Text } from "@pixi/react";
import type { Vector } from "matter-js";
import { TextStyle } from "pixi.js";
import type { FC } from "react";

export interface Props {
	position: Vector;
	value: number;
}

const anchor: Vector = {
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
