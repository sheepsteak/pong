import { useState, type FC } from "react";
import { InputContext } from "./input/context";
import type { InputManager } from "./input/keys";
import { MenuState } from "./menu-state";
import { PlayState } from "./play-state";

export interface Props {
	inputManager: InputManager;
}

type GameState = "MENU" | "PLAY" | "GAME_OVER";

export const Game: FC<Props> = ({ inputManager }) => {
	const [gameState, setGameState] = useState<GameState>("MENU");

	const handleStart = () => {
		setGameState("PLAY");
	};

	return (
		<InputContext.Provider value={inputManager}>
			{gameState === "MENU" ? (
				<MenuState onStart={handleStart} />
			) : (
				<PlayState />
			)}
		</InputContext.Provider>
	);
};
