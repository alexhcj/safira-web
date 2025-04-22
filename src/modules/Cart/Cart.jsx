import { Link } from 'react-router-dom'

import { useCartContext } from '@context/CartContext'

import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { ItemsNotFound } from '@shared/components/UI/ItemsNotFound/ItemsNotFound'
import { Space } from '@shared/components/UI/Spacing/Space'
import { Text } from '@shared/components/UI/Text/Text'

import { calculateTotalPrice } from '@utils/number'

import { CartItem } from './CartItem'

import s from './styles/cart.module.scss'

export const Cart = () => {
	const { cart, handleQuantity, removeFromCart } = useCartContext()

	return (
		<div className='container'>
			<table className={s.table}>
				<thead className={s.thead}>
					<tr>
						<th className={s.delete}>Delete</th>
						<th className={s.image}>Image</th>
						<th className={s.name}>Product</th>
						<th className={s.price}>Price</th>
						<th className={s.quantity}>Quantity</th>
						<th className={s.total}>Total</th>
					</tr>
				</thead>
				<tbody>
					{cart.length === 0 ? (
						<tr>
							<td colSpan={6}>
								<ItemsNotFound type='cart' />
							</td>
						</tr>
					) : (
						cart.map(({ slug, name, img, price, discount_price, quantity }) => {
							const product = { slug, name, img, price, discount_price, quantity }

							return <CartItem key={slug} {...product} onInput={handleQuantity} onDelete={removeFromCart} />
						})
					)}
				</tbody>
			</table>
			<Space size='l' />
			<div className={s.footer}>
				<div className={s.coupons}>
					<h3 className={s.title}>Coupon & gift card</h3>
					<div className={s.content}>
						<p className={s.text}>Enter your coupon code or a gift card number here.</p>
						<Space space={20} />
						<form>
							<div className={s.coupon}>
								<input className={s.input} type='text' placeholder='Coupon code' />
								<Button type='submit' className={s.button_coupon}>
									<Text color='white' className={s.button_coupon_text}>
										Apply coupon
									</Text>
								</Button>
							</div>
							<Space space={20} />
							<div className={s.gift_card}>
								<input className={s.input} type='text' placeholder='Gift card number' />
								<Button type='submit' className={s.button_gift}>
									<Text color='white' className={s.button_gift_text}>
										Apply gift card
									</Text>
								</Button>
							</div>
						</form>
					</div>
				</div>
				<div className={s.totals}>
					<h3 className={s.title}>Cart totals</h3>
					<div className={s.content}>
						<div className={s.totals_box}>
							<p className={s.totals_text}>Total</p>
							<span className={s.totals_price}>${calculateTotalPrice(cart).toFixed(2)}</span>
						</div>
						<Space space={20} />
						<Link to='/checkout'>
							<Button type='submit' className={s.button_proceed}>
								<Text color='white' className={s.proceed_text}>
									Proceed to Checkout
								</Text>
							</Button>
						</Link>
					</div>
				</div>
			</div>
			<Space size='l' />
		</div>
	)
}
