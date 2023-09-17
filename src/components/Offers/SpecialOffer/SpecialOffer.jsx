import React from 'react'
import { NavLink } from 'react-router-dom'
import Img from '../../../assets/images/special-offer/366x484.jpg'
import s from './special-offer.module.scss'

const offer = {
	id: 1,
	text: 'Summer sale 50% off fruits',
	img: Img,
}

export const SpecialOffer = () => {
	return (
		<div className={s.block}>
			<NavLink to='/shop' className={s.link}>
				<img src={offer.img} alt={offer.text} />
			</NavLink>
		</div>
	)
}
