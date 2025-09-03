import cn from 'classnames'

import { useCartContext } from '@context/CartContext'
import { useCompareContext } from '@context/CompareContext'
import { useProductModalContext } from '@context/ProductContext'
import { useWishlistContext } from '@context/WishlistContext'

import { ButtonWithTooltip } from '@shared/components/UI/Buttons/ButtonWithTooltip/ButtonWithTooltip'

import { ButtonCart } from '../Buttons/ButtonCart/ButtonCart'
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
				<ButtonWithTooltip
					className={cn(s.btn_action, isProductInCartList && s.active)}
					buttonSize={size === 'row' ? 'lg' : 'default'}
					buttonType='primary'
					text={isProductInCartList ? 'Remove from Cart' : 'Add to Cart'}
					onClick={handleCartClick}
				>
					<CartSVG className={s.icon} width={16} height={16} />
				</ButtonWithTooltip>
			)}
			<ButtonWithTooltip
				className={s.btn_action}
				buttonSize={size === 'row' ? 'lg' : 'default'}
				buttonType='primary'
				text='Quick View'
				onClick={() => previewProduct(product)}
			>
				<MagnifierSVG className={s.icon} width={16} height={16} />
			</ButtonWithTooltip>
			<ButtonWithTooltip
				className={cn(s.btn_action, isProductInWishList && s.active)}
				buttonSize={size === 'row' ? 'lg' : 'default'}
				buttonType='primary'
				text={isProductInWishList ? 'Remove from Wishlist' : 'Add to Wishlist'}
				onClick={handleWishlistClick}
			>
				<HeartSVG className={s.icon} width={16} height={16} />
			</ButtonWithTooltip>
			<ButtonWithTooltip
				className={cn(s.btn_action, isProductInCompareList && s.active)}
				buttonSize={size === 'row' ? 'lg' : 'default'}
				buttonType='primary'
				text={isProductInCompareList ? 'Remove from Compare' : 'Add to Compare'}
				onClick={handleCompareClick}
			>
				<CompareSVG className={s.icon_compare} width={18} height={18} />
			</ButtonWithTooltip>
		</div>
	)
}
