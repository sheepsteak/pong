export interface Rectangle {
	x: number;
	y: number;
	width: number;
	height: number;
}

export const rectangleCreate = (
	x = 0,
	y = 0,
	width = 0,
	height = 0,
): Rectangle => ({
	x,
	y,
	width,
	height,
});

export const rectangleCopy = (rectangle: Rectangle): Rectangle => ({
	x: rectangle.x,
	y: rectangle.y,
	width: rectangle.width,
	height: rectangle.height,
});

export const rectangleIntersects = (a: Rectangle, b: Rectangle): boolean => {
	if (a.x + a.width < b.x) {
		return false;
	}

	if (a.x > b.x + b.width) {
		return false;
	}

	if (a.y + a.height < b.y) {
		return false;
	}

	if (a.y > b.y + b.height) {
		return false;
	}

	return true;
};
