import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Hovermenu } from '../UI/Hovermenu'
import { Tags } from '../UI/Tags'
import classNames from 'classnames/bind'
import s from './product.module.css'

let cx = classNames.bind(s)

export const Product = ({ size, product }) => {
	const [menuToggle, setMenuToggle] = useState(false)
	const [priceToggle, setPriceToggle] = useState(false)

	const { tags, img, name, category, price, newprice } = product

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
			<NavLink to='/shop'>
				<img className={s.img} src={img} alt={name} />
			</NavLink>
			<div className={s.info}>
				<h3 className={s.name}>
					<NavLink to='/shop'>{name}</NavLink>
				</h3>
				<h4 className={s.category}>
					<NavLink to='/shop'>{category}</NavLink>
				</h4>
				<p className={!priceToggle ? `${s.price}` : `${s.price} ${s.hide}`}>
					${newprice}
					<span className={s.oldprice}>${price}</span>
				</p>
			</div>
			{tags.length !== 0 && size === 'large' && <Tags tags={tags} />}
			<Hovermenu menuToggle={menuToggle} size={size} />
		</div>
	)
}

// TODO: menu last item crops with slider overflow
// TODO: hover on slider => btns appear. slider paddings includes in triggered zone

// TODO: fix hover on category
