import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../shared/components/UI/Text/Text'
import { ImageWithFallback } from '../../utils/ImageWithFallback'
import PreloaderSVG from '../../assets/svg/preloader.svg'
import { ReactComponent as CartSVG } from '../../assets/svg/cart.svg'
import s from './styles/wishlist-item.module.scss'

export const WishlistItem = ({
	product: {
		slug,
		name,
		price: { price },
		specifications: { quantity: maxQuantity },
	},
	onClick,
	onDelete,
	productQuantityInCart,
}) => {
	const img = `${process.env.REACT_APP_API_PUBLIC_URL}/images/products/${slug}`

	return (
		<tr className={s.item}>
			<td className={s.delete}>
				<button className={s.delete_button} onClick={onDelete}>
					<Text span className={s.delete_text}>
						X
					</Text>
				</button>
			</td>
			<td className={s.image}>
				{slug ? (
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
			<td className={cn(s.stock, maxQuantity < 100 && s.less, maxQuantity < 30 && s.low)}>
				{maxQuantity > 100 ? 'In stoke' : `Left less than ${maxQuantity}`}
			</td>
			<td className={s.add}>
				{productQuantityInCart ? (
					<Link to='/cart' className={s.quantity}>
						<CartSVG className={s.svg} />
						<span>{productQuantityInCart}</span>
					</Link>
				) : (
					<Button className={s.add_button} onClick={onClick} disabled={productQuantityInCart}>
						<Text color='white' className={s.add_text}>
							Add to cart
						</Text>
					</Button>
				)}
			</td>
		</tr>
	)
}
