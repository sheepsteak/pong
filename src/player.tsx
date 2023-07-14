import { Graphics } from "@pixi/react";
import type { FC } from "react";
import type { Vector2 } from "./vector2";

export interface Props {
	position: Vector2;
}

export const Player: FC<Props> = ({ position }) => {
	return (
		<Graphics
			anchor={{ x: 0.5, y: 0.5 }}
			draw={(g) => {
				g.beginFill("#fff");
				g.drawRect(-10, -50, 20, 100);
				g.endFill();
			}}
			x={position.x}
			y={position.y}
		/>
	);
};
