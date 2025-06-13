import { useState } from 'react'

import cn from 'classnames'

import { Button } from '../UI/Buttons/Button/Button'
import { Text } from '../UI/Text/Text'

import s from './goodtocart.module.scss'

// types: 'straight'
// label: 'none'
// rounded: false
export const GoodToCart = ({
	maxQuantity,
	onClick,
	productQuantityInCart,
	product,
	type,
	label,
	rounded,
	className,
	btnClassName,
}) => {
	const [value, setValue] = useState(1)

	const handleInput = (e) => {
		const { value } = e.target
		setValue(+value)
	}

	return (
		<>
			<div className={cn(s.box, className)}>
				{!productQuantityInCart && (
					<div className={s.input_box}>
						<label className={cn(s.input_label, label && s[`input_label_${label}`])} htmlFor='quantity'>
							Quantity
						</label>
						<input
							className={cn(s.input, type && s[`input_${type}`])}
							onInput={handleInput}
							value={value}
							type='number'
							name='quantity'
							min={1}
							max={maxQuantity}
						/>
					</div>
				)}
				<Button
					className={cn(s.btn_add, btnClassName)}
					type='submit'
					disabled={value > maxQuantity || productQuantityInCart}
					onClick={() => onClick(product, value)}
					rounded={rounded}
				>
					<Text size='medium' color='white' weight='medium' span>
						{productQuantityInCart ? 'Already in cart' : 'Add to cart'}
					</Text>
					{/*<Text size="medium" color="white"
					weight="medium">{findProductCart ? 'Add more' : 'Add to cart'}</Text>*/}
				</Button>
			</div>
		</>
	)
}
