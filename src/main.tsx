import "@pixi/events";
import { Stage } from "@pixi/react";
import { Resolver } from "matter-js";
import ReactDOM from "react-dom/client";
import { GAME_HEIGHT, GAME_WIDTH } from "./contants.ts";
import { Game } from "./game.tsx";
import classes from "./index.module.css";
import { createInputManager } from "./input/keys.ts";

// This is a hack to fix a bug in matter-js
// https://github.com/liabru/matter-js/issues/256#issuecomment-907964224
// @ts-expect-error internal property
Resolver._restingThresh = 0.001;

const root = document.getElementById("root")!;
const inputManager = createInputManager(root);

ReactDOM.createRoot(root).render(
	<div className={classes.gameOuter}>
		<Stage
			className={classes.gameInner}
			height={GAME_HEIGHT}
			width={GAME_WIDTH}
			options={{
				autoDensity: false,
				eventMode: "passive",
			}}
		>
			<Game inputManager={inputManager} />
		</Stage>
	</div>,
);
