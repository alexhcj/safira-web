import React from 'react'
import cn from 'classnames'
import { useProductModalContext } from '../../../../context/ProductContext'
import { useWishlistContext } from '../../../../context/WishlistContext'
import { useCartContext } from '../../../../context/CartContext'
import { useCompareContext } from '../../../../context/CompareContext'
import { ButtonPopup } from '../Buttons/ButtonPopup/ButtonPopup'
import { ButtonCart } from '../Buttons/ButtonCart/ButtonCart'
import { Text } from '../Text/Text'
import { ReactComponent as CartSVG } from '../../../../assets/svg/cart.svg'
import { ReactComponent as HeartSVG } from '../../../../assets/svg/heart.svg'
import { ReactComponent as MagnifierSVG } from '../../../../assets/svg/magnifier.svg'
import { ReactComponent as CompareSVG } from '../../../../assets/svg/compare.svg'
import s from './hovermenu.module.scss'

// sizes: 'xs' | 'sm' | 'lg' | 'row'
export const Hovermenu = ({ menuToggle, size, product }) => {
	const { previewProduct } = useProductModalContext()
	const { addToWishlist, isProductInWishlist, removeFromWishlist } = useWishlistContext()
	const { addToCart } = useCartContext()
	const { addToCompare, isProductInCompare, removeItemFromCompare } = useCompareContext()
	const isProductInWishList = isProductInWishlist(product.slug)
	const isProductInCompareList = isProductInCompare(product.slug, product.basicCategory)

	const handleWishlistClick = () => {
		isProductInWishList ? removeFromWishlist(product.slug) : addToWishlist(product)
	}

	const handleCompareClick = () => {
		isProductInCompareList
			? removeItemFromCompare(product.slug, product.basicCategory)
			: addToCompare(product, product.basicCategory)
	}

	return (
		<div className={cn(s.menu, menuToggle && s.active, s[`menu_${size}`])}>
			{size === 'row' ? (
				<ButtonCart type='button' onClick={() => addToCart(product)}>
					<Text span color='white' weight='semi' className={s.button_cart_text}>
						Add to cart
					</Text>
				</ButtonCart>
			) : (
				<ButtonPopup className={s.btn_popup} text='Add to Cart' onClick={() => addToCart(product)}>
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
