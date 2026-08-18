import { useState } from 'react'

import cn from 'classnames'

import { useViewport } from '@hooks/useViewport.hook'

import { FIELD_ORDER, SPEC_FIELD_FORMATTERS } from '@utils/ui/compare-spec-formatter'

import { CompareAttributesRow } from './CompareAttributeItem/CompareAttributesRow'

import s from './compare-attributes.module.scss'

export const CompareAttributes = ({ getActiveCompares, activeCategory, activeIndex }) => {
	const [showOnlyDifferent, setShowOnlyDifferent] = useState(false)

	// Keep attribute columns in sync with however many slides are visible
	const visibleItems = useViewport()

	const combineCompareAttributesRows = () => {
		const activeProducts = getActiveCompares(activeCategory)
		if (!activeProducts || activeProducts.length === 0) return []

		// packaging sits alongside specifications for comparison purposes —
		// it's just as much a comparable spec as anything nested under `specifications`
		const sources = activeProducts.map((product) => ({
			...product.specifications,
			packaging: product.packaging,
		}))

		const presentKeys = new Set()
		sources.forEach((source) => Object.keys(source).forEach((key) => presentKeys.add(key)))

		const orderedKeys = [
			...FIELD_ORDER.filter((key) => presentKeys.has(key)),
			...[...presentKeys].filter((key) => !FIELD_ORDER.includes(key)), // anything new we forgot to register, still shows up rather than vanishing
		]

		const rows = []

		orderedKeys.forEach((attrKey) => {
			const formatter = SPEC_FIELD_FORMATTERS[attrKey]

			if (!formatter) {
				rows.push({
					attribute: attrKey,
					different: false,
					values: sources.map((source) => (source[attrKey] !== null ? source[attrKey] : '-')),
				})
				return
			}

			const formattedPerProduct = sources.map((source) => formatter(source[attrKey]))
			const expandsToObject = formattedPerProduct.some((v) => v && typeof v === 'object')

			if (!expandsToObject) {
				rows.push({
					attribute: attrKey,
					different: false,
					values: formattedPerProduct.map((v) => v ?? '-'),
				})
				return
			}

			// Compound field -> one row per sub-key, unioned across products
			// (defensive — normally identical within one basicCategory/archetype)
			const subKeys = new Set()
			formattedPerProduct.forEach((v) => v && Object.keys(v).forEach((k) => subKeys.add(k)))

			subKeys.forEach((subKey) => {
				rows.push({
					attribute: subKey,
					different: false,
					values: formattedPerProduct.map((v) => (v && v[subKey] !== null ? v[subKey] : '-')),
				})
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

	const filterRowsForVisibleProducts = (rows, activeProducts, activeIndex) => {
		// Slice the visible window based on the current viewport's item count
		const visibleCount = Math.min(visibleItems, activeProducts.length - activeIndex)

		return rows.map((item) => ({
			...item,
			values: item.values.slice(activeIndex, activeIndex + visibleCount).filter((value) => value !== undefined),
		}))
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
					<CompareAttributesRow key={row.attribute} row={row} visibleItems={visibleItems} />
				))}
			</div>
		</div>
	)
}
