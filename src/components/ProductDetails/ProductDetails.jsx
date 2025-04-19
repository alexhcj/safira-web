import { useEffect, useState } from 'react'

import cn from 'classnames'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

import { productsAPI } from '@api/products'

import { useCartContext } from '@context/CartContext'
import { useCompareContext } from '@context/CompareContext'
import { useWishlistContext } from '@context/WishlistContext'

import { GoodToCart } from '@shared/components/GoodToCart/GoodToCart'
import { Price } from '@shared/components/Price/Price'
import { Rating } from '@shared/components/Rating/Rating'
import { NewReview } from '@shared/components/Reviews/NewReview/NewReview'
import { Reviews } from '@shared/components/Reviews/Reviews'
import { Specification } from '@shared/components/Specification/Specification'
import { Tab, Tabs } from '@shared/components/Tabs/Tabs'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { ButtonPopover } from '@shared/components/UI/Buttons/ButtonPopover/ButtonPopover'
import { DietaryTags } from '@shared/components/UI/DietaryTags/DietaryTags'
import { Border } from '@shared/components/UI/Spacing/Border'
import { Space } from '@shared/components/UI/Spacing/Space'
import { Text } from '@shared/components/UI/Text/Text'

import { ImageWithFallback } from '@utils/ImageWithFallback'
import { slugToString } from '@utils/index'

import { RelatedProducts } from '../RelatedProducts/RelatedProducts'

import CompareRemoveSVG from '@assets/svg/compare-remove.svg?react'
import CompareSVG from '@assets/svg/compare.svg?react'
import HeartBrokenSVG from '@assets/svg/heart-broken.svg?react'
import HeartSVG from '@assets/svg/heart.svg?react'
import PreloaderSVG from '@assets/svg/preloader.svg?react'

import s from './productdetails.module.scss'

export const ProductDetails = () => {
	const navigate = useNavigate()
	const { addToWishlist, removeFromWishlist, isProductInWishlist } = useWishlistContext()
	const { addToCart, productQuantityInCart } = useCartContext()
	const { addToCompare, isProductInCompare, removeItemFromCompare } = useCompareContext()
	const { slug } = useParams()
	const [product, setProduct] = useState({})
	const [isPopoverHovered, setIsPopoverHovered] = useState(false)

	useEffect(() => {
		// TODO: check is this solution valid
		window.scrollTo({ top: 0 })
		const fetchData = async () => {
			try {
				const { product } = await productsAPI.findOne(slug)

				if (!product) {
					navigate('/not-found')
				}

				setProduct(product)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	}, [navigate, slug])

	const { name, price, description, basicCategory, rating, tags, specifications, reviews } = product

	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`

	const handlePopover = () => {
		setIsPopoverHovered(!isPopoverHovered)
	}
	return (
		<div className='container'>
			<div className={s.product}>
				<div className={s.img}>
					{img ? (
						<ImageWithFallback className={s.product_img} src={img} imgSize='xl' alt={name} />
					) : (
						<img src={PreloaderSVG} alt='Preloader' />
					)}
				</div>
				<div className={s.content}>
					<h4 className={s.name}>{name}</h4>
					<Space size='ss' />
					<Rating rating={rating} />
					{/* dietaries */}
					<Space size='xss' />
					{price && <Price className={s.price} {...price} type='large' />}
					<Space size='xs' />
					{tags && <DietaryTags className={s.dietaries} tags={tags.dietaries} />}
					<Space size='xs' />
					<Text>{description}</Text>
					<Space size='m' />
					<Border />
					<Space size='m' />
					{specifications && (
						<GoodToCart
							maxQuantity={specifications.quantity}
							onClick={addToCart}
							product={product}
							productQuantityInCart={productQuantityInCart(slug)}
						/>
					)}
					<Space size='s' />
					<div className={s.actions}>
						{isProductInWishlist(slug) ? (
							<ButtonPopover
								className={s.btn}
								onClick={removeFromWishlist}
								onMouseEnter={handlePopover}
								onMouseLeave={handlePopover}
								text='Remove from wishlist'
							>
								<HeartSVG className={s.icon} />
								<HeartBrokenSVG className={s.icon_remove} />
							</ButtonPopover>
						) : (
							<Button type='text' onClick={() => addToWishlist(product)}>
								{/* TODO: Hover on icon => popup (remove from wishlist) */}
								<Text span>+ Add to WishList</Text>
							</Button>
						)}
						{isProductInCompare(slug, basicCategory) ? (
							<ButtonPopover
								className={s.btn}
								onClick={() => removeItemFromCompare(slug, basicCategory)}
								onMouseEnter={handlePopover}
								onMouseLeave={handlePopover}
								text='Remove from compare'
							>
								<CompareSVG className={cn(s.icon, s.compare)} />
								<CompareRemoveSVG className={cn(s.icon_remove, s.compare)} />
							</ButtonPopover>
						) : (
							<Button type='text' onClick={() => addToCompare(product)}>
								{/* TODO: Hover on icon => popup (remove from compare) */}
								<Text span>+ Add to Compare</Text>
							</Button>
						)}
					</div>
					<Space size='m' />
					<div className={s.category}>
						<Text span weight='medium'>
							Category:
						</Text>
						<NavLink to={`/shop?basicCategory=${basicCategory}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`}>
							<Text className={s.tag} span>
								{basicCategory && slugToString(basicCategory)}
							</Text>
						</NavLink>
					</div>
				</div>
			</div>
			<Space size='l' />
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
			<Space space={65} />
		</div>
	)
}
