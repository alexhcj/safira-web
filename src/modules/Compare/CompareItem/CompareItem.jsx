import { useState } from 'react'

import cn from 'classnames'
import { Link, useNavigate } from 'react-router-dom'

import { throttle } from '@/utils'

import { useCartContext } from '@context/CartContext'
import { useWishlistContext } from '@context/WishlistContext'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { Price } from '@shared/components/Price/Price'
import { Rating } from '@shared/components/Rating/Rating'
import { ButtonCart } from '@shared/components/UI/Buttons/ButtonCart/ButtonCart'
import { ButtonPopup } from '@shared/components/UI/Buttons/ButtonPopup/ButtonPopup'
import { DietaryTags } from '@shared/components/UI/DietaryTags/DietaryTags'
import { Text } from '@shared/components/UI/Text/Text'

import { slugToStr } from '@utils/string'

import HeartSVG from '@assets/svg/heart.svg?react'
import TrashSVG from '@assets/svg/trash.svg?react'

import s from './compare-item.module.scss'

// types: 'small' | 'default'
export const CompareItem = ({ type = 'default', product, category, removeSlide, dataValue }) => {
	const { addToCart, removeFromCart, isProductInCart } = useCartContext()
	const { addToWishlist, removeFromWishlist, isProductInWishlist } = useWishlistContext()
	const [isHovered, setIsHovered] = useState(false)
	const navigate = useNavigate()
	const { slug, name, quantity, rating, price, discount_price, tags, subCategory } = product
	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`
	const isProductInCartList = isProductInCart(slug)
	const isProductInWishList = isProductInWishlist(slug)

	const handleMouseEnter = () => {
		setIsHovered(true)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
	}

	const handleMouseMove = throttle(() => {
		setIsHovered(true)
	}, 150)

	const handleAddToWishlist = () => {
		const productToWishlist = { slug, name, price: { price }, specifications: { quantity } }

		isProductInWishList ? removeFromWishlist(slug) : addToWishlist(productToWishlist)
	}

	const handleAddToCart = () => {
		if (isProductInCartList) {
			removeFromCart(slug)
		} else {
			const productToCart = {
				slug,
				name,
				price: {
					price,
					discount_price,
				},
				specifications: { quantity },
			}
			addToCart(productToCart)
		}
	}

	const handleSubCategoryClick = () => {
		const query = `subCategory=${subCategory}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`
		navigate(`/shop?${new URLSearchParams(query)}`, {
			state: JSON.stringify({ subCategory }),
		})
	}

	if (type === 'default') {
		return (
			<div
				className={cn(s.item, s[type])}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}
				data-value={dataValue}
			>
				<Link className={s.img_link} to={`/products/${slug}`}>
					<ImageWithFallback className={s.img} src={img} imgSize='xs' alt={name} />
				</Link>
				<h3 className={s.name}>{name}</h3>
				<Rating rating={rating} className={s.rating} />
				<h4 className={cn(s.subCategory, { [s.margin_less]: tags && tags.dietaries && name.length > 32 })}>
					<button
						type='button'
						onClick={handleSubCategoryClick}
						className={cn({ [s.subCategory_name]: tags && tags.dietaries })}
					>
						{slugToStr(subCategory)}
					</button>
					{tags && (
						<>
							<span className={s.subCategory_divider}>•</span>
							<DietaryTags tags={tags.dietaries} />
						</>
					)}
				</h4>
				<Price price={price} className={s.price} />
				<div className={s.actions}>
					<ButtonPopup
						className={cn(s.button_wishlist, isProductInWishList && s.active)}
						onClick={handleAddToWishlist}
						size='lg'
						text='Add to Wishlist'
					>
						<HeartSVG />
					</ButtonPopup>
					<ButtonCart type='button' onClick={handleAddToCart}>
						<Text span color='white' weight='semi'>
							{isProductInCartList ? 'Remove from Cart' : 'Add to Cart'}
						</Text>
					</ButtonCart>
				</div>
				<div className={cn(s.remove, { [s.active]: isHovered })} onClick={() => removeSlide(slug, category)}>
					<TrashSVG />
				</div>
			</div>
		)
	}

	if (type === 'small') {
		return (
			<div
				className={cn(s.item, s.small)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				data-value={dataValue}
			>
				<Link className={s.img_link} to={`/products/${slug}`}>
					<ImageWithFallback className={s.img} src={img} imgSize='xs' alt={name} />
				</Link>
				<h3 className={s.name}>{name}</h3>
				<Price price={price} className={s.price} />
				<div className={s.actions}>
					<ButtonPopup onClick={handleAddToWishlist} size='lg' text='Add to Wishlist'>
						<HeartSVG />
					</ButtonPopup>
					<ButtonCart type='button' onClick={handleAddToCart}>
						<Text span color='white' weight='semi'>
							{isProductInCartList ? 'Remove from Cart' : 'Add to Cart'}
						</Text>
					</ButtonCart>
					<div className={cn(s.remove, { [s.active]: isHovered })} onClick={() => removeSlide(slug, category)}>
						<TrashSVG />
					</div>
				</div>
			</div>
		)
	}
}
