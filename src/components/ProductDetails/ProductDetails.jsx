import { useEffect, useState } from 'react'

import cn from 'classnames'
import { NavLink, useParams } from 'react-router-dom'

import { useCartContext } from '@context/CartContext'
import { useCompareContext } from '@context/CompareContext'
import { useWishlistContext } from '@context/WishlistContext'

import { useProductsNew } from '@hooks/services/useProductsNew'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { GoodToCart } from '@shared/components/GoodToCart/GoodToCart'
import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { Price } from '@shared/components/Price/Price'
import { Rating } from '@shared/components/Rating/Rating'
import { NewReview } from '@shared/components/Reviews/NewReview/NewReview'
import { Reviews } from '@shared/components/Reviews/Reviews'
import { Specification } from '@shared/components/Specification/Specification'
import { Tab, Tabs } from '@shared/components/Tabs/Tabs'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { ButtonWithTooltip } from '@shared/components/UI/Buttons/ButtonWithTooltip/ButtonWithTooltip'
import { DietaryTags } from '@shared/components/UI/DietaryTags/DietaryTags'
import { ProductInStock } from '@shared/components/UI/ProductInStock/ProductInStock'
import { Border } from '@shared/components/UI/Spacing/Border'
import { Text } from '@shared/components/UI/Text/Text'
import { PRICE_TYPE } from '@shared/data/price'

import { RelatedProducts } from '../RelatedProducts/RelatedProducts'

import CompareRemoveSVG from '@assets/svg/compare-remove.svg?react'
import CompareSVG from '@assets/svg/compare.svg?react'
import HeartBrokenSVG from '@assets/svg/heart-broken.svg?react'
import HeartSVG from '@assets/svg/heart.svg?react'

import s from './productdetails.module.scss'

export const ProductDetails = () => {
	const { addToWishlist, removeFromWishlist, isProductInWishlist, isLoading: wishlistIsLoading } = useWishlistContext()
	const { addToCart, productQuantityInCart, isLoading: cartIsLoading } = useCartContext()
	const { addToCompare, isProductInCompare, removeItemFromCompare, isLoading: compareIsLoading } = useCompareContext()
	const { slug } = useParams()
	const { findBySlug, isLoading } = useProductsNew()
	const [product, setProduct] = useState(null)

	useEffect(() => {
		let isCancelled = false

		async function fetchData() {
			setProduct(null)

			const res = await findBySlug(slug)

			if (isCancelled) return

			if (res && res.success) {
				setProduct(res.product)
			}
		}

		fetchData()

		return () => {
			isCancelled = true
		}
	}, [slug])

	const isReady = !isLoading && Boolean(product)

	const {
		name,
		price,
		description,
		primeCategory,
		subCategory,
		basicCategory,
		rating,
		tags,
		specifications = {},
		reviews,
	} = product ?? {}

	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`

	const linkState = JSON.stringify({ primeCategory, subCategory, basicCategory })

	return (
		<div className='container'>
			<div className={s.product}>
				{img ? <ImageWithFallback src={img} imgSize='xl' alt={name} /> : <Preloader />}
				{!isReady ? (
					<Preloader />
				) : (
					<div>
						<h4 className={s.name}>{name}</h4>
						<Rating className={s.rating} rating={rating} />
						{price && <Price className={s.price} {...price} type={PRICE_TYPE.LARGE} />}
						<div className={s.meta}>
							<div className={s.category}>
								<Text span weight='medium'>
									Category:
								</Text>
								<NavLink
									to={`/shop?basicCategory=${basicCategory.slug}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`}
									state={linkState}
								>
									<Text className={s.tag} span>
										{basicCategory.name}
									</Text>
								</NavLink>
							</div>
							<div className={s.stock}>
								<Text span weight='medium'>
									Availability:
								</Text>
								<ProductInStock quantity={specifications.quantity} />
							</div>
							{tags && <DietaryTags className={s.dietaries} size='mm' tags={tags.dietaries} />}
						</div>
						<Text className={s.description}>{description}</Text>
						<Border />
						<GoodToCart
							quantity={specifications.quantity}
							product={product}
							productQuantityInCart={productQuantityInCart(slug)}
							onClick={addToCart}
							isLoading={cartIsLoading}
							btnClassName={s.btn_add}
							className={s.add_actions}
						/>
						<div className={s.actions}>
							{isProductInWishlist(slug) ? (
								<ButtonWithTooltip
									className={s.btn}
									onClick={() => removeFromWishlist(slug)}
									text='Remove from Wishlist'
									tooltipPosition='right'
								>
									{wishlistIsLoading ? (
										<Preloader width={25} height={25} />
									) : (
										<>
											<HeartSVG className={s.icon} />
											<HeartBrokenSVG className={s.icon_remove} />
										</>
									)}
								</ButtonWithTooltip>
							) : (
								<Button className={s.btn_add_text} type='text' onClick={() => addToWishlist(product)}>
									{wishlistIsLoading ? <Preloader width={25} height={25} /> : <Text span>+ Add to WishList</Text>}
								</Button>
							)}
							{isProductInCompare(slug, basicCategory.slug) ? (
								<ButtonWithTooltip
									className={s.btn}
									onClick={() => removeItemFromCompare(slug, basicCategory.slug)}
									text='Remove from Compare'
									tooltipPosition='right'
								>
									{compareIsLoading ? (
										<Preloader width={25} height={25} />
									) : (
										<>
											<CompareSVG className={cn(s.icon, s.compare)} />
											<CompareRemoveSVG className={cn(s.icon_remove, s.compare)} />
										</>
									)}
								</ButtonWithTooltip>
							) : (
								<Button className={s.btn_add_text} type='text' onClick={() => addToCompare(product)}>
									{compareIsLoading ? <Preloader width={25} height={25} /> : <Text span>+ Add to Compare</Text>}
								</Button>
							)}
						</div>
					</div>
				)}
			</div>
			<div className={s.specifications}>
				<Tabs className={s.tabs}>
					<Tab id='spec' text='Specifications'>
						<Specification {...specifications} />
					</Tab>
					<Tab id='rev' text={`Reviews (${reviews ? reviews.reviews.length : '0'})`}>
						{reviews ? <Reviews reviews={reviews.reviews} /> : <NewReview />}
					</Tab>
				</Tabs>
			</div>
			<RelatedProducts slug={slug} />
		</div>
	)
}
