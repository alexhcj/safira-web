import React from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { ImageWithFallback } from '../../../../utils/ImageWithFallback'
import { useBannerOffer } from '../../../../hooks/services/useBannerOffer'
import { Preloader } from '../../../../shared/components/common/Preloader/Preloader'
import { enumToCamelCase, enumToCapitalizedString, enumToDashString } from '../../../../utils'
import s from './banner-offer.module.scss'

export const BannerOffer = ({ imgSize, className }) => {
	const navigate = useNavigate()
	const {
		offer: { type, description, link },
		loading,
	} = useBannerOffer(imgSize)

	const img = !loading && type && `${process.env.REACT_APP_API_PUBLIC_URL}/images/offers/${type.toLowerCase()}`

	const handleClick = (e) => {
		e.preventDefault()

		const { page, categoryType, categoryValue } = link

		const query = `${enumToCamelCase(categoryType)}=${enumToDashString(categoryValue)}&${
			process.env.REACT_APP_SHOP_DEFULT_QUERY
		}`
		navigate(`/${page}?${new URLSearchParams(query)}`, {
			state: JSON.stringify({ [enumToCamelCase(categoryType)]: `${enumToCapitalizedString(categoryValue)}` }),
		})
	}

	return (
		<>
			{loading ? (
				<Preloader />
			) : (
				<button className={cn(s.link, className)} type='button' onClick={handleClick}>
					<ImageWithFallback src={img} imgSize={imgSize} alt={description} />
				</button>
			)}
		</>
	)
}
