import React from 'react'
import { NavLink } from 'react-router-dom'
import Link1 from '../../assets/images/offer-links/fresh-vegetables/590x140.jpg'
import Link2 from '../../assets/images/offer-links/natural-fresh-fruits/590x140.jpg'
import { generateID } from '../../utils/IdGenerator'
import s from './offer-links.module.scss'

const links = [
	{
		id: generateID(),
		img: Link1
	},
	{
		id: generateID(),
		img: Link2
	}
]

export const OfferLinks = () => {
	return (
		<>
			<div className='container'>
				<div className={s.block}>
					{links.map(({ id, img }) => {
						return (
							<NavLink className={s.link} to='/shop' key={id}>
								<img src={img} alt="Offer" />
							</NavLink>
						)
					})}
				</div>
			</div>
		</>
	)
}

// TODO: fix jumping content
