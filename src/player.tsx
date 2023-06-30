import { Graphics } from "@pixi/react";
import type { FC } from "react";

export interface Props {
	x: number;
	y: number;
}

export const Player: FC<Props> = ({ x, y }) => {
	return (
		<Graphics
			anchor={{ x: 0.5, y: 0.5 }}
			draw={(g) => {
				g.beginFill("#fff");
				g.drawRect(-10, -50, 20, 100);
				g.endFill();
			}}
			x={x}
			y={y}
		/>
	);
};
