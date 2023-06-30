import { Stage } from "@pixi/react";
import ReactDOM from "react-dom/client";
import { GAME_HEIGHT, GAME_WIDTH } from "./contants.ts";
import { Game } from "./game.tsx";
import classes from "./index.module.css";
import { InputContext } from "./input/context.ts";
import { createInputManager } from "./input/keys.ts";

const root = document.getElementById("root")!;
const inputManager = createInputManager(root);

ReactDOM.createRoot(root).render(
	<InputContext.Provider value={inputManager}>
		<div className={classes.gameOuter}>
			<Stage
				className={classes.gameInner}
				height={GAME_HEIGHT}
				width={GAME_WIDTH}
				options={{
					autoDensity: false,
				}}
			>
				<Game />
			</Stage>
		</div>
	</InputContext.Provider>,
);
