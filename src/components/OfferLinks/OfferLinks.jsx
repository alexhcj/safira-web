import { useNavigate } from 'react-router-dom'

import { useOfferLinks } from '@hooks/services/useOfferLinks'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'

import { enumToCamelCase, enumToStr, titleCase, enumToDashStr, strToSlug } from '@utils/string'

import s from './offer-links.module.scss'

export const OfferLinks = () => {
	const { links, loading } = useOfferLinks('offer-link')
	const navigate = useNavigate()

	const handleOfferClick = ({ page, categoryType, categoryValue }) => {
		const query = `${enumToCamelCase(categoryType)}=${enumToDashStr(categoryValue)}&${
			import.meta.env.VITE_SHOP_DEFAULT_QUERY
		}`
		navigate(`/${page}?${new URLSearchParams(query)}`, {
			state: JSON.stringify({ [enumToCamelCase(categoryType)]: `${titleCase(enumToStr(categoryValue))}` }),
		})
	}

	return (
		<div className='container'>
			<ul className={s.block}>
				{loading && <Preloader width={35} height={35} />}
				{!loading &&
					links &&
					links.map(({ img, title, link }) => {
						const offerUrl = `${import.meta.env.VITE_API_PUBLIC_URL}/images/offers/offer-links/${img}`

						return (
							<li key={strToSlug(title)} onClick={(e) => handleOfferClick(link)}>
								<button type='button' className={s.offer}>
									<ImageWithFallback onlySrc imgSize='offer-link' src={offerUrl} alt={title} className={s.img} />
								</button>
							</li>
						)
					})}
			</ul>
		</div>
	)
}
