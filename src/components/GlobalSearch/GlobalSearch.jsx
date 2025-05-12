import { useEffect, useRef, useState } from 'react'

import { useRecentSearchContext } from '@context/RecentSearchContext'

import { useRandomProduct } from '@hooks/services/useRandomProduct'
import { useSearch } from '@hooks/services/useSearch'

import { GlobalSearchForm } from '@shared/components/Form/GlobalSearchForm/GlobalSearchForm'
import { SearchPopover } from '@shared/components/UI/SearchPopover/SearchPopover'

import { strToSlug } from '@utils/string'

import s from './global-search.module.scss'

export const GlobalSearch = () => {
	const { addToSearch } = useRecentSearchContext()
	const { product } = useRandomProduct()
	const { findAllMatches } = useSearch()

	const [isPopoverToggled, setIsPopoverToggled] = useState(false)
	const [search, setSearch] = useState({})
	const [isSearched, setIsSearched] = useState(false)
	const searchRef = useRef(null)

	useEffect(() => {
		document.addEventListener('click', outsideClickHandler)

		return () => {
			document.removeEventListener('click', outsideClickHandler)
		}
	}, [])

	const outsideClickHandler = (e) => {
		if (searchRef.current && !searchRef.current.contains(e.target)) {
			setIsPopoverToggled(false)
			// setIsSearched(false)
		}
	}

	const handleSearchClick = (e) => {
		if (e.currentTarget.dataset.link) {
			setIsPopoverToggled(false)
			// setIsSearched(false)
		}
	}

	const handleInputClick = () => {
		setIsPopoverToggled(true)
	}

	const handleSubmit = async (state) => {
		if (state.search === '') return

		addToSearch(state.search.trim())
		const res = await findAllMatches({ search: strToSlug(state.search.trim()) })

		if (res && res.success) {
			setSearch(res.search)
			setIsSearched(true)
		}
	}

	const onKeyDownHandler = (e) => {
		switch (e.key) {
			case 'Escape':
				setIsPopoverToggled(false)
				// setIsSearched(false)
				break
			default:
				return
		}
	}

	return (
		<div className={s.search} ref={searchRef} onKeyDown={onKeyDownHandler}>
			<GlobalSearchForm handleInputClick={handleInputClick} handleSubmit={handleSubmit} />
			<SearchPopover
				isOpen={isPopoverToggled}
				setIsPopoverToggled={setIsPopoverToggled}
				handleSearchClick={handleSearchClick}
				randomProduct={product}
				search={search}
				isSearched={isSearched}
			/>
		</div>
	)
}
