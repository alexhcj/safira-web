import { useEffect, useRef, useState } from 'react'
import s from './shopsort.module.css'

const sortParams = [
	{ id: 1, name: 'popularity', value: 'popularity', text: 'Sort by popularity' },
	{ id: 2, name: 'newness', value: 'new', text: 'Sort by newness' },
	{ id: 3, name: 'price', value: 'high', text: 'Sort by price: high to low' },
	{ id: 4, name: 'price', value: 'low', text: 'Sort by price: low to high' },
	{ id: 5, name: 'alph', value: 'high', text: 'Sort by alphabet: high to low' },
	{ id: 6, name: 'alph', value: 'low', text: 'Sort by alphabet: low to high' },
]

export const ShopSort = ({ sortHandler }) => {
	const [sort, setSort] = useState(sortParams[0])
	const [activeSortId, setActiveSortId] = useState(sort.id)
	const [listToggle, setListToggle] = useState(false)
	const currentSortRef = useRef(null)

	const selectSort = (e) => {
		let current = e.target.id - 1

		setSort(sortParams[current])
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
			<span
				className={`${s.sort} ${listToggle ? `${s.transform}` : ''} `}
				onChange={(e) => sortHandler(e)}
				onClick={clickHandler}
				ref={currentSortRef}
			>
				{sort.text}
			</span>
			<ul
				className={`${s.list} ${listToggle ? `${s.active}` : ''} `}
				onMouseOver={highlightSortItem}
				onMouseLeave={resetHightlight}
			>
				{sortParams.map((param) => {
					let { id, name, value, text } = param

					return (
						<li
							className={`${s.item} ${sort.id === id ? `${s.current}` : ''} ${
								activeSortId === id ? `${s.hightlight}` : ''
							}`}
							key={id}
							id={id}
							name={name}
							value={value}
							onClick={(e) => selectSort(e)}
						>
							{text}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
