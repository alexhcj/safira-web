/**
 *
 * Converts 1D array to 2D array
 * @param {array} arr - The converted array
 * @param {number} quantity - The quantity of columns
 * @returns {array} Converted 2D dimensional array
 */
export const to2DArray = (arr, quantity) => {
	return arr.reduce((cols, key, index) => {
		return (index % quantity === 0 ? cols.push([key]) : cols[cols.length - 1].push(key)) && cols
	}, [])
}
