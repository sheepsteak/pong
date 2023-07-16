import { Graphics } from "@pixi/react";
import type { Vector } from "matter-js";
import type { FC } from "react";

export interface Props {
	position: Vector;
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
