import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import { Price } from '../../shared/components/Price/Price'
import { Tags } from '../../shared/components/UI/Tags/Tags'
import { Hovermenu } from '../../shared/components/UI/Hovermenu/Hovermenu'
import { ImageWithFallback } from '../../utils/ImageWithFallback'
import s from './productcard.module.scss'

// sizes: xs | large | row
export const ProductCard = ({ size = 'xs', imgSize = 'xs', product, className }) => {
	const [menuToggle, setMenuToggle] = useState(false)
	const [priceToggle, setPriceToggle] = useState(false)

	const { slug, tags, name, category, price, description } = product

	const img = `${process.env.REACT_APP_PUBLIC_URL}/images/products/${slug}`

	const url = {
		pathname: `/products/${slug}`,
		state: {
			name: name,
			category: category,
		},
	}

	const handleMenuToggle = (e) => {
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
			onMouseEnter={size !== 'row' && handleMenuToggle}
			onMouseLeave={size !== 'row' && handleMenuToggle}
			className={cn(s.product, size && s[`product_${size}`], className)}
		>
			<NavLink className={s.img_link} to={url}>
				<ImageWithFallback className={s.img} src={img} alt={name} imgSize={imgSize} />
			</NavLink>
			<div className={s.info}>
				<h3 className={s.name}>
					<NavLink to={url}>{name}</NavLink>
				</h3>
				<h4 className={s.category}>
					<NavLink to='/shop'>{category}</NavLink>
				</h4>
				<Price
					{...price}
					className={cn(s.prices, priceToggle && s.hide, (size === 'xs' || size === 'row') && s.flex_start)}
				/>
				{size === 'row' && <p className={s.description}>{description}</p>}
			</div>
			{(size === 'large' || size === 'row') && !!tags && <Tags tags={tags} size='md' />}
			<Hovermenu menuToggle={menuToggle} size={size} slug={slug} product={product} />
		</div>
	)
}
