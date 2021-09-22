import { useEffect, useState } from 'react'
import { shopbannerAPI } from '../../../../api'
import s from './banner.module.css'

export const Banner = () => {
	const [banners, setBanners] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await shopbannerAPI.getShopBanner()
				setBanners(data)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	}, [])

	return (
		<section>
			{banners.map((banner) => {
				const { id, img } = banner
				return <img className={s.banner} key={id} src={img} alt='shopbanner' />
			})}
		</section>
	)
}
