import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import cn from 'classnames'
import { ShopListLayout } from '../ShopListLayout/ShopListLayout'
import s from './shop-sort.module.scss'

const sortParams = [
	{ id: 1, sort: 'popularity', tag: '', order: 'desc', text: 'Sort by popularity' },
	{ id: 2, sort: 'createdAt', tag: 'new', order: 'asc', text: 'Sort by newness' },
	{ id: 3, sort: 'sortPrice', tag: '', order: 'asc', text: 'Sort by price: high to low' },
	{ id: 4, sort: 'sortPrice', tag: '', order: 'desc', text: 'Sort by price: low to high' },
	{ id: 5, sort: 'name', tag: '', order: 'desc', text: 'Sort by alphabet: A - Z' },
	{ id: 6, sort: 'name', tag: '', order: 'asc', text: 'Sort by alphabet: Z - A' },
]

export const ShopSort = ({ meta: { total = 0, page } }) => {
	const [params, setParams] = useSearchParams()
	const [sort, setSort] = useState(sortParams[0])
	const [activeSortId, setActiveSortId] = useState(sort.id)
	const [listToggle, setListToggle] = useState(false)
	const currentSortRef = useRef(null)

	const selectSort = (e) => {
		const current = e.target.id - 1
		const query = Object.fromEntries([...params])

		setSort(sortParams[current])
		setParams({ ...query, offset: '0', sort: sortParams[current].sort, order: sortParams[current].order })
	}

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
			setListToggle(false)
		}
	}

	const clickOutsideHandler = (e) => {
		if (currentSortRef.current && !currentSortRef.current.contains(e.target)) {
			setListToggle(false)
		}
	}

	const clickHandler = () => {
		setListToggle(!listToggle)
	}

	const handleFocus = () => {
		console.log('focused')
	}

	const highlightSortItem = (e) => {
		let current = e.target.id - 1
		// mouseover get out from list
		if (current === -1) {
			return
		}

		setActiveSortId(sortParams[current].id)
	}

	// help highlightSortItem when mouse get out list
	const resetHightlight = () => {
		setActiveSortId(sort.id)
	}

	return (
		<div className={s.block}>
			<ShopListLayout />
			<div className={s.sort_box}>
				<span
					role='presentation'
					className={cn(s.sort, { [s.transform]: listToggle })}
					onClick={clickHandler}
					ref={currentSortRef}
				>
					{sort.text}
				</span>
				<ul
					className={cn(s.list, { [s.active]: listToggle })}
					onMouseOver={highlightSortItem}
					onFocus={handleFocus}
					onMouseLeave={resetHightlight}
				>
					{sortParams.map((param) => {
						let { id, text } = param

						return (
							<li
								role='presentation'
								className={cn(s.item, { [s.current]: sort.id === id, [s.hightlight]: activeSortId === id })}
								key={id}
								id={`${id}`}
								onClick={(e) => selectSort(e)}
							>
								{text}
							</li>
						)
					})}
				</ul>
			</div>
			<div>
				Showing {total === 0 ? 0 : +params.get('offset') + 1} -{' '}
				{total < +params.get('limit')
					? total
					: page !== 1 && total < page * +params.get('limit')
					? total
					: page * +params.get('limit')}{' '}
				of {total} results
			</div>
		</div>
	)
}
