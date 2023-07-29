import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../shared/components/UI/Text/Text'
import PromoImg from '../../assets/images/promo/1920x440.jpg'
import s from './promo.module.scss'

const promo = [
	{
		id: 1,
		title: 'Black Friday !',
		promoInfo: 'Sale 50% OFF',
		description: 'all vegetable products',
		img: PromoImg,
	},
]

// TODO: refactor to Banners
export const Promo = () => {
	const navigate = useNavigate()
	const { title, img, promoInfo, description } = promo[0]

	const handleClick = (e) => {
		e.preventDefault()
		navigate('/shop', { replace: true })
	}

	return (
		<div className={s.section}>
			<img className={s.img} src={img} alt={`${promoInfo} ${description}`} />
			<div className='container'>
				<div className={s.block}>
					<h4 className={s.title}>{title}</h4>
					<h2 className={s.promo__info}>{promoInfo}</h2>
					<p className={s.description}>{description}</p>
					<Button className={s.btn} onClick={handleClick}>
						<Text className={s.text} span color='white'>
							Discover now
						</Text>
					</Button>
				</div>
			</div>
		</div>
	)
}
