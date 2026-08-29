import { Fragment, useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { useAppContext } from '@context/AppContext'

import { CategoryCardMini } from '@modules/Categories/CategoryCardMini/CategoryCardMini'
import { SubCategoryPanel } from '@modules/Categories/SubCategoryPanel/SubCategoryPanel'

import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { CategoriesSkeleton } from '@shared/components/UI/Skeletons/CategoriesSkeleton/CategoriesSkeleton'
import { Text } from '@shared/components/UI/Text/Text'

import { CategoryCard } from './CategoryCard/CategoryCard'

import s from './categories.module.scss'

const CARD_SELECTOR = '[data-role="category-card"]'

/**
 * Returns how many columns are currently in the grid by measuring the actual
 * rendered position of the card elements — group them by offsetTop, count
 * how many share the first row's offsetTop.
 *
 * Deliberately NOT reading `grid-template-columns` from computed style:
 * that string can reflect a stale/unresolved value on first paint, right
 * after HMR re-injects styles, or on a fresh reload — before the stylesheet
 * has actually been applied to the element. Measuring rendered box
 * positions instead is immune to that timing race, since it always
 * reflects what's actually on screen at the moment we read it.
 */
const getColCount = (gridEl) => {
	if (!gridEl) return 1

	const cards = gridEl.querySelectorAll(CARD_SELECTOR)
	if (!cards.length) return 1

	const firstTop = cards[0].offsetTop
	let count = 0

	for (const card of cards) {
		if (card.offsetTop !== firstTop) break
		count++
	}

	return count || 1
}

export const Categories = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { categories, isLoading } = useAppContext()
	const isCategoriesPage = location.pathname.slice(1) === 'brands'

	const [activePrimeCategory, setActivePrimeCategory] = useState(null)
	const [cols, setCols] = useState(1) // live column count, measured from actual rendered card positions
	const gridRef = useRef(null)

	const isReady = !isLoading && Boolean(categories)

	// Measure cols synchronously before paint (useLayoutEffect), so there's
	// never a frame rendered with a wrong/default value — covers first
	// render, HMR remounts, and full reloads alike. Re-measure whenever the
	// card list changes, and keep watching for breakpoint/resize changes.
	useLayoutEffect(() => {
		if (!isReady) return

		const el = gridRef.current
		if (!el) return

		setCols(getColCount(el))
	}, [isReady, categories])

	useEffect(() => {
		const el = gridRef.current
		if (!el) return

		const update = () => setCols(getColCount(el))

		const ro = new ResizeObserver(update)
		ro.observe(el)
		return () => ro.disconnect()
	}, [isReady])

	const handleCategoriesNavigate = () => navigate('/categories')
	const handleBrandsNavigate = () => navigate('/brands')

	const handleCardClick = useCallback((primeCategory) => {
		setActivePrimeCategory((prev) => (prev === primeCategory ? null : primeCategory))
	}, [])

	const activeIndex =
		activePrimeCategory && categories ? categories.findIndex((c) => c.primeCategory === activePrimeCategory) : -1

	const activeCategory = activeIndex >= 0 ? categories[activeIndex] : null

	// The panel sits visually right after the last card in the active card's row.
	// Clamped so a trailing, incomplete row can't push this past the array end.
	const rowLastIndex =
		activeIndex >= 0 && categories
			? Math.min(Math.ceil((activeIndex + 1) / cols) * cols - 1, categories.length - 1)
			: -1

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
					 * The panel is spliced into the array right after the last
					 * card of the active card's row, so DOM order === visual
					 * order — no reliance on CSS `order` / auto-placement.
					 */}
					{!isReady ? (
						<CategoriesSkeleton quantity={9} />
					) : (
						<div className={s.card_grid} ref={gridRef}>
							{categories.map((category, index) => (
								<Fragment key={category.primeCategory}>
									<div data-role='category-card'>
										<CategoryCardMini
											category={category}
											isActive={activePrimeCategory === category.primeCategory}
											onClick={() => handleCardClick(category.primeCategory)}
										/>
									</div>
									{activeCategory && index === rowLastIndex && (
										<SubCategoryPanel
											key={`${activeCategory.primeCategory}-panel`}
											category={activeCategory}
											navigate={navigate}
										/>
									)}
								</Fragment>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
