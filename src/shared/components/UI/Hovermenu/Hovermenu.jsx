import cn from 'classnames'

import { useCartContext } from '@context/CartContext'
import { useCompareContext } from '@context/CompareContext'
import { useProductModalContext } from '@context/ProductContext'
import { useWishlistContext } from '@context/WishlistContext'

import { ButtonCart } from '../Buttons/ButtonCart/ButtonCart'
import { ButtonPopup } from '../Buttons/ButtonPopup/ButtonPopup'
import { Text } from '../Text/Text'

import CartSVG from '@assets/svg/cart.svg?react'
import CompareSVG from '@assets/svg/compare.svg?react'
import HeartSVG from '@assets/svg/heart.svg?react'
import MagnifierSVG from '@assets/svg/magnifier.svg?react'

import s from './hovermenu.module.scss'

// sizes: 'xs' | 'sm' | 'lg' | 'row'
export const Hovermenu = ({ menuToggle, size, product }) => {
	const { previewProduct } = useProductModalContext()
	const { addToWishlist, isProductInWishlist, removeFromWishlist } = useWishlistContext()
	const { addToCart, isProductInCart, removeFromCart } = useCartContext()
	const { addToCompare, isProductInCompare, removeItemFromCompare } = useCompareContext()
	const isProductInCartList = isProductInCart(product.slug)
	const isProductInWishList = isProductInWishlist(product.slug)
	const isProductInCompareList = isProductInCompare(product.slug, product.basicCategory)

	const handleCartClick = () => {
		isProductInCartList ? removeFromCart(product.slug) : addToCart(product)
	}

	const handleWishlistClick = () => {
		isProductInWishList ? removeFromWishlist(product.slug) : addToWishlist(product)
	}

	const handleCompareClick = () => {
		isProductInCompareList ? removeItemFromCompare(product.slug, product.basicCategory) : addToCompare(product)
	}

	return (
		<div className={cn(s.menu, menuToggle && s.active, s[`menu_${size}`])}>
			{size === 'row' ? (
				<ButtonCart type='button' onClick={handleCartClick}>
					<Text span color='white' weight='semi' className={s.button_cart_text}>
						Add to cart
					</Text>
				</ButtonCart>
			) : (
				<ButtonPopup
					className={cn(s.btn_popup, isProductInCartList && s.active)}
					onClick={handleCartClick}
					text={isProductInCartList ? 'Remove from Cart' : 'Add to Cart'}
				>
					<CartSVG />
				</ButtonPopup>
			)}
			<ButtonPopup
				className={s.btn_popup}
				size={size === 'row' && 'lg'}
				text='Quick View'
				onClick={() => previewProduct(product)}
			>
				<MagnifierSVG />
			</ButtonPopup>
			<ButtonPopup
				className={cn(s.btn_popup, isProductInWishList && s.active)}
				onClick={handleWishlistClick}
				size={size === 'row' && 'lg'}
				text={isProductInWishList ? 'Remove from Wishlist' : 'Add to Wishlist'}
			>
				<HeartSVG />
			</ButtonPopup>
			<ButtonPopup
				className={cn(s.btn_popup, s.compare, isProductInCompareList && s.active)}
				onClick={handleCompareClick}
				size={size === 'row' && 'lg'}
				text={isProductInCompareList ? 'Remove from Compare' : 'Add to Compare'}
				outline
			>
				<CompareSVG className={s.compare_svg} />
			</ButtonPopup>
		</div>
	)
}
