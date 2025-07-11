import { NavLink, useNavigate } from 'react-router-dom'

import { useCartContext } from '@context/CartContext'
import { useProductModalContext } from '@context/ProductContext'

import { GoodToCart } from '@shared/components/GoodToCart/GoodToCart'
import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { Modal } from '@shared/components/Modal/Modal'
import { Price } from '@shared/components/Price/Price'
import { Text } from '@shared/components/UI/Text/Text'

import { slugToStr } from '@utils/string'

import s from './product-quick-view.module.scss'

export const ProductQuickView = () => {
	const { isOpen, setIsOpen, product } = useProductModalContext()
	const { addToCart, productQuantityInCart } = useCartContext()
	const navigate = useNavigate()
	const { slug, name, basicCategory, primeCategory, subCategory, price, description, specifications } = product
	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`
	const url = {
		pathname: `/products/${slug}`,
		state: {
			name: name,
			category: basicCategory,
		},
	}

	const onClickHandler = () => {
		setIsOpen(false)
		navigate(`/shop?basicCategory=${basicCategory}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`, {
			state: JSON.stringify({ primeCategory, subCategory, basicCategory }),
		})
	}

	return (
		<>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				<div className={s.content}>
					<NavLink className={s.img_link} to={url}>
						<ImageWithFallback src={img} alt={name} imgSize='xl' />
					</NavLink>
					<div className={s.product}>
						<NavLink to={url}>
							<h2 className={s.name}>{product.name}</h2>
						</NavLink>
						<Price className={s.price} {...price} />
						<p className={s.description}>{description}</p>
						<div className={s.category}>
							<Text span weight='medium'>
								Category:
							</Text>
							<button type='button' onClick={onClickHandler}>
								<Text className={s.tag} span>
									{basicCategory && slugToStr(basicCategory)}
								</Text>
							</button>
						</div>
						{specifications && (
							<GoodToCart
								maxQuantity={specifications.quantity}
								onClick={addToCart}
								product={product}
								productQuantityInCart={productQuantityInCart(slug)}
								type='straight'
								label='none'
								rounded={false}
								btnClassName={s.btn}
							/>
						)}
					</div>
				</div>
			</Modal>
		</>
	)
}
