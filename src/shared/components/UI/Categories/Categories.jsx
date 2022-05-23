import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as ArrowSVG } from '../../../../assets/svg/arrow.svg'
import { generateID } from '../../../../utils/IdGenerator'
import s from './categories.module.scss'

const categories =  [
	{
		id: generateID(),
		category: 'vegetables'
	},
	{
		id: generateID(),
		category: 'fruits'
	},
	{
		id: generateID(),
		category: 'salads'
	},
	{
		id: generateID(),
		category: 'fish & seafood'
	},
	{
		id: generateID(),
		category: 'fresh meat'
	},
	{
		id: generateID(),
		category: 'milk products'
	},
	{
		id: generateID(),
		category: 'bread'
	},
	{
		id: generateID(),
		category: 'frozen food'
	}
]

export const Categories = () => {
	const [popupToggle, setPopupToggle] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		document.addEventListener('keydown', escKeyHandler)
		document.addEventListener('click', clickOutsideHandler)

		return () => {
			document.removeEventListener('keydown', escKeyHandler)
			document.removeEventListener('click', clickOutsideHandler)
		}
	}, [])

	const escKeyHandler = (e) => {
		if (e.key === 'Escape') {
			setPopupToggle(false)
		}
	}

	const toggleHandler = () => {
		setPopupToggle(!popupToggle)
	}

	const clickOutsideHandler = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			setPopupToggle(false)
		}
	}

	return (
		<div role="presentation" className={s.categories} onClick={(e) => toggleHandler(e)} ref={ref}>
			<div className={s.burger}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			All categories
			<ArrowSVG className={s.svg} />
			<nav className={`${s.popup} ${popupToggle ? `${s.active}` : ''} `}>
				{categories.map((link) => {
					const { id, category } = link

					return (
						<NavLink className={s.link} to='/' key={id}>
							{category}
						</NavLink>
					)
				})}
			</nav>
		</div>
	)
}

// NOTE: categories and sub categories should route to shop with selected params
// TODO: if category has sub categories => add [subcats]
