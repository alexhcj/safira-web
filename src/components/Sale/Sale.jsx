import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../shared/components/UI/Text/Text'
import { Space } from '../../shared/components/UI/Spacing/Space'
import SaleImg from '../../assets/images/sale/1920x440.jpg'
import s from './sale.module.scss'

const sale = [
	{
		id: 1,
		title: 'Black Friday !',
		saleInfo: 'Sale 50% OFF',
		description: 'all vegetable products',
		img: SaleImg
	}
]

export const Sale = () => {
	const navigate = useNavigate()
	const { title, img, saleInfo, description } = sale[0]

	const handleClick = (e) => {
		e.preventDefault()
		navigate('/shop', { replace: true })
	}


	return (
		<div className={s.section}>
			<img className={s.img} src={img} alt={`${saleInfo} ${description}`} />
			<div className='container'>
				<div className={s.block}>
					<h4 className={s.title}>{title}</h4>
					<h2 className={s.sale__info}>{saleInfo}</h2>
					<p className={s.description}>{description}</p>
					<Button className={s.btn} onClick={handleClick}>
						<Text className={s.text} span color="white">Discover now</Text>
					</Button>
				</div>
			</div>
			<Space space={65} />
		</div>
	)
}
