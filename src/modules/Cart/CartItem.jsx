import React from 'react'
import { Link } from 'react-router-dom'
import { ImageWithFallback } from '../../utils/ImageWithFallback'
import PreloaderSVG from '../../assets/svg/preloader.svg'
import { ReactComponent as Trash } from '../../assets/svg/trash.svg'
import s from './styles/cart-item.module.scss'

export const CartItem = ({ slug, img, name, price, quantity, maxQuantity, onInput, onDelete }) => {
	return (
		<tr className={s.item}>
			<td className={s.delete}>
				{/* TODO: change on outline icon (too fat lines) */}
				{/* TODO: fix height difference. ideal 190px */}
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
			<td className={s.price}>${price}</td>
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
			<td className={s.total}>${(price * quantity).toFixed(2)}</td>
		</tr>
	)
}
