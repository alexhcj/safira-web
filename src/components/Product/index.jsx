import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Hovermenu } from '../UI/Hovermenu'
import { Tags } from '../UI/Tags'
import { ImageWithFallback } from '../../utils/components'
import classNames from 'classnames/bind'
import s from './product.module.css'

let cx = classNames.bind(s)

export const Product = ({ size, imgSize, product }) => {
	const [menuToggle, setMenuToggle] = useState(false)
	const [priceToggle, setPriceToggle] = useState(false)

	const { id, tags, img, name, category, price, newprice } = product

	const url = {
		pathname: `/product/${id}`,
		state: {
			name: name,
			category: category,
		},
	}

	let productCN = cx('product', { large: size })

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
		<div onMouseEnter={handleMenuToggle} onMouseLeave={handleMenuToggle} className={productCN}>
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
				<div className={!priceToggle ? `${s.prices}` : `${s.prices} ${s.hide}`}>
					{newprice === undefined ? (
						<span className={s.price}>${price}</span>
					) : (
						<div>
							<span className={s.priceDiscount}>${newprice}</span>
							<span className={newprice ? `${s.price} ${s.discount}` : `${s.price}`}>${price}</span>
						</div>
					)}
				</div>
			</div>
			{tags.length !== 0 && size === 'large' && <Tags tags={tags} />}
			<Hovermenu menuToggle={menuToggle} size={size} />
		</div>
	)
}

// TODO: menu last item crops with slider overflow
// TODO: hover on slider => btns appear. slider paddings includes in triggered zone

// TODO: fix hover on category
