import { useState } from 'react'

import cn from 'classnames'

import { Preloader } from '@shared/components/common/Preloader/Preloader'

import { Button } from '../UI/Buttons/Button/Button'
import { Text } from '../UI/Text/Text'

import s from './goodtocart.module.scss'

/**
 * Quantity selector + "Add to cart" control for a single product.
 *
 * Renders a bounded numeric input (1..quantity) plus a submit button.
 * If the product is already in the user's cart, the input is hidden
 * and the button shows a disabled "Already in cart" state instead.
 *
 * Quantity is kept as a string in local state so the field can be
 * transiently empty while the user retypes it (e.g. select-all + delete).
 * The floor/ceiling (1..quantity) is only enforced on blur, not on every
 * keystroke — see handleBlur.
 *
 * @param {Object} props
 * @param {number} props.quantity - Available stock for this product. `0`
 *   (or any value < 1) disables both the input and the button.
 * @param {Object} props.product - The product object passed through to `onClick`.
 * @param {boolean} [props.productQuantityInCart] - Whether this product is
 *   already in the cart. When true, hides the quantity input and disables
 *   the button with an "Already in cart" label.
 * @param {boolean} [props.showLabel=true] - Whether to render the visible
 *   "Quantity" label above the input.
 * @param {(product: Object, quantity: number) => void} props.onClick -
 *   Called with the product and the chosen quantity when "Add to cart" is clicked.
 * @param {string} [props.className] - Extra class for the outer wrapper.
 * @param {string} [props.btnClassName] - Extra class for the button.
 */
export const GoodToCart = ({
	quantity,
	product,
	productQuantityInCart,
	showLabel = true,
	onClick,
	isLoading,
	className,
	btnClassName,
}) => {
	const [value, setValue] = useState('1')

	const isOutOfStock = !quantity || quantity < 1

	const handleInput = (e) => {
		setValue(e.target.value)
	}

	const handleBlur = () => {
		const num = +value
		if (value === '' || num < 1) setValue('1')
		else if (num > quantity) setValue(String(quantity))
	}

	const numericValue = +value || 0
	const isInvalidQuantity = numericValue < 1 || numericValue > quantity

	return (
		<div className={cn(s.box, className)}>
			{!productQuantityInCart && (
				<div className={s.input_box}>
					{showLabel && (
						<label className={s.input_label} htmlFor='good-to-cart-quantity'>
							Quantity
						</label>
					)}
					<input
						id='good-to-cart-quantity'
						className={s.input}
						onInput={handleInput}
						onBlur={handleBlur}
						value={value}
						type='number'
						name='quantity'
						min={1}
						max={quantity}
						disabled={isOutOfStock}
						aria-invalid={isInvalidQuantity}
					/>
				</div>
			)}
			<Button
				className={cn(s.btn_add, isLoading && s.loading, btnClassName)}
				type='submit'
				disabled={isOutOfStock || isInvalidQuantity || productQuantityInCart}
				onClick={() => onClick(product, numericValue)}
			>
				<Text size='medium' color='white' weight='medium' span>
					{productQuantityInCart ? 'Already in cart' : isLoading ? <Preloader width={25} height={25} /> : 'Add to cart'}
				</Text>
			</Button>
		</div>
	)
}

// TODO: research case for 'Add more' if product already in cart
