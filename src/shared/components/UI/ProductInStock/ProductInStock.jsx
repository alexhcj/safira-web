import cn from 'classnames'

import s from './product-in-stock.module.scss'

/**
 * Displays the product inventory status based on the available quantity.
 *
 * States:
 * - available (>= 100): "In Stock"
 * - limited (30-99): "Left Less Than {quantity}"
 * - low (1-29): "Left Less Than {quantity}"
 * - out_of_stock (0): "Out Of Stock"
 *
 * @param {Object} props Component props.
 * @param {number} props.quantity Current number of items available in stock.
 * @returns {JSX.Element} Product inventory status label.
 */

export const ProductInStock = ({ quantity }) => {
	const stock = Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 0

	const isOutOfStock = stock === 0
	const isLow = stock < 30 && !isOutOfStock
	const isLimited = stock >= 30 && stock < 100

	const label = isOutOfStock ? 'Out Of Stock' : isLow || isLimited ? `Left Less Than ${stock}` : 'In Stock'

	return (
		<div className={cn(s.stock, isLimited && s.limited, isLow && s.low, isOutOfStock && s.out_of_stock)}>{label}</div>
	)
}
