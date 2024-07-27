import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { SubNav } from './SubNav/SubNav'
import { categories } from '../../../../modules/Categories/categories-data'
import { ReactComponent as ArrowSVG } from '../../../../assets/svg/arrow.svg'
import s from './categories-dropdown.module.scss'

export const CategoriesDropdown = () => {
	const [popupToggle, setPopupToggle] = useState(false)
	const [toggleNavSubCategory, setToggleNavSubCategory] = useState(null)
	const navigate = useNavigate()
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

	const onCategoriesClickHandler = (e) => {
		if (e.target.id !== 'categories') return
		navigate('/categories')
	}

	const clickOutsideHandler = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			setPopupToggle(false)
		}
	}

	const handleNavSubToggle = (e, category) => {
		if (e.type === 'mouseenter' && popupToggle) {
			setToggleNavSubCategory(category)
		} else {
			setToggleNavSubCategory(null)
		}
	}

	const onClickHandler = (e) => {
		const primeCategory = e.target.id
		const name = e.target.dataset.name

		const query = {
			primeCategory,
			limit: '12',
			offset: '0',
			sort: 'popularity',
			order: 'desc',
		}
		navigate(`/shop?${new URLSearchParams(query)}`, { state: JSON.stringify({ primeCategory: name }) })
		setPopupToggle(false)
	}

	return (
		<div
			className={s.categories}
			role='presentation'
			onMouseEnter={() => setPopupToggle(true)}
			onMouseLeave={() => setPopupToggle(false)}
			onClick={onCategoriesClickHandler}
			ref={ref}
			id='categories'
		>
			<div className={s.burger}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			All categories
			<ArrowSVG className={s.svg} />
			<nav className={cn(s.popup, popupToggle && s.active)}>
				{categories
					.sort((a, b) => (b.name < a.name ? 1 : -1))
					.map(({ name, primeCategory, subCategories }) => {
						return (
							<ul
								className={s.prime_category}
								key={primeCategory}
								onMouseEnter={(e) => handleNavSubToggle(e, primeCategory)}
								onMouseLeave={(e) => handleNavSubToggle(e, primeCategory)}
								onClick={onClickHandler}
							>
								<li className={s.link} id={primeCategory} data-name={name}>
									{name}
									{subCategories && <ArrowSVG className={s.svg_subcategories} />}
								</li>
								{subCategories && (
									<SubNav
										subNavToggleCategory={toggleNavSubCategory}
										subCategories={subCategories}
										setPopupToggle={setPopupToggle}
										primeCategory={primeCategory}
									/>
								)}
							</ul>
						)
					})}
			</nav>
		</div>
	)
}
