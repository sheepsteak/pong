import { type FC } from "react";
import { InputContext } from "./input/context";
import type { InputManager } from "./input/keys";
import { PlayState } from "./play-state";

export interface Props {
	inputManager: InputManager;
}

export const Game: FC<Props> = ({ inputManager }) => {
	return (
		<InputContext.Provider value={inputManager}>
			<PlayState />
		</InputContext.Provider>
	);
};
