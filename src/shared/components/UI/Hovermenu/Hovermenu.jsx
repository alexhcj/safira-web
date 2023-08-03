import React from 'react'
import cn from 'classnames'
import { useWishlistContext } from '../../../../context/WishlistContext'
import { useCartContext } from '../../../../context/CartContext'
import { ButtonPopup } from '../Buttons/ButtonPopup/ButtonPopup'
import { ButtonCart } from '../Buttons/ButtonCart/ButtonCart'
import { Text } from '../Text/Text'
import { ReactComponent as CartSVG } from '../../../../assets/svg/cart.svg'
import { ReactComponent as HeartSVG } from '../../../../assets/svg/heart.svg'
import { ReactComponent as MagnifierSVG } from '../../../../assets/svg/magnifier.svg'
import { ReactComponent as SyncSVG } from '../../../../assets/svg/sync.svg'
import s from './hovermenu.module.scss'

// sizes: 'large' | 'row'
export const Hovermenu = ({ menuToggle, size, product }) => {
	const { addToWishlist } = useWishlistContext()
	const { addToCart } = useCartContext()

	return (
		<div className={cn(s.menu, menuToggle && s.active, s[`menu_${size}`])}>
			{size === 'row' ? (
				<ButtonCart type='button' onClick={() => addToCart(product)}>
					<Text span color='white' weight='semi' className={s.button_cart_text}>
						Add to cart
					</Text>
				</ButtonCart>
			) : (
				<ButtonPopup text='Add to Cart' onClick={() => addToCart(product)}>
					<CartSVG />
				</ButtonPopup>
			)}
			<ButtonPopup size={size === 'row' && 'lg'} text='Quick View'>
				<MagnifierSVG />
			</ButtonPopup>
			<ButtonPopup onClick={() => addToWishlist(product)} size={size === 'row' && 'lg'} text='Add to Wishlist'>
				<HeartSVG />
			</ButtonPopup>
			<ButtonPopup size={size === 'row' && 'lg'} text='Add to Compare'>
				<SyncSVG />
			</ButtonPopup>
		</div>
	)
}
