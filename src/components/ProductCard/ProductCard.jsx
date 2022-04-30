import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import cn from "classnames";
import {Price} from "../Price/Price";
import {Tags} from "../../shared/components/UI/Tags/Tags";
import {Hovermenu} from "../../shared/components/UI/Hovermenu/Hovermenu";
import { ImageWithFallback } from '../../utils/ImageWithFallback'
import s from './productcard.module.scss'

// sizes: xs | large
export const ProductCard = ({ size, imgSize, product }) => {
	const [menuToggle, setMenuToggle] = useState(false)
	const [priceToggle, setPriceToggle] = useState(false)

	const { slug, tags, img, name, category, price } = product

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
		<div onMouseEnter={handleMenuToggle} onMouseLeave={handleMenuToggle} className={cn(s.product, size && s[`product_${size}`])}>
			<NavLink to={url}>
				<ImageWithFallback className={s.img} src={img} alt={name} imgSize={imgSize} />
			</NavLink>
			<div className={s.info}>
				<h3 className={s.name}>
					<NavLink to={url}>{name}</NavLink>
				</h3>
				<h4 className={s.category}>
					<NavLink to='/shop'>{category}</NavLink>
				</h4>
				<Price {...price} className={cn(s.prices, priceToggle && s.hide, size === 'xs' && s.flex_start)} />
			</div>
			{tags.length !== 0 && size === 'large' && <Tags tags={tags} />}
			<Hovermenu menuToggle={menuToggle} size={size} />
		</div>
	)
}

// TODO: menu last item crops with slider overflow
// TODO: hover on slider => btns appear. slider paddings includes in triggered zone
