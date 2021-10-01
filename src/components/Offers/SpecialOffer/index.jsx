import s from './specialoffer.module.css'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { specialofferAPI } from '../../../api/'
import { ImageWithFallback } from '../../../utils/components'

export const SpecialOffer = () => {
	const [specialoffer, setSpecialoffer] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await specialofferAPI.getSpecialoffer()
				setSpecialoffer(data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

	return (
		<div className={s.block}>
			{specialoffer.map((offer) => {
				const { id, img } = offer

				return (
					<NavLink to='/shop' key={id}>
						<ImageWithFallback
							className={s.img}
							src={img}
							imgSize='specialoffer'
							alt='Summer sale 50% off fruits'
						/>
					</NavLink>
				)
			})}
		</div>
	)
}
