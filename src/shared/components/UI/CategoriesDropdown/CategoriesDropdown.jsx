import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { SubNav } from './SubNav/SubNav'
import { ReactComponent as ArrowSVG } from '../../../../assets/svg/arrow.svg'
import s from './categories-dropdown.module.scss'

const categories = [
	{
		name: 'Fruits & vegetables',
		primeCategory: 'fruits-vegetables',
		subCategories: {
			parentCategory: 'fruits-vegetables',
			items: [
				{
					name: 'Fruits',
					subCategory: 'fruits',
					basicCategories: [
						{ name: 'Tropical Fruits', basicCategory: 'tropical-fruits' },
						{ name: 'Apples & Pears', basicCategory: 'apples-pears' },
						{ name: 'Citrus Fruits', basicCategory: 'citrus-fruits' },
					],
				},
				{
					name: 'Vegetables',
					subCategory: 'vegetables',
					basicCategories: [
						{ name: 'Stone fruits', basicCategory: 'stone-fruits' },
						{ name: 'Tomatoes', basicCategory: 'tomatoes' },
						{ name: 'Cabbages & Lettuces', basicCategory: 'cabbages-lettuces' },
						{ name: 'Broccoli & Cauliflowers', basicCategory: 'broccoli-cauliflowers' },
						{ name: 'Garlic, Ginger & Onions', basicCategory: 'garlic-ginger-onions' },
						{ name: 'Beans & Peas', basicCategory: 'beans-peas' },
						{ name: 'Brinjals & Gourds', basicCategory: 'brinjals-gourds' },
						{ name: 'Cucumbers & Lady Fingers', basicCategory: 'cucumbers-lady-fingers' },
						{ name: 'Potatoes & Roots', basicCategory: 'potatoes-roots' },
						{ name: 'Corns', basicCategory: 'corns' },
						{ name: 'Frozen vegetables', basicCategory: 'frozen-vegetables' },
					],
				},
			],
		},
	},
	{
		name: 'Drinks',
		primeCategory: 'drinks',
		subCategories: {
			parentCategory: 'drinks',
			items: [
				{
					name: 'Juices',
					subCategory: 'juices',
					basicCategories: [
						{ name: 'Apple juice', basicCategory: 'apple-juice' },
						{ name: 'Orange juice', basicCategory: 'orange-juice' },
					],
				},
			],
		},
	},
	{
		name: 'Rice, noodles & cooking ingridients',
		primeCategory: 'rice-noodles-cooking-ingridients',
		subCategories: {
			parentCategory: 'rice-noodles-cooking-ingridients',
			items: [
				{
					name: 'Dried food',
					subCategory: 'dried-food',
					basicCategories: [{ name: 'Beans, Seeds & Nuts', basicCategory: 'beans-seeds-nuts' }],
				},
				{
					name: 'Oil',
					subCategory: 'oil',
					basicCategories: [{ name: 'Olive oil', basicCategory: 'olive-oil' }],
				},
			],
		},
	},
	{
		name: 'Food cupboard',
		primeCategory: 'food-cupboard',
		subCategories: {
			parentCategory: 'food-cupboard',
			items: [
				{
					name: 'Canned food',
					subCategory: 'canned-food',
					basicCategories: [{ name: 'Canned Vegetables', basicCategory: 'canned-vegetables' }],
				},
			],
		},
	},
	{
		name: 'Meat & seafood',
		primeCategory: 'meat-seafood',
		subCategories: {
			parentCategory: 'meat-seafood',
			items: [
				{
					name: 'Beef & Lamb',
					subCategory: 'beef-lamb',
					basicCategories: [{ name: 'Fresh Beef & Lamb', basicCategory: 'fresh-beef-lamb' }],
				},
				{
					name: 'Fish & Seafood',
					subCategory: 'fish-seafood',
					basicCategories: [{ name: 'Fresh fish & seafood', basicCategory: 'fresh-fish-seafood' }],
				},
			],
		},
	},
	{
		name: 'Dairy, chilled & eggs',
		primeCategory: 'dairy-chilled-eggs',
		subCategories: {
			parentCategory: 'dairy-chilled-eggs',
			items: [
				{
					name: 'Eggs',
					subCategory: 'eggs',
					basicCategories: [{ name: 'Fresh eggs', basicCategory: 'fresh-eggs' }],
				},
			],
		},
	},
	{
		name: 'Beer, wine & spirits',
		primeCategory: 'beer-wine-spirits',
	},
	{
		name: 'Bakery',
		primeCategory: 'bakery',
	},
	{
		name: 'Frozen',
		primeCategory: 'frozen',
	},
]

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
			limit: '6',
			offset: '0',
			sort: 'popularity',
			order: 'desc',
		}
		navigate(`/shop?${new URLSearchParams(query)}`, { state: JSON.stringify({ primeCategory: name }) })
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
