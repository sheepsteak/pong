import { useContext } from "react";
import { InputContext } from "./context";
import type { InputManager } from "./keys";

export const useInput = (): InputManager => {
	return useContext(InputContext);
};
