/**
 * Calculates the total price of an array of items
 * @param {array} arr - The array to be calculated
 * @returns {number} - The total price
 */
export const calculateTotalPrice = (arr) => {
	return arr.reduce((total, item) => {
		return (total += item.price * item.quantity)
	}, 0)
}
