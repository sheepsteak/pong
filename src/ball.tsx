import { Graphics } from "@pixi/react";
import type { FC } from "react";
import type { Vector2 } from "./vector2";

export interface Props {
	position: Vector2;
	radius: number;
}

export const Ball: FC<Props> = ({ position, radius }) => {
	return (
		<Graphics
			draw={(g) => {
				g.beginFill("#fff");
				g.drawCircle(0, 0, radius);
				g.endFill();
			}}
			x={position.x}
			y={position.y}
		/>
	);
};
