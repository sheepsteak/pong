import type { Engine } from "matter-js";
import { createContext } from "react";

export const PhysicsContext = createContext<Engine>({} as Engine);
