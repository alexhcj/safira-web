import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useBannerOffer } from '@hooks/services/useBannerOffer'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'

import { enumToCamelCase, enumToStr, titleCase, enumToDashStr } from '@utils/string'

import s from './banner-offer.module.scss'

export const BannerOffer = ({ imgSize, className }) => {
	const navigate = useNavigate()
	const { offer, loading } = useBannerOffer(imgSize)

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

	const renderBanner = () => {
		if (offer) {
			const { type, description } = offer
			const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/offers/${type.toLowerCase()}`

			return (
				<button className={cn(s.link, className)} type='button' onClick={handleClick}>
					<ImageWithFallback className={s.img} src={img} imgSize={imgSize} alt={description} />
				</button>
			)
		}
	}

	return (
		<>
			{loading && <Preloader />}
			{!loading && offer && renderBanner()}
		</>
	)
}
