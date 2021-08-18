import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { categoriesAPI } from '../../../api'
import { ArrowSVG } from '../../svg'
import s from './categories.module.css'

export const Categories = () => {
	const [categories, setCategories] = useState([])
	const [popupToggle, setPopupToggle] = useState(false)
    const ref = useRef(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await categoriesAPI.getCategories()
				setCategories(data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

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

	const clickHandler = (e) => {
		setPopupToggle(!popupToggle)
		if (e.target.className === s.categories || e.target.parentElement === s.categories) {
		}
	}

	const clickOutsideHandler = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			setPopupToggle(false)
		}
	}

	return (
		<div className={s.categories} onClick={(e) => clickHandler(e)} ref={ref}>
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

// NOTE: categories and subcats should route to shop with selected params
// TODO: if category has subcats => add [subcats]
