import { useEffect, useState } from 'react'

import cn from 'classnames'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

import { productsAPI } from '@api/products'

import { useCartContext } from '@context/CartContext'
import { useCompareContext } from '@context/CompareContext'
import { useWishlistContext } from '@context/WishlistContext'

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

import { slugToStr } from '@utils/string'

import { RelatedProducts } from '../RelatedProducts/RelatedProducts'

import CompareRemoveSVG from '@assets/svg/compare-remove.svg?react'
import CompareSVG from '@assets/svg/compare.svg?react'
import HeartBrokenSVG from '@assets/svg/heart-broken.svg?react'
import HeartSVG from '@assets/svg/heart.svg?react'

import s from './productdetails.module.scss'

export const ProductDetails = () => {
	const navigate = useNavigate()
	const { addToWishlist, removeFromWishlist, isProductInWishlist } = useWishlistContext()
	const { addToCart, productQuantityInCart } = useCartContext()
	const { addToCompare, isProductInCompare, removeItemFromCompare } = useCompareContext()
	const { slug } = useParams()
	const [product, setProduct] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { product } = await productsAPI.findOne(slug)
				setProduct(product)
			} catch (error) {
				if (error.status === 404) navigate('/not-found', { replace: true })
				return null
			}
		}
		fetchData()
	}, [navigate, slug])

	const { name, price, description, primeCategory, subCategory, basicCategory, rating, tags, specifications, reviews } =
		product

	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`

	const linkState = JSON.stringify({
		primeCategory: { name: slugToStr(primeCategory), slug: primeCategory },
		subCategory: { name: slugToStr(subCategory), slug: subCategory },
		basicCategory: { name: slugToStr(basicCategory), slug: basicCategory },
	})

	return (
		<div className='container'>
			<div className={s.product}>
				{img ? <ImageWithFallback src={img} imgSize='xl' alt={name} /> : <Preloader />}
				<div>
					<h4 className={s.name}>{name}</h4>
					<Rating className={s.rating} rating={rating} />
					{price && <Price className={s.price} {...price} type='large' />}
					<div className={s.meta}>
						<div className={s.category}>
							<Text span weight='medium'>
								Category:
							</Text>
							<NavLink
								to={`/shop?basicCategory=${basicCategory}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`}
								state={linkState}
							>
								<Text className={s.tag} span>
									{basicCategory && slugToStr(basicCategory)}
								</Text>
							</NavLink>
						</div>
						{specifications && (
							<div className={s.stock}>
								<Text span weight='medium'>
									Availability:
								</Text>
								<ProductInStock quantity={specifications.quantity} />
							</div>
						)}
						{tags && <DietaryTags className={s.dietaries} size='mm' tags={tags.dietaries} />}
					</div>
					<Text className={s.description}>{description}</Text>
					<Border />
					{specifications && (
						<GoodToCart
							className={s.add_actions}
							btnClassName={s.btn_add}
							maxQuantity={specifications.quantity}
							onClick={addToCart}
							product={product}
							productQuantityInCart={productQuantityInCart(slug)}
						/>
					)}
					<div className={s.actions}>
						{isProductInWishlist(slug) ? (
							<ButtonWithTooltip
								className={s.btn}
								onClick={() => removeFromWishlist(slug)}
								text='Remove from Wishlist'
								tooltipPosition='right'
							>
								<HeartSVG className={s.icon} />
								<HeartBrokenSVG className={s.icon_remove} />
							</ButtonWithTooltip>
						) : (
							<Button className={s.btn_add_text} type='text' onClick={() => addToWishlist(product)}>
								<Text span>+ Add to WishList</Text>
							</Button>
						)}
						{isProductInCompare(slug, basicCategory) ? (
							<ButtonWithTooltip
								className={s.btn}
								onClick={() => removeItemFromCompare(slug, basicCategory)}
								text='Remove from Compare'
								tooltipPosition='right'
							>
								<CompareSVG className={cn(s.icon, s.compare)} />
								<CompareRemoveSVG className={cn(s.icon_remove, s.compare)} />
							</ButtonWithTooltip>
						) : (
							<Button className={s.btn_add_text} type='text' onClick={() => addToCompare(product)}>
								<Text span>+ Add to Compare</Text>
							</Button>
						)}
					</div>
				</div>
			</div>
			{specifications && (
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
			)}
			<RelatedProducts slug={slug} />
		</div>
	)
}
