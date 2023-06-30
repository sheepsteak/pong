export interface InputManager {
	keys: { [key in KeyCode]?: boolean };
	mouse: {
		x: number;
		y: number;
		left: boolean;
		right: boolean;
		middle: boolean;
		wheel: number;
	};
	mouseDelta: {
		x: number;
		y: number;
	};
	mouseWheel: number;
	mouseWheelDelta: number;
	mouseWheelDeltaX: number;
	mouseWheelDeltaY: number;
}

export type KeyCode =
	| "Backquote"
	| "Backslash"
	| "BracketLeft"
	| "BracketRight"
	| "Comma"
	| "Digit0"
	| "Digit1"
	| "Digit2"
	| "Digit3"
	| "Digit4"
	| "Digit5"
	| "Digit6"
	| "Digit7"
	| "Digit8"
	| "Digit9"
	| "Equal"
	| "IntlBackslash"
	| "IntlRo"
	| "IntlYen"
	| "KeyA"
	| "KeyB"
	| "KeyC"
	| "KeyD"
	| "KeyE"
	| "KeyF"
	| "KeyG"
	| "KeyH"
	| "KeyI"
	| "KeyJ"
	| "KeyK"
	| "KeyL"
	| "KeyM"
	| "KeyN"
	| "KeyO"
	| "KeyP"
	| "KeyQ"
	| "KeyR"
	| "KeyS"
	| "KeyT"
	| "KeyU"
	| "KeyV"
	| "KeyW"
	| "KeyX"
	| "KeyY"
	| "KeyZ"
	| "Minus"
	| "Period"
	| "Quote"
	| "Semicolon"
	| "Slash"
	| "AltLeft"
	| "AltRight"
	| "Backspace"
	| "CapsLock"
	| "ContextMenu"
	| "ControlLeft"
	| "ControlRight"
	| "Enter"
	| "MetaLeft"
	| "MetaRight"
	| "ShiftLeft"
	| "ShiftRight"
	| "Space"
	| "Tab"
	| "Delete"
	| "End"
	| "Help"
	| "Home"
	| "Insert"
	| "PageDown"
	| "PageUp"
	| "ArrowDown"
	| "ArrowLeft"
	| "ArrowRight"
	| "ArrowUp"
	| "NumLock"
	| "Numpad0"
	| "Numpad1"
	| "Numpad2"
	| "Numpad3"
	| "Numpad4"
	| "Numpad5"
	| "Numpad6"
	| "Numpad7"
	| "Numpad8"
	| "Numpad9"
	| "NumpadAdd"
	| "NumpadBackspace"
	| "NumpadClear"
	| "NumpadClearEntry"
	| "NumpadComma"
	| "NumpadDecimal"
	| "NumpadDivide"
	| "NumpadEnter"
	| "NumpadEqual"
	| "NumpadHash"
	| "NumpadMemoryAdd"
	| "NumpadMemoryClear"
	| "NumpadMemoryRecall"
	| "NumpadMemoryStore"
	| "NumpadMemorySubtract"
	| "NumpadMultiply"
	| "NumpadParenLeft"
	| "NumpadParenRight"
	| "NumpadStar"
	| "NumpadSubtract"
	| "Escape"
	| "F1"
	| "F2"
	| "F3"
	| "F4"
	| "F5"
	| "F6"
	| "F7"
	| "F8"
	| "F9"
	| "F10"
	| "F11"
	| "F12"
	| "Fn"
	| "FnLock"
	| "PrintScreen"
	| "ScrollLock"
	| "Pause";

export const createInputManager = (root: HTMLElement): InputManager => {
	const inputManager: InputManager = {
		keys: {},
		mouse: {
			x: 0,
			y: 0,
			left: false,
			right: false,
			middle: false,
			wheel: 0,
		},
		mouseDelta: {
			x: 0,
			y: 0,
		},
		mouseWheel: 0,
		mouseWheelDelta: 0,
		mouseWheelDeltaX: 0,
		mouseWheelDeltaY: 0,
	};

	const keyDownHandler = (e: KeyboardEvent) => {
		inputManager.keys[e.code as KeyCode] = true;
	};

	const keyUpHandler = (e: KeyboardEvent) => {
		inputManager.keys[e.code as KeyCode] = false;
	};

	const mouseMoveHandler = (e: MouseEvent) => {
		inputManager.mouse.x = e.clientX;
		inputManager.mouse.y = e.clientY;
		inputManager.mouseDelta.x = e.movementX;
		inputManager.mouseDelta.y = e.movementY;
	};

	const mouseDownHandler = (e: MouseEvent) => {
		if (e.button === 0) {
			inputManager.mouse.left = true;
		} else if (e.button === 1) {
			inputManager.mouse.middle = true;
		} else if (e.button === 2) {
			inputManager.mouse.right = true;
		}
	};

	const mouseUpHandler = (e: MouseEvent) => {
		if (e.button === 0) {
			inputManager.mouse.left = false;
		} else if (e.button === 1) {
			inputManager.mouse.middle = false;
		} else if (e.button === 2) {
			inputManager.mouse.right = false;
		}
	};

	const mouseWheelHandler = (e: WheelEvent) => {
		inputManager.mouseWheel = e.deltaY;
		inputManager.mouseWheelDelta = e.deltaY;
		inputManager.mouseWheelDeltaX = e.deltaX;
		inputManager.mouseWheelDeltaY = e.deltaY;
	};

	root.addEventListener("mousemove", mouseMoveHandler);
	root.addEventListener("mousedown", mouseDownHandler);
	root.addEventListener("mouseup", mouseUpHandler);
	root.addEventListener("wheel", mouseWheelHandler);
	root.addEventListener("keydown", keyDownHandler);
	root.addEventListener("keyup", keyUpHandler);

	return inputManager;
};
