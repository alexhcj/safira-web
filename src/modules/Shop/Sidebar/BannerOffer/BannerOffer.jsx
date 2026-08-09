import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useBannerOffer } from '@hooks/services/useBannerOffer'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { BannerImageSkeleton } from '@shared/components/UI/Skeletons/BannerImageSkeleton/BannerImageSkeleton'

import { enumToCamelCase, enumToStr, titleCase, enumToDashStr } from '@utils/string'

import s from './banner-offer.module.scss'

export const BannerOffer = ({ type, imgSize, className }) => {
	const navigate = useNavigate()
	const { offer, isLoading, error } = useBannerOffer(type)

	if (isLoading) {
		return (
			<button className={cn(s.link, s.skeleton, isLoading && s.loading, className)} type='button' disabled>
				<BannerImageSkeleton />
			</button>
		)
	}

	if (error || !offer) {
		return (
			<button className={cn(s.link, (error || !offer) && s.error, className)} type='button' disabled>
				<ImageWithFallback className={s.img} imgSize={imgSize} alt='' forceDefault />
			</button>
		)
	}

	const handleClick = (e) => {
		e.preventDefault()

		const { page, categoryType, categoryValue } = offer.link

		const query = `${enumToCamelCase(categoryType)}=${enumToDashStr(categoryValue)}&${
			import.meta.env.VITE_SHOP_DEFAULT_QUERY
		}`
		navigate(`/${page}?${new URLSearchParams(query)}`, {
			state: JSON.stringify({ [enumToCamelCase(categoryType)]: `${titleCase(enumToStr(categoryValue))}` }),
		})
	}

	const { type: offerType, description } = offer
	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/offers/${offerType.toLowerCase()}`

	return (
		<button className={cn(s.link, className)} type='button' onClick={handleClick}>
			<ImageWithFallback
				className={s.img}
				src={img}
				imgSize={imgSize}
				alt={description}
				skeleton={<BannerImageSkeleton />}
			/>
		</button>
	)
}
