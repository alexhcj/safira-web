import { useState, useEffect, useRef } from 'react'

import cn from 'classnames'
import { NavLink, useNavigate } from 'react-router-dom'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { Price } from '@shared/components/Price/Price'
import { DietaryTags } from '@shared/components/UI/DietaryTags/DietaryTags'
import { Hovermenu } from '@shared/components/UI/Hovermenu/Hovermenu'
import { Tags } from '@shared/components/UI/Tags/Tags'

import s from './productcard.module.scss'

// sizes: 'xs' | 'sm' | 'md-lg' | 'lg' | 'list' | 'list-xs'
export const ProductCard = ({ size = 'xs', imgSize = 'xs', product = true, className }) => {
	const [menuToggle, setMenuToggle] = useState(false)
	const [priceToggle, setPriceToggle] = useState(false)
	const navigate = useNavigate()
	const cardRef = useRef(null)

	// Close the menu when the user taps/clicks outside the card.
	// Covers both mouse (click) and touch (pointerdown) dismissal.
	useEffect(() => {
		if (!menuToggle) return

		const handleOutside = (e) => {
			if (cardRef.current && !cardRef.current.contains(e.target)) {
				setMenuToggle(false)
				setPriceToggle(false)
			}
		}

		document.addEventListener('pointerdown', handleOutside)
		return () => document.removeEventListener('pointerdown', handleOutside)
	}, [menuToggle])

	const { slug, tags, name, primeCategory, subCategory, price, description, createdAt } = product

	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`

	const url = `/products/${slug}`

	const linkState = {
		name: name,
	}

	const handleSubCategoryClick = () => {
		const query = `subCategory=${subCategory.slug}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`
		navigate(`/shop?${new URLSearchParams(query)}`, {
			state: JSON.stringify({ primeCategory, subCategory }),
		})
	}

	// pointerType distinguishes how the user is actually interacting right now:
	//   'mouse' → standard hover/click desktop flow
	//   'touch' → finger on phone/tablet
	//   'pen'   → stylus; treat the same as touch
	const handlePointerEnter = (e) => {
		if (size === 'list') return
		if (e.pointerType !== 'mouse') return // touch/pen use tap toggle instead

		setMenuToggle(true)
		!size && setPriceToggle(true)
	}

	const handlePointerLeave = (e) => {
		if (size === 'list') return
		if (e.pointerType !== 'mouse') return

		setMenuToggle(false)
		!size && setPriceToggle(false)
	}

	const handlePointerDown = (e) => {
		if (size === 'list') return
		if (e.pointerType === 'mouse') return // mouse is handled by enter/leave

		// Touch/pen: toggle the menu on each tap.
		// No preventDefault() needed — we're not suppressing scroll or click,
		// Hovermenu child buttons receive their click events normally.
		const next = !menuToggle
		setMenuToggle(next)
		!size && setPriceToggle(next)
	}

	return (
		<div
			ref={cardRef}
			onPointerEnter={handlePointerEnter}
			onPointerLeave={handlePointerLeave}
			onPointerDown={handlePointerDown}
			className={cn(s.product, size && s[`product_${size}`], className)}
		>
			<NavLink className={s.img_link} to={url} state={linkState} draggable={false}>
				<ImageWithFallback className={s.img} src={img} alt={name} imgSize={imgSize} />
				{size !== 'xs' && size !== 'list-xs' && <Tags {...price} createdAt={createdAt} />}
			</NavLink>
			<div className={s.info}>
				<h3 className={cn(s.name, { [s.margin_less]: tags && tags.dietaries && name.length > 32 })}>
					<NavLink to={url} state={linkState} draggable={false}>
						{name}
					</NavLink>
				</h3>
				<div className={s.card_bottom}>
					{size !== 'list-xs' && (
						<h4 className={cn(s.subCategory, { [s.margin_less]: tags && tags.dietaries && name.length > 32 })}>
							<button
								type='button'
								onClick={handleSubCategoryClick}
								className={cn({ [s.subCategory_name]: tags && tags.dietaries })}
							>
								{subCategory.name}
							</button>
							{tags && (
								<>
									<span className={s.subCategory_divider}>•</span>
									<DietaryTags tags={tags.dietaries} />
								</>
							)}
						</h4>
					)}
					{size !== 'list-xs' && (
						<Price
							{...price}
							className={cn(s.prices, priceToggle && s.hide, (size === 'xs' || size === 'list') && s.flex_start)}
						/>
					)}
					{size === 'list' && <p className={s.description}>{description}</p>}
					{size !== 'list-xs' && <Hovermenu menuToggle={menuToggle} size={size} slug={slug} product={product} />}
				</div>
			</div>
		</div>
	)
}
