import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useBannerOffer } from '../../hooks/services/useBannerOffer'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../shared/components/UI/Text/Text'
import { enumToCamelCase, enumToCapitalizedString, enumToDashString } from '../../utils'
import { ImageWithFallback } from '../../utils/ImageWithFallback'
import s from './promo.module.scss'

export const Promo = () => {
	const navigate = useNavigate()
	const {
		offer: { type, title, upTitle, text, link },
		loading,
	} = useBannerOffer('promo')
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
