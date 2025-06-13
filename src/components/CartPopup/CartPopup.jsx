import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useCartContext } from '@context/CartContext'
import { useCartPopupContext } from '@context/CartPopupContext'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { SidebarModal } from '@shared/components/Modal/SidebarModal'

import { formatPrice } from '@utils/number/convert'

import CartSolidSVG from '@assets/svg/cart-solid.svg?react'
import RemoveSVG from '@assets/svg/close.svg?react'
import SignInSVG from '@assets/svg/sign-in.svg?react'

import s from './cart-popup.module.scss'

export const CartPopup = () => {
	const navigate = useNavigate()
	const { isOpen, setIsOpen } = useCartPopupContext()
	const { cart, productQuantityInCart, cartTotalPrice, removeFromCart } = useCartContext()

	const handleCartClick = () => {
		setIsOpen(false)
		navigate('/cart')
	}

	const handleCheckoutClick = () => {
		setIsOpen(false)
		navigate('/checkout')
	}

	return (
		<SidebarModal isOpen={isOpen} setIsOpen={setIsOpen} className={s.modal}>
			<div className={s.header}>
				<h3 className={s.title}>Cart</h3>
			</div>
			<ul className={s.list}>
				{cart.map(({ slug, name, img, subCategory, price, quantity }) => {
					const url = {
						pathname: `/products/${slug}`,
						state: {
							name: name,
							subCategory: subCategory,
						},
					}

					return (
						<li className={s.product} key={`cp-${slug}`}>
							<Link className={s.img_link} to={url} onClick={() => setIsOpen(false)}>
								<ImageWithFallback src={img} alt={name} imgSize='xs' />
							</Link>
							<div>
								<Link className={s.name_link} to={url} onClick={() => setIsOpen(false)}>
									<h2 className={s.name}>{name}</h2>
								</Link>
								<div className={s.price}>
									{productQuantityInCart(slug)} x <span>{formatPrice(price)}</span>
								</div>
							</div>
							<button className={s.btn_remove} type='button' onClick={() => removeFromCart(slug)}>
								<RemoveSVG className={s.remove_svg} />
							</button>
						</li>
					)
				})}
			</ul>
			<div className={s.total}>
				<span>Total:</span>
				<span>{formatPrice(cartTotalPrice())}</span>
			</div>
			<div className={s.actions}>
				<button className={s.button_link} type='button' onClick={() => handleCartClick()}>
					<CartSolidSVG className={s.icon} />
					View cart
				</button>
				<button className={s.button_link} type='button' onClick={() => handleCheckoutClick()}>
					<SignInSVG className={s.icon} />
					Checkout
				</button>
			</div>
		</SidebarModal>
	)
}
