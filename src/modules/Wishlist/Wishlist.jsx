import {Space} from "../../shared/components/UI/Spacing/Space";
import {Border} from "../../shared/components/UI/Spacing/Border";
import {useLocalStorage} from "../../hooks/useLocalStorage.hook";
import {WishlistItem} from "./WishlistItem";
import s from './styles/wishlist.module.scss'

export const Wishlist = () => {
	const [cart, setCart] = useLocalStorage('cart', []);
	const [wishlist, setWishlist] = useLocalStorage('wishlist', []);

	const addProduct = (name) => {
		const product = wishlist.find(p => p.name === name)
		product.quantity = 1
		setCart([...cart, product])
	}

	const isProductInCart = (name) => {
		return cart.find(p => {
			if (p.name === name) return true
		})
	}

	const productQuantity = (name) => {
		const product = cart.find(p => p.name === name)
		return product ? product.quantity : null
	}

	const deleteProduct = (name) => {
		const filteredWishlist = wishlist.filter(p => p.name !== name)
		setWishlist([...filteredWishlist])
	}

	return (
		<div className="container">
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
				{wishlist.map(item => {
					const product = {
						img: item.img,
						name: item.name,
						price: item.price,
						maxQuantity: item.maxQuantity
					}
					return <WishlistItem
						key={item.name}
						{...product}
						onClick={addProduct}
						onDelete={deleteProduct}
						isProductInCart={isProductInCart(item.name)}
						quantity={productQuantity(item.name)}
					/>
				})}
				</tbody>
			</table>
			<Space size="l" />
			<Border />
		</div>
	)
}
