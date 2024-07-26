import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { ImageWithFallback } from '../../../utils/ImageWithFallback'
import { ButtonPopup } from '../../../shared/components/UI/Buttons/ButtonPopup/ButtonPopup'
import { ButtonCart } from '../../../shared/components/UI/Buttons/ButtonCart/ButtonCart'
import { Text } from '../../../shared/components/UI/Text/Text'
import { Rating } from '../../../shared/components/Rating/Rating'
import { Price } from '../../../shared/components/Price/Price'
import { DietaryTags } from '../../../shared/components/UI/DietaryTags/DietaryTags'
import { slugToString } from '../../../utils'
import { ReactComponent as HeartSVG } from '../../../assets/svg/heart.svg'
import { ReactComponent as TrashSVG } from '../../../assets/svg/trash.svg'
import s from './compare-item.module.scss'

// types: 'small' | 'default'
export const CompareItem = ({
	type = 'default',
	product,
	addToWishlist,
	category,
	addToCart,
	removeSlide,
	dataValue,
}) => {
	const [isHovered, setIsHovered] = useState(false)
	const navigate = useNavigate()
	const { slug, name, quantity, rating, price, discount_price, tags, subCategory } = product
	const img = `${process.env.REACT_APP_API_PUBLIC_URL}/images/products/${slug}`

	const handleMouseEnter = () => {
		setIsHovered(true)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
	}

	const handleAddToWishlist = () => {
		const productToWishlist = { slug, name, price: { price }, specifications: { quantity } }
		addToWishlist(productToWishlist)
	}

	// TODO: refactor. make objects simple. check db response
	const handleAddToCart = () => {
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

	const handleSubCategoryClick = () => {
		const query = `subCategory=${subCategory}&${process.env.REACT_APP_SHOP_DEFULT_QUERY}`
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
						{slugToString(subCategory)}
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
					<ButtonPopup onClick={() => handleAddToWishlist()} size='lg' text='Add to Wishlist'>
						<HeartSVG />
					</ButtonPopup>
					<ButtonCart type='button' onClick={() => handleAddToCart()}>
						<Text span color='white' weight='semi'>
							Add to cart
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
					<ButtonPopup onClick={() => handleAddToWishlist()} size='lg' text='Add to Wishlist'>
						<HeartSVG />
					</ButtonPopup>
					<ButtonCart type='button' onClick={() => handleAddToCart()}>
						<Text span color='white' weight='semi'>
							Add to cart
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
