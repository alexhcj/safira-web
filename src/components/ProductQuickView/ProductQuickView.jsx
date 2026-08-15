import { NavLink, useNavigate } from 'react-router-dom'

import { useCartContext } from '@context/CartContext'
import { useProductModalContext } from '@context/ProductContext'

import { GoodToCart } from '@shared/components/GoodToCart/GoodToCart'
import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { Modal } from '@shared/components/Modal/Modal'
import { Price } from '@shared/components/Price/Price'
import { DietaryTags } from '@shared/components/UI/DietaryTags/DietaryTags'
import { ProductInStock } from '@shared/components/UI/ProductInStock/ProductInStock'
import { Text } from '@shared/components/UI/Text/Text'

import s from './product-quick-view.module.scss'

export const ProductQuickView = () => {
	const { isOpen, setIsOpen, product } = useProductModalContext()
	const { addToCart, productQuantityInCart } = useCartContext()
	const navigate = useNavigate()

	if (!product) return null

	const {
		slug,
		name,
		basicCategory,
		primeCategory,
		subCategory,
		price,
		excerpt,
		specifications = {},
		inventory,
		tags,
	} = product ?? {}
	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`
	const url = {
		pathname: `/products/${slug}`,
		state: {
			name: name,
			category: basicCategory.slug,
		},
	}

	const onClickHandler = () => {
		setIsOpen(false)
		navigate(`/shop?basicCategory=${basicCategory.slug}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`, {
			state: JSON.stringify({
				primeCategory,
				subCategory,
				basicCategory,
			}),
		})
	}

	return (
		<>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} className={s.product_modal}>
				<div className={s.content}>
					<NavLink to={url}>
						<ImageWithFallback src={img} alt={name} imgSize='xl' />
					</NavLink>
					<div>
						<NavLink to={url}>
							<h2 className={s.name}>{name}</h2>
						</NavLink>
						<Price className={s.price} {...price} />
						<div className={s.meta}>
							<button type='button' onClick={onClickHandler}>
								<Text className={s.category} span>
									{basicCategory.name}
								</Text>
							</button>
							{tags && (
								<>
									<span className={s.divider}>•</span>
									<DietaryTags className={s.dietaries} size='m' tags={tags.dietaries} />
								</>
							)}
						</div>
						<p className={s.excerpt}>{excerpt}</p>
						{specifications && (
							<>
								<ProductInStock quantity={inventory.stockQuantity} className={s.stock} />
								<GoodToCart
									quantity={inventory.stockQuantity}
									product={product}
									productQuantityInCart={productQuantityInCart(slug)}
									showLabel={false}
									onClick={addToCart}
									btnClassName={s.btn}
									className={s.action_btn}
								/>
							</>
						)}
					</div>
				</div>
			</Modal>
		</>
	)
}
