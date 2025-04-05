import { NavLink } from 'react-router-dom'
import { Button } from '../../../Buttons/Button/Button'
import { ReactComponent as EmptyWishlistSVG } from '../../../../../../assets/svg/empty-wishlist.svg'
import s from './empty-wishlist.module.scss'

export const EmptyWishlist = () => {
	return (
		<div className={s.box}>
			<EmptyWishlistSVG className={s.image} />
			<h3 className={s.title}>Wishlist is empty</h3>
			<p className={s.text}>
				Our store offers a lot of various products!
				<br />
				Fill free to add what you like.
			</p>
			<Button>
				<NavLink className={s.search_link} to={`/shop?${process.env.REACT_APP_SHOP_DEFAULT_QUERY}`}>
					Search products
				</NavLink>
			</Button>
		</div>
	)
}
