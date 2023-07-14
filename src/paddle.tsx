import { Graphics } from "@pixi/react";
import type { FC } from "react";
import type { Vector2 } from "./vector2";

export interface Props {
	position: Vector2;
	height: number;
	width: number;
}

export const Paddle: FC<Props> = ({ position, height, width }) => {
	return (
		<Graphics
			draw={(g) => {
				g.beginFill("#fff");
				g.drawRect(-(width / 2), -(height / 2), width, height);
				g.endFill();
			}}
			x={position.x}
			y={position.y}
			width={width}
			height={height}
		/>
	);
};
