import { useState } from 'react'

import cn from 'classnames'

import { CompareAttributesRow } from './CompareAttributeItem/CompareAttributesRow'

import s from './compare-attributes.module.scss'

export const CompareAttributes = ({ getActiveCompares, activeCategory, activeIndex }) => {
	const [showOnlyDifferent, setShowOnlyDifferent] = useState(false)

	const combineCompareAttributesRows = () => {
		const activeProducts = getActiveCompares(activeCategory)
		if (!activeProducts || activeProducts.length === 0) return []

		let rows = []
		const allAttributesKeys = Object.keys(Object.assign({}, ...activeProducts.map((product) => product.specifications)))

		allAttributesKeys.forEach((attrKey, index) => {
			rows.push({ attribute: attrKey, different: false, values: [] })

			activeProducts.forEach(({ specifications }) => {
				if (attrKey === 'company') {
					rows[index].values.push(specifications[attrKey] ? specifications[attrKey].displayName : '-')
					return
				}
				if (attrKey === 'shelfLife') {
					rows[index].values.push(
						specifications[attrKey] ? `${specifications[attrKey].value} ${specifications[attrKey].unit}` : '-',
					)
					return
				}
				rows[index].values.push(specifications[attrKey] ? specifications[attrKey] : '-')
			})
		})

		return rows
	}

	const markDifferentAttributesRows = (arr) => {
		if (arr.length === 1) return arr

		return arr.map((item) => {
			if (new Set(item.values).size > 1) {
				item.different = true
			}
			return item
		})
	}

	const getVisibleProductsForAttributes = (activeProducts, activeIndex) => {
		const ITEMS_PER_VIEW = 4
		return activeProducts.slice(activeIndex, activeIndex + ITEMS_PER_VIEW)
	}

	const filterRowsForVisibleProducts = (rows, activeProducts, activeIndex) => {
		const visibleProducts = getVisibleProductsForAttributes(activeProducts, activeIndex)
		const visibleCount = visibleProducts.length

		return rows.map((item) => {
			return {
				...item,
				values: item.values.slice(activeIndex, activeIndex + visibleCount).filter((value) => value !== undefined),
			}
		})
	}

	const renderRows = (rows, different) => {
		if (different) {
			return rows.filter((row) => row.different)
		}
		return rows
	}

	const handleSetShowDifferentAttrs = () => {
		setShowOnlyDifferent(!showOnlyDifferent)
	}

	const activeProducts = getActiveCompares(activeCategory)
	const allRows = combineCompareAttributesRows()
	const markedRows = markDifferentAttributesRows(allRows)
	const visibleRows = filterRowsForVisibleProducts(markedRows, activeProducts, activeIndex)

	return (
		<div className={s.block}>
			<div className={s.header}>
				<h3 className={s.title}>Compare Attributes</h3>
				<button className={s.btn_different} type='button' onClick={handleSetShowDifferentAttrs}>
					<span className={s.different_circle}>
						<span className={s.different_dot}></span>
					</span>
					<span className={cn(s.btn_different_switcher, { [s.active]: showOnlyDifferent })}>
						<span className={cn(s.btn_different_switcher_square, { [s.active]: showOnlyDifferent })}></span>
					</span>
					Show different
				</button>
			</div>
			<div className={s.list}>
				{renderRows(visibleRows, showOnlyDifferent).map((row) => (
					<CompareAttributesRow key={row.attribute} row={row} />
				))}
			</div>
		</div>
	)
}
