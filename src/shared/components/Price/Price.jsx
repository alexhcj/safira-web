import cn from 'classnames'

import { formatPrice } from '@utils/number/convert'

import { Text } from '../UI/Text/Text'

import s from './price.module.scss'

/**
 * @typedef {typeof PRICE_TYPE[keyof typeof PRICE_TYPE]} PriceType
 */

/**
 * Price
 *
 * Displays a product's price, optionally alongside a discount price.
 *
 * Behavior:
 * - No `discountPrice`: only `price` is rendered, as the primary price.
 * - With `discountPrice`: `discountPrice` becomes the primary (emphasized,
 *   larger) price the customer actually pays, while `price` is rendered
 *   as a smaller, crossed-out "old" price.
 *
 * @param {Object} props
 * @param {number|string} props.price - Regular/original price.
 * @param {number|string} [props.discountPrice] - Discounted price. When present,
 *   this becomes the primary price and `price` is shown crossed out.
 * @param {PriceType} [props.type] - Size variant, see {@link PRICE_TYPE}.
 * @param {string} [props.className] - Extra class name(s) for the wrapper.
 */
export const Price = ({ price, discountPrice, type, className }) => {
	const hasDiscount = Boolean(discountPrice)

	return (
		<div className={cn(s.box, type && s[type], className)}>
			{hasDiscount && (
				<Text className={s.discount_price} span>
					{formatPrice(discountPrice)}
				</Text>
			)}
			<Text className={cn(s.price, hasDiscount && s.old)} span>
				{formatPrice(price)}
			</Text>
		</div>
	)
}
