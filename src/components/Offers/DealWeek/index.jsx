import { useEffect, useState } from 'react'
import { dealweekAPI } from '../../../api/'
import { Tags, PrimaryBtn } from '../../UI'
import { Timer } from '../Timer'
import s from './dealweek.module.css'

export const DealWeek = () => {
	const [deal, setDeal] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await dealweekAPI.getDeal()
				setDeal(data)
			} catch (e) {
				console.log(e)
			}
		}
        
		fetchData()
	}, [])

	return (
		<div className={s.block}>
			<h3 className={s.heading}>Deals Of The Week</h3>

			{deal.map((theDeal) => {
				let { id, name, price, newprice, img, category, tags, time } = theDeal
				return (
					<div key={id} className={s.wrapper}>
						<Tags tags={tags} />
						<div className={s.content}>
							<img className={s.img} src={img} alt='' />
							<h2 className={s.name}>{name}</h2>
							<h3 className={s.category}>{category}</h3>
							<p className={s.newprice}>
								{newprice}
								<span className={s.price}>{price}</span>
							</p>
							<Timer time={time} />
							<PrimaryBtn text='add to cart' />
						</div>
					</div>
				)
			})}
		</div>
	)
}
