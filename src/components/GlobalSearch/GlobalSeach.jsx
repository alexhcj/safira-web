import React, { useEffect, useRef, useState } from 'react'
import { searchAPI } from '../../api/search'
import { useRecentSearchContext } from '../../context/RecentSearchContext'
import { useRandomProduct } from '../../hooks/services/useRandomProduct'
import { GlobalSearchForm } from '../../shared/components/Form/GlobalSearchForm/GlobalSearchForm'
import { SearchPopover } from '../../shared/components/UI/SearchPopover/SearchPopover'
import { stringToSlug } from '../../utils'
import s from './global-search.module.scss'

export const GlobalSeach = () => {
	const searchRef = useRef(null)
	const [isPopoverToggled, setIsPopoverToggled] = useState(false)
	const [search, setSearch] = useState([])
	const { recentSearch, addToSearch } = useRecentSearchContext()
	const { product } = useRandomProduct()

	useEffect(() => {
		document.addEventListener('click', outsideClickHandler)

		return () => {
			document.removeEventListener('click', outsideClickHandler)
		}
	}, [])

	const onKeyDownHandler = (e) => {
		switch (e.key) {
			case 'Escape':
				setIsPopoverToggled(false)
				break

			case 'Enter':
				e.preventDefault()
				break
			default:
				return
		}
	}

	const outsideClickHandler = (e) => {
		if (searchRef.current && !searchRef.current.contains(e.target)) {
			setIsPopoverToggled(false)
		}
	}

	const handleSearchClick = (e) => {
		if (e.currentTarget.dataset.link) setIsPopoverToggled(false)
	}

	const handleInputClick = () => {
		setIsPopoverToggled(true)
	}

	const handleSubmit = async (form) => {
		if (form.search.length === 0) return

		const formData = {
			search: form.search,
		}

		addToSearch({ name: formData.search, slug: stringToSlug(formData.search) })
		const res = await searchAPI.globalSearch(formData)
		setSearch(res.search)
	}

	return (
		<div className={s.search} ref={searchRef}>
			<GlobalSearchForm
				handleInputClick={handleInputClick}
				onKeyDownHandler={onKeyDownHandler}
				handleSubmit={handleSubmit}
			/>
			<SearchPopover
				isOpen={isPopoverToggled}
				handleSearchClick={handleSearchClick}
				randomProduct={product}
				items={search}
				recentSearch={recentSearch}
			/>
		</div>
	)
}
