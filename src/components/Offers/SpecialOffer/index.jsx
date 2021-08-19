import s from './specialoffer.module.css'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { specialofferAPI } from '../../../api/'

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
						<img className={s.img} src={img} alt='special offer' />
					</NavLink>
				)
			})}
		</div>
	)
}
