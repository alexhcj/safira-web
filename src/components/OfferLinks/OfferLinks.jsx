import { useNavigate } from 'react-router-dom'

import { useOfferLinks } from '@hooks/services/useOfferLinks'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { OfferLinksSkeleton } from '@shared/components/UI/Skeletons/OfferLinksSkeleton/OfferLinksSkeleton'

import { enumToCamelCase, enumToStr, titleCase, enumToDashStr, strToSlug } from '@utils/string'

import s from './offer-links.module.scss'

export const OfferLinks = () => {
	const { links } = useOfferLinks('offer-link')
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
				{links.map(({ img, title, link }) => {
					const offerUrl = `${import.meta.env.VITE_API_PUBLIC_URL}/images/offers/offer-links/${img}`

					return (
						<li key={strToSlug(title)} onClick={() => handleOfferClick(link)}>
							<button type='button' className={s.offer}>
								<ImageWithFallback
									onlySrc
									imgSize='offer-link'
									src={offerUrl}
									alt={title}
									skeleton={<OfferLinksSkeleton />}
								/>
							</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
