/**
 * Returns the matrix of an element.
 * - Good description of WebkitCSSMatrix: https://stackoverflow.com/questions/5968227/get-the-value-of-webkit-transform-of-an-element-with-jquery/5968313#5968313
 * @returns {WebKitCSSMatrix}
 * @param computedStyle
 */
export function getWebkitMatrix (computedStyle: CSSStyleDeclaration) {
	return new WebKitCSSMatrix(<string | number[]>computedStyle.webkitTransform);
}

/**
 * Returns the translate X value in PX of the element.
 * WARNING: Computes the styles.
 * @returns {number}
 * @param computedStyle
 */
export function getTranslateX (computedStyle: CSSStyleDeclaration) {
	return getWebkitMatrix(computedStyle).m41;
}

/**
 * Returns the translate Y value in PX of the element.
 * WARNING: Computes the styles.
 * @returns {number}
 * @param computedStyle
 */
export function getTranslateY (computedStyle: CSSStyleDeclaration) {
	return getWebkitMatrix(computedStyle).m42;
}

/**
 * Returns the scale of the element.
 * - If the element does not have a height or width, the scale is interpreted as 0.
 * @param computedStyle
 */
export function getScale (computedStyle: CSSStyleDeclaration): {x: number, y: number} {
	const matrix = getWebkitMatrix(computedStyle);
	return {
		x: computedStyle.getPropertyValue("width") === "0px" ? 0 : matrix.a,
		y: computedStyle.getPropertyValue( "height") === "0px" ? 0 : matrix.d
	};

	// SOLUTION WITHOUT WEBKIT
	// const elemRect = elem.getBoundingClientRect();
	//
	// const scaleX = elemRect.width === 0 ? 0 : elemRect.width / elem.offsetWidth;
	// const scaleY = elemRect.height === 0 ? 0 : elemRect.height / elem.offsetHeight;
	//
	// return {x: scaleX, y: scaleY};
}

/**
 * Returns the opacity of an element. If the element is hidden, 0 is returned.
 * @param computedStyle
 */
export function getOpacity (computedStyle: CSSStyleDeclaration): number {
	if (computedStyle.getPropertyValue("width") === "0px" || computedStyle.getPropertyValue("height") === "0px") {
		return 0;
	}

	const opacityString = computedStyle.getPropertyValue("opacity");
	return isNaN(+opacityString) ? 0 : Number(opacityString);
}

