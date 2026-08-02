import { useEffect, useRef, useState } from 'react'

import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useCategories } from '@hooks/services/useCategories'
import { useAccordion } from '@hooks/useAccordion'
import { useIsBelow } from '@hooks/useIsBelow'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { AccordionItem } from '@shared/components/UI/CategoriesDropdown/AccordionItem/AccordionItem'
import { BREAKPOINTS } from '@shared/data/breakpoints'

import { SubNav } from './SubNav/SubNav'

import ArrowSVG from '@assets/svg/arrow.svg?react'

import s from './categories-dropdown.module.scss'

export const CategoriesDropdown = ({ isSticky, isVisible }) => {
	// Tablet + mobile
	const isTablet = useIsBelow(BREAKPOINTS.tabletL)
	const [popupToggle, setPopupToggle] = useState(false)
	const [toggleNavSubCategory, setToggleNavSubCategory] = useState(null)
	const navigate = useNavigate()
	const ref = useRef(null)
	const { findTree, isLoading } = useCategories()
	const [categories, setCategories] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const res = await findTree()

			if (res && res.success) {
				setCategories(res.tree)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		popupToggle && setPopupToggle(false)
	}, [isVisible])

	const accordion = useAccordion((primeCategory) => {
		const cat = categories.find((c) => c.primeCategory === primeCategory)
		const query = { primeCategory, limit: '12', offset: '0', sort: 'popularity', order: 'desc' }
		navigate(`/shop?${new URLSearchParams(query)}`, {
			state: JSON.stringify({ primeCategory: { name: cat?.name, slug: primeCategory } }),
		})
		closePopup()
	})

	// close + full reset when popup closes
	const closePopup = () => {
		setPopupToggle(false)
		accordion.reset()
	}

	useEffect(() => {
		const escKeyHandler = (e) => {
			if (e.key === 'Escape') closePopup()
		}
		const clickOutsideHandler = (e) => {
			if (ref.current && !ref.current.contains(e.target)) closePopup()
		}
		document.addEventListener('keydown', escKeyHandler)
		document.addEventListener('click', clickOutsideHandler)
		return () => {
			document.removeEventListener('keydown', escKeyHandler)
			document.removeEventListener('click', clickOutsideHandler)
		}
	}, [])

	// ---- Desktop handlers ----
	const onCategoriesClickHandler = (e) => {
		if (e.currentTarget.id !== 'categories') return
		setPopupToggle(false)
		navigate('/categories')
	}

	const handleNavSubToggle = (e, category) => {
		if (e.type === 'mouseenter' && popupToggle) {
			setToggleNavSubCategory(category)
		} else {
			setToggleNavSubCategory(null)
		}
	}

	const onClickHandler = (e) => {
		e.stopPropagation()
		const primeCategory = e.target.id
		const name = e.target.dataset.name

		const query = {
			primeCategory,
			limit: '12',
			offset: '0',
			sort: 'popularity',
			order: 'desc',
		}
		navigate(`/shop?${new URLSearchParams(query)}`, {
			state: JSON.stringify({ primeCategory: { name, slug: primeCategory } }),
		})
		setPopupToggle(false)
	}

	// ---- Mobile/tablet handlers ----
	const onMobileCategoriesTap = () => {
		if (!popupToggle) {
			setPopupToggle(true)
		} else {
			closePopup()
			navigate('/categories')
		}
	}

	// ---- Render ----
	return (
		<div
			className={cn(s.categories, isSticky && s.sticky)}
			role='presentation'
			onMouseEnter={!isTablet ? () => setPopupToggle(true) : undefined}
			onMouseLeave={!isTablet ? () => setPopupToggle(false) : undefined}
			onClick={!isTablet ? onCategoriesClickHandler : undefined}
			onPointerUp={isTablet ? onMobileCategoriesTap : undefined}
			ref={ref}
			id='categories'
		>
			<div className={s.burger}>
				<span />
				<span />
				<span />
			</div>
			<span className={s.text}>All categories</span>
			<ArrowSVG className={s.svg} />

			<nav className={cn(s.popup, popupToggle && s.active)}>
				{isLoading && <Preloader />}
				{categories
					.sort((a, b) => (b.name < a.name ? 1 : -1))
					.map(({ name, primeCategory, subCategories }) => {
						const isOpen = accordion.openId === primeCategory
						const isPending = accordion.pendingId === primeCategory

						return isTablet ? (
							<AccordionItem
								key={primeCategory}
								label={name}
								isLeaf={!subCategories}
								isOpen={isOpen}
								isPending={isPending}
								onRowTap={() => accordion.handleRowTap(primeCategory)}
								onCollapse={() => accordion.handleCollapse(primeCategory)}
							>
								{subCategories && (
									<SubNav
										key={accordion.openId}
										subCategories={subCategories}
										setPopupToggle={setPopupToggle}
										resetAccordion={accordion.reset}
										primeCategory={primeCategory}
										primeCategoryName={name}
										isTablet
									/>
								)}
							</AccordionItem>
						) : (
							// ---- Desktop row ----
							<ul
								className={s.prime_category}
								key={primeCategory}
								onMouseEnter={(e) => handleNavSubToggle(e, primeCategory)}
								onMouseLeave={(e) => handleNavSubToggle(e, primeCategory)}
								onClick={onClickHandler}
							>
								<li className={s.link} id={primeCategory} data-name={name}>
									{name}
									{subCategories && <ArrowSVG className={s.svg} />}
								</li>
								{subCategories && (
									<SubNav
										subNavToggleCategory={toggleNavSubCategory}
										subCategories={subCategories}
										setPopupToggle={setPopupToggle}
										primeCategory={primeCategory}
										primeCategoryName={name}
										isTablet={false}
									/>
								)}
							</ul>
						)
					})}
			</nav>
		</div>
	)
}
