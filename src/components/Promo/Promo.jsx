import { useNavigate } from 'react-router-dom'

import { useBannerOffer } from '@hooks/services/useBannerOffer'
import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'
import { ImageWithFallback } from '@utils/ImageWithFallback'
import { enumToCamelCase, enumToCapitalizedString, enumToDashString } from '@utils/index'

import s from './promo.module.scss'

export const Promo = () => {
	const navigate = useNavigate()
	const { offer, loading } = useBannerOffer('promo')

	const handleClick = (e) => {
		e.preventDefault()

		const { page, categoryType, categoryValue } = offer.link

		const query = `${enumToCamelCase(categoryType)}=${enumToDashString(categoryValue)}&${
			process.env.REACT_APP_SHOP_DEFAULT_QUERY
		}`
		navigate(`/${page}?${new URLSearchParams(query)}`, {
			state: JSON.stringify({ [enumToCamelCase(categoryType)]: `${enumToCapitalizedString(categoryValue)}` }),
		})
	}

	const renderPromo = () => {
		const { type, title, upTitle, text } = offer
		const img = `${process.env.REACT_APP_API_PUBLIC_URL}/images/offers/${type.toLowerCase()}`

		return (
			<div className={s.section}>
				<ImageWithFallback className={s.img} src={img} imgSize='promo' alt={text} />
				<div className='container'>
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

	return (
		<>
			{loading && <Preloader />}
			{!loading && offer && renderPromo()}
		</>
	)
}
