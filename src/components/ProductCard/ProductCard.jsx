import { useState } from 'react'

import cn from 'classnames'
import { NavLink, useNavigate } from 'react-router-dom'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { Price } from '@shared/components/Price/Price'
import { DietaryTags } from '@shared/components/UI/DietaryTags/DietaryTags'
import { Hovermenu } from '@shared/components/UI/Hovermenu/Hovermenu'
import { Tags } from '@shared/components/UI/Tags/Tags'

import { slugToStr } from '@utils/string'

import s from './productcard.module.scss'

// sizes: 'xs' | 'sm' | 'md-lg' | 'lg' | 'row' | 'row-xs'
export const ProductCard = ({ size = 'xs', imgSize = 'xs', product = true, className }) => {
	const [menuToggle, setMenuToggle] = useState(false)
	const [priceToggle, setPriceToggle] = useState(false)
	const navigate = useNavigate()

	const { slug, tags, name, primeCategory, subCategory, price, description, createdAt } = product

	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`

	const url = `/products/${slug}`

	const linkState = {
		name: name,
	}

	const handleSubCategoryClick = () => {
		const query = `subCategory=${subCategory}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`
		navigate(`/shop?${new URLSearchParams(query)}`, {
			state: JSON.stringify({
				primeCategory: { name: slugToStr(primeCategory), slug: primeCategory },
				subCategory: { name: slugToStr(subCategory), slug: subCategory },
			}),
		})
	}

	const handleMenuToggle = (e) => {
		if (size === 'row') return

		if (e.type === 'mouseenter') {
			setMenuToggle(true)
			!size && setPriceToggle(true) // don't change opacity for large
		} else {
			setMenuToggle(false)
			!size && setPriceToggle(false)
		}
	}

	return (
		<div
			onMouseEnter={handleMenuToggle}
			onMouseLeave={handleMenuToggle}
			className={cn(s.product, size && s[`product_${size}`], className)}
		>
			<NavLink className={s.img_link} to={url} state={linkState}>
				<ImageWithFallback className={s.img} src={img} alt={name} imgSize={imgSize} />
				{size !== 'xs' && size !== 'row-xs' && <Tags {...price} createdAt={createdAt} />}
			</NavLink>
			<div className={s.info}>
				<h3 className={cn(s.name, { [s.margin_less]: tags && tags.dietaries && name.length > 32 })}>
					<NavLink to={url} state={linkState}>
						{name}
					</NavLink>
				</h3>
				{size !== 'row-xs' && (
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
				)}
				{size !== 'row-xs' && (
					<Price
						{...price}
						className={cn(s.prices, priceToggle && s.hide, (size === 'xs' || size === 'row') && s.flex_start)}
					/>
				)}
				{size === 'row' && <p className={s.description}>{description}</p>}
				{size !== 'row-xs' && <Hovermenu menuToggle={menuToggle} size={size} slug={slug} product={product} />}
			</div>
		</div>
	)
}
