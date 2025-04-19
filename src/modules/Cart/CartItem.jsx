import { Link } from 'react-router-dom'

import { Price } from '@shared/components/Price/Price'

import { ImageWithFallback } from '@utils/ImageWithFallback'

import PreloaderSVG from '@assets/svg/preloader.svg?react'
import Trash from '@assets/svg/trash.svg?react'


import s from './styles/cart-item.module.scss'

export const CartItem = ({ slug, img, name, price, discount_price, quantity, maxQuantity, onInput, onDelete }) => {
	return (
		<tr className={s.item}>
			<td className={s.delete}>
				<Trash className={s.delete_svg} onClick={() => onDelete(slug)} />
			</td>
			<td className={s.image}>
				{img ? (
					<Link className={s.link} to={`/products/${slug}`}>
						<ImageWithFallback src={img} imgSize='md' alt={name} />
					</Link>
				) : (
					<img src={PreloaderSVG} alt='Preloader' />
				)}
			</td>
			<td className={s.name}>
				<Link className={s.link} to={`/products/${slug}`}>
					{name}
				</Link>
			</td>
			<td className={s.price}>
				<Price className={s.price_font} price={price} discount_price={discount_price} />
			</td>
			<td className={s.quantity}>
				<form>
					<div className={s.box}>
						Quantity
						<input
							className={s.input}
							onInput={(e) => onInput(e.target.value, slug)}
							value={quantity}
							type='number'
							name='quantity'
							min={1}
							max={maxQuantity}
						/>
					</div>
				</form>
			</td>
			<td className={s.total}>${(discount_price ? discount_price * quantity : price * quantity).toFixed(2)}</td>
		</tr>
	)
}
