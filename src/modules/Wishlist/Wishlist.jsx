import { useCartContext } from '@context/CartContext'
import { useWishlistContext } from '@context/WishlistContext'

import { ItemsNotFound } from '@shared/components/UI/ItemsNotFound/ItemsNotFound'
import { Space } from '@shared/components/UI/Spacing/Space'

import { WishlistItem } from './WishlistItem'

import s from './styles/wishlist.module.scss'

export const Wishlist = () => {
	const { wishlist, removeFromWishlist } = useWishlistContext()
	const { addToCart, productQuantityInCart } = useCartContext()

	return (
		<div className='container'>
			<table className={s.table}>
				<thead className={s.thead}>
					<tr>
						<th className={s.delete}>Delete</th>
						<th className={s.image}>Image</th>
						<th className={s.name}>Product</th>
						<th className={s.price}>Price</th>
						<th className={s.stock}>Stock status</th>
						<th className={s.add}>Add to cart</th>
					</tr>
				</thead>
				<tbody>
					{wishlist.length === 0 ? (
						<tr>
							<td colSpan={6}>
								<ItemsNotFound type='wishlist' />
							</td>
						</tr>
					) : (
						wishlist.map((item) => {
							const product = {
								slug: item.slug,
								name: item.name,
								price: { price: item.price },
								specifications: { quantity: item.maxQuantity },
							}
							return (
								<WishlistItem
									key={item.slug}
									product={product}
									onClick={() => addToCart(product)}
									onDelete={() => removeFromWishlist(item.slug)}
									productQuantityInCart={productQuantityInCart(item.slug)}
								/>
							)
						})
					)}
				</tbody>
			</table>
			<Space size='l' />
		</div>
	)
}
