import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useProductModalContext } from '../../context/ProductContext'
import { useCartContext } from '../../context/CartContext'
import { Modal } from '../../shared/components/Modal/Modal'
import { ImageWithFallback } from '../../utils/ImageWithFallback'
import { Price } from '../../shared/components/Price/Price'
import { GoodToCart } from '../../shared/components/GoodToCart/GoodToCart'
import { Text } from '../../shared/components/UI/Text/Text'
import { slugToString } from '../../utils'
import s from './product-quick-view.module.scss'

export const ProductQuickView = () => {
	const { isOpen, setIsOpen, product } = useProductModalContext()
	const { addToCart, productQuantityInCart } = useCartContext()
	const navigate = useNavigate()
	const { slug, name, basicCategory, price, description, specifications } = product
	const img = `${process.env.REACT_APP_API_PUBLIC_URL}/images/products/${slug}`
	const url = {
		pathname: `/products/${slug}`,
		state: {
			name: name,
			category: basicCategory,
		},
	}

	const onClickHandler = () => {
		setIsOpen(false)
		navigate(`/shop?basicCategory=${basicCategory}&${process.env.REACT_APP_SHOP_DEFULT_QUERY}`)
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
							{/* TODO: add redirect to shop with category filter */}
							<button type='button' onClick={onClickHandler}>
								<Text className={s.tag} span>
									{basicCategory && slugToString(basicCategory)}
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
