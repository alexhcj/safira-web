import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowSVG } from '../../svg'
import s from './categories.module.css'

const categories = [
	{ id: 1, category: 'vegetables' },
	{ id: 2, category: 'fruits' },
	{ id: 3, category: 'salads' },
	{ id: 4, category: 'fish & seafood' },
	{ id: 5, category: 'fresh meat' },
	{ id: 6, category: 'milk products' },
	{ id: 7, category: 'bread' },
	{ id: 8, category: 'frozen food' },
]

export const Categories = () => {
	const [popupToggle, setPopupToggle] = useState(false)

	return (
		<div className={s.categories} onClick={() => setPopupToggle(!popupToggle)}>
			<div className={s.burger}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			All categories
			<ArrowSVG width={16} height={16} />
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

// TODO: look for best practices mongodb file structure
// IDEA: how to pull categories data? is it indeed? how to handle sub categories? where links should route to?
