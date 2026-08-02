import { useState, useRef, useEffect, useCallback } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { useCategories } from '@hooks/services/useCategories'

import { CategoryCardMini } from '@modules/Categories/CategoryCardMini/CategoryCardMini'
import { SubCategoryPanel } from '@modules/Categories/SubCategoryPanel/SubCategoryPanel'

import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { CategoriesSkeleton } from '@shared/components/UI/Skeletons/CategoriesSkeleton/CategoriesSkeleton'
import { Text } from '@shared/components/UI/Text/Text'

import { CategoryCard } from './CategoryCard/CategoryCard'

import s from './categories.module.scss'

/**
 * Returns how many columns are currently in the grid by reading the computed
 * grid-template-columns value (most reliable cross-browser approach).
 */
const getColCount = (gridEl) => {
	if (!gridEl) return 5
	const style = window.getComputedStyle(gridEl)
	// grid-template-columns returns e.g. "120px 120px 120px" — count spaces+1
	return style.gridTemplateColumns.split(' ').length
}

export const Categories = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { findTree, isLoading } = useCategories()
	const isCategoriesPage = location.pathname.slice(1) === 'brands'

	const [categories, setCategories] = useState(null)
	const [activePrimeCategory, setActivePrimeCategory] = useState(null)
	const [cols, setCols] = useState(5) // live column count, updated by ResizeObserver
	const gridRef = useRef(null)

	useEffect(() => {
		let isCancelled = false

		async function fetchData() {
			setCategories(null)

			const res = await findTree()

			if (isCancelled) return

			if (res && res.success) {
				setCategories(res.tree)
			}
		}

		fetchData()

		return () => {
			isCancelled = true
		}
	}, [])

	const isReady = !isLoading && Boolean(categories)

	// Keep cols in sync whenever the grid resizes (breakpoint changes)
	useEffect(() => {
		const el = gridRef.current
		if (!el) return

		const update = () => setCols(getColCount(el))
		update()

		const ro = new ResizeObserver(update)
		ro.observe(el)
		return () => ro.disconnect()
	}, [])

	const handleCategoriesNavigate = () => navigate('/categories')
	const handleBrandsNavigate = () => navigate('/brands')

	const handleCardClick = useCallback((primeCategory) => {
		setActivePrimeCategory((prev) => (prev === primeCategory ? null : primeCategory))
	}, [])

	const activeIndex = activePrimeCategory ? categories.findIndex((c) => c.primeCategory === activePrimeCategory) : -1

	const activeCategory = activeIndex >= 0 ? categories[activeIndex] : null

	// The panel sits visually after the last card in the active card's row.
	// CSS `order` integers: cards get their array index (0-based);
	// panel gets (last index in that row) + 0.5 — but `order` is integer-only,
	// so we use (rowLastIndex * 2 + 1) with cards at (index * 2).
	const rowLastIndex = activeIndex >= 0 ? Math.ceil((activeIndex + 1) / cols) * cols - 1 : -1

	const panelOrder = rowLastIndex * 2 + 1

	return (
		<div className='container'>
			<div className={s.block}>
				<div>
					<span className={s.title}>Browse by</span>
					<div className={s.actions}>
						<Button
							className={s.categories_action_btn}
							type={isCategoriesPage ? 'secondary' : 'submit'}
							onClick={handleCategoriesNavigate}
						>
							<Text className={s.categories_btn} span>
								Categories
							</Text>
						</Button>
						<Button
							className={s.brands_action_btn}
							type={isCategoriesPage ? 'submit' : 'secondary'}
							onClick={handleBrandsNavigate}
						>
							<Text className={s.brands_btn} span>
								Brands
							</Text>
						</Button>
					</div>
				</div>

				{/* ─── Desktop grid (> 991px) — original, unchanged ─── */}
				{!isReady ? (
					<CategoriesSkeleton quantity={9} />
				) : (
					<nav className={s.nav}>
						{categories.map((category) => (
							<CategoryCard key={category.primeCategory} category={category} />
						))}
					</nav>
				)}

				{/* ─── Responsive grid + inline panel (≤ 991px) ─── */}
				<div className={s.nav_responsive}>
					{/*
					 * Cards AND the panel live inside ONE grid container.
					 * Each card gets `order: index * 2` so there's always an odd
					 * integer slot available between any two rows for the panel.
					 */}
					{!isReady ? (
						<CategoriesSkeleton quantity={9} />
					) : (
						<div className={s.card_grid} ref={gridRef}>
							{categories.map((category, index) => (
								<CategoryCardMini
									key={category.primeCategory}
									category={category}
									isActive={activePrimeCategory === category.primeCategory}
									order={index * 2}
									onClick={() => handleCardClick(category.primeCategory)}
								/>
							))}
							{activeCategory && (
								<SubCategoryPanel
									key={activeCategory.primeCategory}
									category={activeCategory}
									navigate={navigate}
									order={panelOrder}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
