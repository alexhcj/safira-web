import React, { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.hook'

const RecentSearchContext = createContext([])

export const useRecentSearchContext = () => useContext(RecentSearchContext)

export const RecentSearchProvider = ({ children }) => {
	const [recentSearch, setRecentSearch] = useLocalStorage('search', [])
	const [state, setState] = useState('')

	const addCurrentSearch = (slug) => {
		setState(slug)
	}

	const addToSearch = (search) => {
		const similarSearch = recentSearch.find((item) => item.name === search.name)

		if (similarSearch) return

		setRecentSearch([...recentSearch, search])
	}

	const removeFromSearch = (slug) => {
		const filteredSearch = recentSearch.filter((item) => item.slug !== slug)
		setRecentSearch([...filteredSearch])
	}

	return (
		<RecentSearchContext.Provider value={{ recentSearch, state, addCurrentSearch, addToSearch, removeFromSearch }}>
			{children}
		</RecentSearchContext.Provider>
	)
}
