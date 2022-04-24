import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { dealweekAPI } from '../../../api/'
import { ImageWithFallback } from '../../../utils/ImageWithFallback'
import { Tags } from '../../UI'
import { Timer } from '../Timer'
import s from './dealweek.module.css'
import {Button} from "../../UI/Buttons/Button/Button";

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

			{deal.map((deal) => {
				const { id, name, price, newprice, img, category, tags, time } = deal

				const url = {
					pathname: `/product/${id}`,
					state: {
						name: name,
						category: category,
					},
				}

				return (
					<div key={id} className={s.wrapper}>
						<Tags tags={tags} />
						<div className={s.content}>
							<NavLink to={url}>
								<ImageWithFallback className={s.img} src={img} imgSize='lg' />
							</NavLink>
							<h2 className={s.name}>{name}</h2>
							<h3 className={s.category}>{category}</h3>
							<p className={s.newprice}>
								${newprice}
								<span className={s.price}>${price}</span>
							</p>
							<Timer time={time} />
							<Button text='add to cart' />
						</div>
					</div>
				)
			})}
		</div>
	)
}
