import s from './sale.module.css'
import { useEffect, useState } from 'react'
import { saleAPI } from '../../api'
import { Preloader, PrimaryBtn } from '../UI'
import { ImageWithFallback } from '../../utils/ImageWithFallback'

export const Sale = () => {
	const [sale, setSale] = useState([''])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			try {
				const data = await saleAPI.getSale()
				setSale(data)
			} catch (e) {
				console.log(e)
			}

			setIsLoading(false)
		}

		fetchData()
	}, [])

	const { title, img, saleInfo, description } = sale[0]

	return isLoading ? (
		<Preloader />
	) : (
		<div className={s.section}>
			<ImageWithFallback className={s.img} src={img} imgSize='sale' alt={`${saleInfo} ${description}`} />
			<div className='container'>
				<div className={s.block}>
					<h4 className={s.title}>{title}</h4>
					<h2 className={s.sale__info}>{saleInfo}</h2>
					<p className={s.decription}>{description}</p>
					<PrimaryBtn to='/shop' text='Discover now' />
				</div>
			</div>
		</div>
	)
}
