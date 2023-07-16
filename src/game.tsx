import { Engine } from "matter-js";
import { useState, type FC } from "react";
import { GameOverState } from "./game-over";
import { InputContext } from "./input/context";
import type { InputManager } from "./input/keys";
import { MenuState } from "./menu-state";
import { PhysicsContext } from "./physics/context";
import { PlayState } from "./play-state";
import type { Player } from "./types";

export interface Props {
	inputManager: InputManager;
}

type GameState = "MENU" | "PLAY" | "GAME_OVER";

export const Game: FC<Props> = ({ inputManager }) => {
	const [engine] = useState<Engine>(() =>
		Engine.create({ gravity: { x: 0, y: 0 } }),
	);
	const [gameState, setGameState] = useState<GameState>("MENU");
	const [prevWinner, setPrevWinner] = useState<Player | null>(null);

	const handleStart = () => {
		setGameState("PLAY");
	};

	const handleGameOver = (winner: Player) => {
		setGameState("GAME_OVER");
		setPrevWinner(winner);
	};

	return (
		<InputContext.Provider value={inputManager}>
			<PhysicsContext.Provider value={engine}>
				{gameState === "MENU" ? (
					<MenuState onStart={handleStart} />
				) : gameState === "PLAY" ? (
					<PlayState onGameOver={handleGameOver} />
				) : (
					<GameOverState
						onExpired={() => setGameState("MENU")}
						winner={prevWinner ?? "PLAYER1"}
					/>
				)}
			</PhysicsContext.Provider>
		</InputContext.Provider>
	);
};
