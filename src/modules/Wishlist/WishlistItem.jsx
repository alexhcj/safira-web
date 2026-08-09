import cn from 'classnames'
import { Link } from 'react-router-dom'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { Price } from '@shared/components/Price/Price'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { ProductInStock } from '@shared/components/UI/ProductInStock/ProductInStock'
import { Text } from '@shared/components/UI/Text/Text'

import CartSVG from '@assets/svg/cart.svg?react'
import PreloaderSVG from '@assets/svg/preloader.svg?react'

import s from './styles/wishlist-item.module.scss'

export const WishlistItem = ({
	product: {
		slug,
		name,
		price,
		specifications: { quantity },
	},
	onClick,
	onDelete,
	productQuantityInCart,
	isLoading,
}) => {
	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`
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
						<ImageWithFallback className={s.img} src={img} imgSize='sm' alt={name} />
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
				<Price {...price} />
			</td>
			<td className={s.stock}>
				<ProductInStock quantity={quantity} />
			</td>
			<td className={s.add}>
				{productQuantityInCart ? (
					<Link to='/cart' className={s.quantity}>
						<CartSVG className={s.svg} />
						<span>{productQuantityInCart}</span>
					</Link>
				) : (
					<Button
						className={cn(s.add_button, isLoading && s.loading)}
						onClick={onClick}
						disabled={productQuantityInCart}
					>
						<Text color='white' className={s.add_text}>
							{isLoading ? <Preloader width={25} height={25} /> : 'Add to cart'}
						</Text>
					</Button>
				)}
			</td>
		</tr>
	)
}
