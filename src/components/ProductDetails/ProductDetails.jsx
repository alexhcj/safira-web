import { useEffect, useState } from 'react'

import cn from 'classnames'
import { NavLink, useParams } from 'react-router-dom'

import { useCartContext } from '@context/CartContext'
import { useCompareContext } from '@context/CompareContext'
import { useWishlistContext } from '@context/WishlistContext'

import { useProductsNew } from '@hooks/services/useProductsNew'

import { CoreSpecifications } from '@components/ProductSpecifications/CoreSpecifications/CoreSpecifications'
import { NutritionalDataSpecifications } from '@components/ProductSpecifications/NutritionalDataSpecifications/NutritionalDataSpecifications'
import { ShippingAndPackaging } from '@components/ProductSpecifications/ShippingAndPackaging/ShippingAndPackaging'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { GoodToCart } from '@shared/components/GoodToCart/GoodToCart'
import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { Price } from '@shared/components/Price/Price'
import { Rating } from '@shared/components/Rating/Rating'
import { NewReview } from '@shared/components/Reviews/NewReview/NewReview'
import { Reviews } from '@shared/components/Reviews/Reviews'
import { Tab, Tabs } from '@shared/components/Tabs/Tabs'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { ButtonWithTooltip } from '@shared/components/UI/Buttons/ButtonWithTooltip/ButtonWithTooltip'
import { DietaryTags } from '@shared/components/UI/DietaryTags/DietaryTags'
import { ProductInStock } from '@shared/components/UI/ProductInStock/ProductInStock'
import { ProductSkeleton } from '@shared/components/UI/Skeletons/ProductSkeleton/ProductSkeleton'
import { ReviewsSkeleton } from '@shared/components/UI/Skeletons/ReviewsSkeleton/ReviewsSkeleton'
import { SpecificationsSkeleton } from '@shared/components/UI/Skeletons/SpecificationsSkeleton/SpecificationsSkeleton'
import { Border } from '@shared/components/UI/Spacing/Border'
import { Text } from '@shared/components/UI/Text/Text'
import { findMicronutrient, NUTRIENT_NAME } from '@shared/data/nutrientnames'
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
		excerpt,
		primeCategory,
		subCategory,
		basicCategory,
		rating,
		tags,
		specifications = {},
		reviews,
		inventory,
		shippingDetails,
		packaging,
	} = product ?? {}

	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`

	const linkState = JSON.stringify({ primeCategory, subCategory, basicCategory })

	const micronutrients = specifications.nutritionalData?.micronutrients ?? []

	const nutritionalValues = {
		energy: { amount: specifications.nutritionalData?.energyKcal, unit: 'kcal' },
		protein: { amount: specifications.nutritionalData?.protein, unit: 'g' },
		totalFat: { amount: specifications.nutritionalData?.fat?.total, unit: 'g' },
		saturatedFat: { amount: specifications.nutritionalData?.fat?.saturated, unit: 'g' },
		monounsaturatedFat: { amount: specifications.nutritionalData?.fat?.mono, unit: 'g' },
		polyunsaturatedFat: { amount: specifications.nutritionalData?.fat?.poly, unit: 'g' },
		transFat: { amount: specifications.nutritionalData?.fat?.trans, unit: 'g' },
		cholesterol: { amount: specifications.nutritionalData?.cholesterol, unit: 'mg' },
		carbohydrate: { amount: specifications.nutritionalData?.carbohydrate?.total, unit: 'g' },
		sugars: { amount: specifications.nutritionalData?.carbohydrate?.sugars, unit: 'g' },
		dietaryFibre: { amount: specifications.nutritionalData?.carbohydrate?.fibre, unit: 'g' },
		sodium: { amount: specifications.nutritionalData?.sodium, unit: 'mg' },

		// Micronutrients: name-matched, unit comes from the entry itself (not
		// assumed), and a missing entry safely resolves to `undefined` instead
		// of throwing.
		linoleicAcid: findMicronutrient(micronutrients, NUTRIENT_NAME.LINOLEIC_ACID),
		omega6: findMicronutrient(micronutrients, NUTRIENT_NAME.OMEGA_6),
		alphaLinoleinicAcid: findMicronutrient(micronutrients, NUTRIENT_NAME.ALPHA_LINOLENIC_ACID),
		epaAndDha: findMicronutrient(micronutrients, NUTRIENT_NAME.EPA_AND_DHA),
		omega3: findMicronutrient(micronutrients, NUTRIENT_NAME.OMEGA_3),
		vitaminE: findMicronutrient(micronutrients, NUTRIENT_NAME.VITAMIN_E),
		vitaminA: findMicronutrient(micronutrients, NUTRIENT_NAME.VITAMIN_A),
		vitaminC: findMicronutrient(micronutrients, NUTRIENT_NAME.VITAMIN_C),
	}

	const servingSize = `${specifications.nutritionalData?.servingSize.value} ${specifications.nutritionalData?.servingSize.unit}`

	return (
		<div className='container'>
			<div className={s.box}>
				<ImageWithFallback className={s.img} src={img} imgSize='xl' alt={name} />
				{!isReady ? (
					<ProductSkeleton />
				) : (
					<div className={s.product}>
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
								<ProductInStock quantity={inventory.stockQuantity} />
							</div>
							{tags && <DietaryTags className={s.dietaries} size='mm' tags={tags.dietaries} />}
						</div>
						<Text className={s.description}>{description ?? excerpt}</Text>
						<Border />
						<GoodToCart
							quantity={inventory.stockQuantity}
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
				<div className={s.specifications}>
					<Tabs className={s.tabs}>
						<Tab id='core-specifications' text='Specifications'>
							{!isReady ? (
								<SpecificationsSkeleton quantity={5} />
							) : (
								<CoreSpecifications
									company={specifications.company}
									producingCountry={specifications.producingCountry}
									ingredients={specifications.ingredients}
									shelfLife={specifications.shelfLife}
									storageInformation={specifications.storageInformation}
									categorySpecs={specifications.categorySpecs}
								/>
							)}
						</Tab>
						{specifications.nutritionalData && (
							<Tab id='nutritional-specifications' text='Nutritional'>
								{!isReady ? (
									<SpecificationsSkeleton quantity={5} />
								) : (
									<NutritionalDataSpecifications values={nutritionalValues} servingSize={servingSize} />
								)}
							</Tab>
						)}
						{(shippingDetails || packaging) && (
							<Tab id='shipping-and-packaging' text='Shipping & Packaging'>
								{!isReady ? (
									<SpecificationsSkeleton quantity={5} />
								) : (
									<ShippingAndPackaging shippingDetails={shippingDetails} packaging={packaging} />
								)}
							</Tab>
						)}
						<Tab id='rev' text={`Reviews (${reviews ? reviews.reviews.length : '0'})`}>
							{!isReady ? (
								<ReviewsSkeleton quantity={3} />
							) : (
								reviews.reviews.length !== 0 && <Reviews reviews={reviews.reviews} />
							)}
							<NewReview />
						</Tab>
					</Tabs>
				</div>
			</div>
			<RelatedProducts slug={slug} />
		</div>
	)
}
