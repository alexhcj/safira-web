import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import { Price } from '../../shared/components/Price/Price'
import { Tags } from '../../shared/components/UI/Tags/Tags'
import { Hovermenu } from '../../shared/components/UI/Hovermenu/Hovermenu'
import { ImageWithFallback } from '../../utils/ImageWithFallback'
import { DietaryTags } from '../../shared/components/UI/DietaryTags/DietaryTags'
import { slugToString } from '../../utils'
import s from './productcard.module.scss'

// sizes: 'xs' | 'sm' | 'lg' | 'row'
export const ProductCard = ({ size = 'xs', imgSize = 'xs', product, className }) => {
	const [menuToggle, setMenuToggle] = useState(false)
	const [priceToggle, setPriceToggle] = useState(false)

	const { slug, tags, name, subCategory, price, description, createdAt } = product

	const img = `${process.env.REACT_APP_API_PUBLIC_URL}/images/products/${slug}`

	const url = {
		pathname: `/products/${slug}`,
		state: {
			name: name,
			subCategory: subCategory,
		},
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
			<NavLink className={s.img_link} to={url}>
				<ImageWithFallback className={s.img} src={img} alt={name} imgSize={imgSize} />
			</NavLink>
			<div className={s.info}>
				<h3 className={cn(s.name, { [s.margin_less]: tags && tags.dietaries && name.length > 32 })}>
					<NavLink to={url}>{name}</NavLink>
				</h3>
				<h4 className={cn(s.subCategory, { [s.margin_less]: tags && tags.dietaries && name.length > 32 })}>
					<NavLink className={cn({ [s.subCategory_name]: tags && tags.dietaries })} to='/shop'>
						{slugToString(subCategory)}
					</NavLink>
					{tags && (
						<>
							<span className={s.subCategory_divider}>•</span>
							<DietaryTags tags={tags.dietaries} />
						</>
					)}
				</h4>
				<Price
					{...price}
					className={cn(s.prices, priceToggle && s.hide, (size === 'xs' || size === 'row') && s.flex_start)}
				/>
				{size === 'row' && <p className={s.description}>{description}</p>}
				<Hovermenu menuToggle={menuToggle} size={size} slug={slug} product={product} />
			</div>
			{size !== 'xs' && <Tags tags={tags} size={size} createdAt={createdAt} />}
		</div>
	)
}
