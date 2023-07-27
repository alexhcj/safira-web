import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../shared/components/UI/Text/Text'
import { ImageWithFallback } from '../../utils/ImageWithFallback'
import { stringToSlug } from '../../utils'
import PreloaderSVG from '../../assets/svg/preloader.svg'
import { ReactComponent as CartSVG } from '../../assets/svg/cart.svg'
import s from './styles/wishlist-item.module.scss'

export const WishlistItem = ({ img, name, price, maxQuantity, onClick, onDelete, isProductInCart, quantity }) => {
	const slug = stringToSlug(name)

	return (
		<tr className={s.item}>
			<td className={s.delete}>
				{/* TODO: fix height difference. ideal 190px */}
				<button className={s.delete_button} onClick={() => onDelete(name)}>
					<Text span className={s.delete_text}>X</Text>
				</button>
			</td>
			<td className={s.image}>
				{img ? <Link className={s.link} to={`/products/${slug}`}>
					<ImageWithFallback src={img} imgSize='md' alt={name} />
				</Link> :
					<img src={PreloaderSVG} alt="Preloader" />	}
			</td>
			<td className={s.name}>
				<Link className={s.link} to={`/products/${slug}`}>{name}</Link>
			</td>
			<td className={s.price}>
				${price}
			</td>
			<td className={cn(s.stock, maxQuantity < 100 && s.less, maxQuantity < 30 && s.low)}>
				{maxQuantity > 100 ? 'In stoke' : `Left less than ${maxQuantity}`}
			</td>
			<td className={s.add}>
				{isProductInCart ?
					<Link to='/cart' className={s.quantity}>
						<CartSVG className={s.svg} />
						<span>{quantity}</span>
					</Link> : <Button className={s.add_button} onClick={() => onClick(name)}>
						<Text color="white" className={s.add_text}>Add to cart</Text>
					</Button>}
			</td>
		</tr>
	)
}
