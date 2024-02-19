const calculateProdImgRotate = (img: HTMLImageElement, isScaled: boolean): number => {
	const compStyles = window.getComputedStyle(img)
	const matrix = new DOMMatrix(compStyles.transform)
	const toDegree = 180 / Math.PI

	// Если пользователь отобразил изображение продукта
	// по горизонтали, нужно поправить погрешность матрицы
	if (isScaled) {
		matrix.b *= -1;
		matrix.a *= -1;
	}

	return Math.atan2(matrix.b, matrix.a) * toDegree
};

export default calculateProdImgRotate;
