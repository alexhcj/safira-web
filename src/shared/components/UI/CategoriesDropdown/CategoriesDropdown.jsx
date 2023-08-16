import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { SubNav } from './SubNav/SubNav'
import { ReactComponent as ArrowSVG } from '../../../../assets/svg/arrow.svg'
import s from './categories-dropdown.module.scss'

const categories = [
	{
		name: 'Fruits & vegetables',
		category: 'fruits-vegetables',
		subcategories: {
			category: 'fruits-vegetables',
			items: [
				{
					name: 'Fruits',
					category: 'fruits',
					categories: [
						{ name: 'Tropical Fruits', subCategory: 'tropical-fruits' },
						{ name: 'Apples & Pears', subCategory: 'apples-pears' },
						{ name: 'Citrus Fruits', subCategory: 'citrus-fruits' },
					],
				},
				{
					name: 'Vegetables',
					category: 'vegetables',
					categories: [
						{ name: 'Stone fruits', subCategory: 'stone-fruits' },
						{ name: 'Tomatoes', subCategory: 'tomatoes' },
						{ name: 'Cabbages & Lettuces', subCategory: 'cabbages-lettuces' },
						{ name: 'Broccoli & Cauliflowers', subCategory: 'broccoli-cauliflowers' },
						{ name: 'Garlic, Ginger & Onions', subCategory: 'garlic-ginger-onions' },
						{ name: 'Beans & Peas', subCategory: 'beans-peas' },
						{ name: 'Brinjals & Gourds', subCategory: 'brinjals-gourds' },
						{ name: 'Cucumbers & Lady Fingers', subCategory: 'cucumbers-lady-fingers' },
						{ name: 'Potatoes & Roots', subCategory: 'potatoes-roots' },
						{ name: 'Corns', subCategory: 'corns' },
						{ name: 'Frozen vegetables', subCategory: 'frozen-vegetables' },
					],
				},
			],
		},
	},
	{
		name: 'Drinks',
		category: 'drinks',
	},
	{
		name: 'Rice, noodles & cooking ingridients',
		category: 'rice-noodles-cooking-ingridients',
		subcategories: {
			category: 'rice-noodles-cooking-ingridients',
			items: [
				{
					name: 'Dried food',
					category: 'dried-food',
					categories: [{ name: 'Beans, Seeds & Nuts', subCategory: 'beans-seeds-nuts' }],
				},
			],
		},
	},
	{
		name: 'Food cupboard',
		category: 'food-cupboard',
		subcategories: {
			category: 'food-cupboard',
			items: [
				{
					name: 'Canned food',
					category: 'canned-food',
					categories: [{ name: 'Canned Vegetables', subCategory: 'canned-vegetables' }],
				},
			],
		},
	},
	{
		name: 'Fish & seafood',
		category: 'fish-seafood',
	},
	{
		name: 'Dairy, chilled & eggs',
		category: 'dairy-chilled-eggs',
	},
	{
		name: 'Beer, wine & spirits',
		category: 'beer-wine-spirits',
	},
	{
		name: 'Bakery',
		category: 'bakery',
	},
	{
		name: 'Frozen',
		category: 'frozen',
	},
	{
		name: 'Meat & poultry',
		category: 'meat-poultry',
	},
]

export const CategoriesDropdown = () => {
	const [popupToggle, setPopupToggle] = useState(false)
	const [subNavToggleCategory, setSubNavToggleCategory] = useState(null)
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

	const toggleHandler = () => {
		setPopupToggle(!popupToggle)
	}

	const clickOutsideHandler = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			setPopupToggle(false)
		}
	}

	const handleNavSubToggle = (e, category) => {
		if (e.type === 'mouseenter') {
			setSubNavToggleCategory(category)
		} else {
			setSubNavToggleCategory(null)
		}
	}

	const onClickHandler = (e) => {
		const category = e.target.id
		const name = e.target.dataset.name

		const query = {
			category,
			limit: '6',
			offset: '0',
			sort: 'popularity',
			order: 'desc',
		}
		navigate(`/shop?${new URLSearchParams(query)}`, { state: { category: name } })
	}

	return (
		<div className={s.categories} role='presentation' onClick={toggleHandler} ref={ref}>
			<div className={s.burger}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			All categories
			<ArrowSVG className={s.svg} />
			<nav className={cn(s.popup, popupToggle && s.active)}>
				{categories
					.sort((a, b) => (b.name[0] < a.name[0] ? 1 : -1))
					.map(({ name, category, subcategories }) => {
						return (
							<ul
								className={s.category_item}
								key={category}
								onMouseEnter={(e) => handleNavSubToggle(e, category)}
								onMouseLeave={(e) => handleNavSubToggle(e, category)}
								onClick={onClickHandler}
							>
								<li className={s.link} id={category} data-name={name}>
									{name}
									{subcategories && <ArrowSVG className={s.svg_subcategories} />}
								</li>
								{subcategories && (
									<SubNav
										subNavToggleCategory={subNavToggleCategory}
										subcategories={subcategories}
										setPopupToggle={setPopupToggle}
									/>
								)}
							</ul>
						)
					})}
			</nav>
		</div>
	)
}
