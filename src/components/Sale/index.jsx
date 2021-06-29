import s from './sale.module.css'
import { useEffect, useState } from 'react'
import { saleAPI } from '../../api'
import { Button } from '../Button'

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

	console.log(sale)

	let { title, img, saleInfo, description } = sale[0]

	return (
		<>
			{!sale ? (
				<div>Loading...</div>
			) : (
				<div className={s.section}>
					<img className={s.img} src={img} alt={title} />
					<div className='container'>
						<div className={s.block}>
							<h3 className={s.title}>{title}</h3>
							<h2 className={s.sale__info}>{saleInfo}</h2>
							<h4 className={s.decription}>{description}</h4>
							<Button to='/shop' text='Discover now' />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
