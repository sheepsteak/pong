import { Engine } from "matter-js";
import { useState, type FC } from "react";
import { InputContext } from "./input/context";
import type { InputManager } from "./input/keys";
import { MenuState } from "./menu-state";
import { PhysicsContext } from "./physics/context";
import { PlayState } from "./play-state";

export interface Props {
	inputManager: InputManager;
}

type GameState = "MENU" | "PLAY" | "GAME_OVER";

export const Game: FC<Props> = ({ inputManager }) => {
	const [engine] = useState<Engine>(() =>
		Engine.create({ gravity: { x: 0, y: 0 } }),
	);
	const [gameState, setGameState] = useState<GameState>("MENU");

	const handleStart = () => {
		setGameState("PLAY");
	};

	return (
		<InputContext.Provider value={inputManager}>
			<PhysicsContext.Provider value={engine}>
				{gameState === "MENU" ? (
					<MenuState onStart={handleStart} />
				) : (
					<PlayState />
				)}
			</PhysicsContext.Provider>
		</InputContext.Provider>
	);
};
