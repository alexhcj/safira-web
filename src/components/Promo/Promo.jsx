import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useBannerOffer } from '@hooks/services/useBannerOffer'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { PromoSkeleton } from '@shared/components/UI/Skeletons/PromoSkeleton/PromoSkeleton'
import { Text } from '@shared/components/UI/Text/Text'

import { enumToCamelCase, enumToStr, titleCase, enumToDashStr } from '@utils/string'

import s from './promo.module.scss'

export const Promo = ({ className }) => {
	const navigate = useNavigate()
	const { offer, isLoading, error } = useBannerOffer('promo')

	if (isLoading) {
		return (
			<section className={cn(s.section, className)}>
				<PromoSkeleton />
			</section>
		)
	}

	if (error || !offer) {
		return (
			<section className={cn(s.section, className)}>
				<ImageWithFallback className={s.img} imgSize='promo' alt='' forceDefault />
			</section>
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

	const { type, title, upTitle, text } = offer
	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/offers/${type.toLowerCase()}`

	return (
		<div className={s.section}>
			<ImageWithFallback className={s.img} src={img} imgSize='promo' alt={text} skeleton={<PromoSkeleton />} />
			<div className={cn('container', s.container)}>
				<div className={s.block}>
					<h4 className={s.upTitle}>{upTitle}</h4>
					<h2 className={s.title}>{title}</h2>
					<p className={s.text}>{text}</p>
					<Button className={s.btn} onClick={handleClick}>
						<Text className={s.btn_text} span color='white'>
							Discover now
						</Text>
					</Button>
				</div>
			</div>
		</div>
	)
}
