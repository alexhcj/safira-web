import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { productsAPI } from '../../api/products'
import { useWishlistContext } from '../../context/WishlistContext'
import { useCartContext } from '../../context/CartContext'
import { GoodToCart } from '../../shared/components/GoodToCart/GoodToCart'
import { Border } from '../../shared/components/UI/Spacing/Border'
import { Space } from '../../shared/components/UI/Spacing/Space'
import { Text } from '../../shared/components/UI/Text/Text'
import { Rating } from '../../shared/components/Rating/Rating'
import { Price } from '../../shared/components/Price/Price'
import { Tab, Tabs } from '../../shared/components/Tabs/Tabs'
import { Specification } from '../../shared/components/Specification/Specification'
import { ButtonPopover } from '../../shared/components/UI/Buttons/ButtonPopover/ButtonPopover'
import { Reviews } from '../../shared/components/Reviews/Reviews'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { NewReview } from '../../shared/components/Reviews/NewReview/NewReview'
import { ImageWithFallback } from '../../utils/ImageWithFallback'
import { slugToString } from '../../utils'
import PreloaderSVG from '../../assets/svg/preloader.svg'
import { ReactComponent as HeartBrokenSVG } from '../../assets/svg/heart-broken.svg'
import { ReactComponent as HeartSVG } from '../../assets/svg/heart.svg'
import s from './productdetails.module.scss'
import { DietaryTags } from '../../shared/components/UI/DietaryTags/DietaryTags'

export const ProductDetails = () => {
	const { addToWishlist, removeFromWishlist, isProductInWishlist } = useWishlistContext()
	const { addToCart, productQuantityInCart } = useCartContext()
	const { slug } = useParams()
	const [product, setProduct] = useState({})
	const [isPopoverHovered, setIsPopoverHovered] = useState(false)

	useEffect(() => {
		// TODO: check is this solution valid
		window.scrollTo({ top: 0 })
		const fetchData = async () => {
			try {
				const { product } = await productsAPI.findOne(slug)
				setProduct(product)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	}, [slug])

	const { name, price, description, basicCategory, rating, tags, specifications, reviews } = product
	console.log(product)

	const img = `${process.env.REACT_APP_API_PUBLIC_URL}/images/products/${slug}`

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
					{isProductInWishlist(slug) ? (
						<ButtonPopover
							className={s.btn}
							onClick={removeFromWishlist}
							onMouseEnter={handlePopover}
							onMouseLeave={handlePopover}
							text='Remove from wishlist'
						>
							<HeartSVG className={s.heart} />
							<HeartBrokenSVG className={s.heart_broken} />
						</ButtonPopover>
					) : (
						<Button type='text' onClick={() => addToWishlist(product)}>
							{/* TODO: Hover on icon => popup (remove from wishlist) */}
							<Text span>+ Add to WishList</Text>
						</Button>
					)}
					<Space size='m' />
					<div className={s.category}>
						<Text span weight='medium'>
							Category:
						</Text>
						<NavLink to={`/shop?basicCategory=${basicCategory}&${process.env.REACT_APP_SHOP_DEFULT_QUERY}`}>
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
			<Space space={65} />
			{/*<RelatedProducts name={name} id={id} category={category} />*/}
		</div>
	)
}
