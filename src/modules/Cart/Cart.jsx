import React from 'react';
import {Link} from "react-router-dom";
import {useLocalStorage} from "../../hooks/useLocalStorage.hook";
import {CartItem} from "./CartItem";
import {Space} from "../../shared/components/UI/Spacing/Space";
import {Border} from "../../shared/components/UI/Spacing/Border";
import {Button} from "../../shared/components/UI/Buttons/Button/Button";
import {Text} from "../../shared/components/UI/Text/Text";
import s from "./styles/cart.module.scss";

export const Cart = () => {
	const [cart, setCart] = useLocalStorage('cart', []);
	// TODO: add coupon logic verify server & gift card

	const handleProductQuantity = (e, name) => {
		const {value} = e.target

		const product = cart.find(p => p.name === name)
		product.quantity = value

		setCart([...cart])
	}

	const deleteProduct = (name) => {
		const filteredCart = cart.filter(p => p.name !== name)
		setCart([...filteredCart])
	}

	const calculateTotalPrice = () => {
		return cart.reduce((total, item) => {
			console.log(item)
			/* eslint-disable no-param-reassign */
			return total += item.price * item.quantity
		}, 0)
	}

	return (
		<div className="container">
			<table className={s.cart}>
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
					{cart.map(item => {
						const product = {
							img: item.img,
							name: item.name,
							price: item.price,
							quantity: item.quantity
						}
						return <CartItem
							key={item.name}
							{...product}
							onInput={handleProductQuantity}
							onDelete={deleteProduct}
						/>
					})}
				</tbody>
			</table>
			<Space size="l" />
			<div className={s.footer}>
				<div className={s.coupons}>
					<h3 className={s.title}>Coupon & gift card</h3>
					<div className={s.content}>
						<p className={s.text}>Enter your coupon code or a gift card number here.</p>
						<Space space={20} />
						<form>
							<div className={s.coupon}>
								<input className={s.input} type="text" placeholder="Coupon code" />
								<Button type="submit" className={s.button_coupon}>
									<Text color="white" className={s.button_coupon_text}>Apply coupon</Text>
								</Button>
							</div>
							<Space space={20} />
							<div className={s.gift_card}>
								<input className={s.input} type="text" placeholder="Gift card number" />
								<Button type="submit" className={s.button_gift}>
									<Text color="white" className={s.button_gift_text}>Apply gift card</Text>
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
							<span className={s.totals_price}>${calculateTotalPrice().toFixed(2)}</span>
						</div>
						<Space space={20} />
						<Link to="/checkout">
							<Button type="submit" className={s.button_proceed}>
								<Text color="white" className={s.proceed_text}>Proceed to Checkout</Text>
							</Button>
						</Link>
					</div>
				</div>
			</div>
			<Space size="l" />
			<Border />
		</div>
	)
};
