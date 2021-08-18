import s from './sale.module.css'
import { useEffect, useState } from 'react'
import { saleAPI } from '../../api'
import { PrimaryBtn } from '../UI'

export const Sale = () => {
	const [sale, setSale] = useState([''])
	// const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			// setIsLoading(true)

			try {
				const data = await saleAPI.getSale()
				setSale(data)
			} catch (e) {
				console.log(e)
			}
			// setIsLoading(false)
		}

		fetchData()
	}, [])

	let { title, img, saleInfo, description } = sale[0]

	return (
		<div className={s.section}>
			<img className={s.img} src={img} alt={title} />
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
