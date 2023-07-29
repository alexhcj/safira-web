import React, { useState } from 'react'
import { Text } from '../UI/Text/Text'
import { Button } from '../UI/Buttons/Button/Button'
import s from './goodtocart.module.scss'

export const GoodToCart = ({ maxQuantity, onClick, findProductCart }) => {
	const [value, setValue] = useState(1)

	const handleInput = (e) => {
		const { value } = e.target
		setValue(+value)
	}

	return (
		<>
			<div className={s.box}>
				{!findProductCart && (
					<div className={s.input_box}>
						<label className={s.input_label} htmlFor='quantity'>
							Quantity
						</label>
						{/* TODO: add input max quantity validations */}
						<input
							className={s.input}
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
					className={s.btn_add}
					type='submit'
					disabled={value > maxQuantity || findProductCart}
					onClick={() => onClick(value)}
				>
					<Text size='medium' color='white' weight='medium'>
						{findProductCart ? 'Already in cart' : 'Add to cart'}
					</Text>
					{/*<Text size="medium" color="white"
					weight="medium">{findProductCart ? 'Add more' : 'Add to cart'}</Text>*/}
				</Button>
			</div>
		</>
	)
}
