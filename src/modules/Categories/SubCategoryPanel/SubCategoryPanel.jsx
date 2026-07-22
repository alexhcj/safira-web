import { useState } from 'react'

import cn from 'classnames'

import ArrowSVG from '@assets/svg/arrow.svg?react'

import s from './sub-category-panel.module.scss'

export const SubCategoryPanel = ({ category, navigate, order }) => {
	const { name: primeCategoryName, primeCategory, subCategories } = category
	const [openSubs, setOpenSubs] = useState(new Set())

	const toggleSub = (subCategory) => {
		setOpenSubs((prev) => {
			const next = new Set(prev)
			next.has(subCategory) ? next.delete(subCategory) : next.add(subCategory)
			return next
		})
	}

	const goToPrime = (e) => {
		e.stopPropagation()
		const query = `primeCategory=${primeCategory}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`
		navigate(`/shop?${new URLSearchParams(query)}`, {
			state: JSON.stringify({ primeCategory: { name: primeCategoryName, slug: primeCategory } }),
		})
	}

	const goToSub = (e, subCategory, subCategoryName) => {
		e.stopPropagation()
		const query = `primeCategory=${primeCategory}&subCategory=${subCategory}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`
		navigate(`/shop?${new URLSearchParams(query)}`, {
			state: JSON.stringify({
				primeCategory: { name: primeCategoryName, slug: primeCategory },
				subCategory: { name: subCategoryName, slug: subCategory },
			}),
		})
	}

	const goToBasic = (e, subCategory, subCategoryName, basicCategory, basicCategoryName) => {
		e.stopPropagation()
		const query = `primeCategory=${primeCategory}&subCategory=${subCategory}&basicCategory=${basicCategory}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`
		navigate(`/shop?${new URLSearchParams(query)}`, {
			state: JSON.stringify({
				primeCategory: { name: primeCategoryName, slug: primeCategory },
				subCategory: { name: subCategoryName, slug: subCategory },
				basicCategory: { name: basicCategoryName, slug: basicCategory },
			}),
		})
	}

	return (
		<div
			className={s.panel}
			// span all columns regardless of how many there are
			style={{ order, gridColumn: '1 / -1' }}
		>
			<button type='button' className={s.view_all_prime} onClick={goToPrime}>
				View all
			</button>

			<ul className={s.sub_list}>
				{subCategories.items.map(({ subCategory, name: subCategoryName, basicCategories }) => {
					const isOpen = openSubs.has(subCategory)

					return (
						<li key={subCategory}>
							<button type='button' className={s.sub_row} onClick={() => toggleSub(subCategory)}>
								<span>{subCategoryName}</span>
								<ArrowSVG className={cn(s.icon, isOpen && s.open)} />
							</button>

							{isOpen && (
								<div className={s.basic_block}>
									<button
										type='button'
										className={s.view_all_sub}
										onClick={(e) => goToSub(e, subCategory, subCategoryName)}
									>
										View all
									</button>

									<ul className={s.basic_list}>
										{basicCategories.map(({ basicCategory, name: basicCategoryName }) => (
											<li key={basicCategory}>
												<button
													type='button'
													className={s.basic_btn}
													onClick={(e) => goToBasic(e, subCategory, subCategoryName, basicCategory, basicCategoryName)}
												>
													{basicCategoryName}
												</button>
											</li>
										))}
									</ul>
								</div>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
