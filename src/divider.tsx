import { Graphics } from "@pixi/react";
import type { FC } from "react";
import { GAME_HEIGHT, GAME_WIDTH } from "./contants";

const LINE_WIDTH = 2;

export const Divider: FC = () => {
	return (
		<Graphics
			anchor={{ x: 0.5, y: 0.5 }}
			draw={(g) => {
				g.beginFill("#fff");
				g.lineStyle(LINE_WIDTH, "#fff");
				g.lineTo(0, GAME_HEIGHT);
				g.endFill();
			}}
			x={GAME_WIDTH / 2 - LINE_WIDTH / 2}
			y={0}
		/>
	);
};
