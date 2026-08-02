import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useOfferLinks } from '@hooks/services/useOfferLinks'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { OfferLinksSkeleton } from '@shared/components/UI/Skeletons/OfferLinksSkeleton/OfferLinksSkeleton'

import { enumToCamelCase, enumToStr, titleCase, enumToDashStr, strToSlug } from '@utils/string'

import s from './offer-links.module.scss'

export const OfferLinks = ({ className }) => {
	const navigate = useNavigate()
	const { links, isLoading, error } = useOfferLinks('offer-link')

	if (isLoading) {
		return (
			<div className='container'>
				<button className={cn(s.block, isLoading && s.loading, className)} type='button' disabled>
					<button type='button' className={s.offer}>
						<OfferLinksSkeleton />
					</button>
					<button type='button' className={s.offer}>
						<OfferLinksSkeleton />
					</button>
				</button>
			</div>
		)
	}

	if (error || links.length === 0) {
		return (
			<div className='container'>
				<button className={cn(s.block, (error || links.length === 0) && s.error, className)} type='button' disabled>
					<button type='button' className={s.offer}>
						<ImageWithFallback imgSize='offer-link' alt='' forceDefault />
					</button>
					<button type='button' className={s.offer}>
						<ImageWithFallback imgSize='offer-link' alt='' forceDefault />
					</button>
				</button>
			</div>
		)
	}

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
