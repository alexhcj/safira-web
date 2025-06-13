import { NavLink } from 'react-router-dom'

import { Button } from '../../../Buttons/Button/Button'

import EmptyCartSVG from '@assets/svg/empty-cart.svg?react'

import s from './empty-cart.module.scss'

export const EmptyCart = () => {
	return (
		<div className={s.box}>
			<EmptyCartSVG className={s.image} />
			<h3 className={s.title}>Cart is empty</h3>
			<p className={s.text}>
				Most of our products have profitable offers!
				<br />
				Fill free to add what you like.
			</p>
			<Button>
				<NavLink className={s.search_link} to={`/shop?${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`}>
					Search products
				</NavLink>
			</Button>
		</div>
	)
}
