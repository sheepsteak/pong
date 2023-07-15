import type { Engine } from "matter-js";
import { useContext } from "react";
import { PhysicsContext } from "./context";

export const usePhysics = (): Engine => {
	return useContext(PhysicsContext);
};
