import React from 'react'
import { NavLink } from 'react-router-dom'
import Link1 from '../../assets/images/offer-links/fresh-vegetables/590x140.jpg'
import Link2 from '../../assets/images/offer-links/natural-fresh-fruits/590x140.jpg'
import { generateID } from '../../utils/IdGenerator'
import s from './offer-links.module.scss'

const links = [
	{
		id: generateID(),
		img: Link1,
		text: 'Fresh vegetables'
	},
	{
		id: generateID(),
		img: Link2,
		text: 'Natural fresh fruits'
	}
]

export const OfferLinks = () => {
	return (
		<div className='container'>
			<div className={s.block}>
				{links.map(({ id, img, text }) => {
					return (
						<NavLink to='/shop' key={id}>
							<img className={s.img} src={img} alt={text} />
						</NavLink>
					)
				})}
			</div>
		</div>
	)
}
