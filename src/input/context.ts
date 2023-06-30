import { createContext } from "react";
import type { InputManager } from "./keys";

export const InputContext = createContext<Readonly<InputManager>>(
	{} as InputManager,
);
