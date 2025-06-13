import { createContext, useContext, useState } from 'react'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

const RecentSearchContext = createContext([])

export const useRecentSearchContext = () => useContext(RecentSearchContext)

export const RecentSearchProvider = ({ children }) => {
	const [recentSearch, setRecentSearch] = useLocalStorage('recent-search', [])
	const [state, setState] = useState({ search: '', lastSearch: '' })
	const maxSize = 5

	const addCurrentSearch = (search) => {
		setState(search)
	}

	const addToSearch = (search) => {
		setRecentSearch((prev) => {
			const existingIndex = prev.indexOf(search)

			if (existingIndex !== -1) {
				return [search, ...prev.slice(0, existingIndex), ...prev.slice(existingIndex + 1)]
			}

			if (prev.length < maxSize) {
				return [search, ...prev]
			}

			if (prev.length === maxSize) {
				return [search, ...prev.slice(0, -1)]
			}
		})
	}

	const removeFromSearch = (slug) => {
		setRecentSearch((prev) => prev.filter((item) => item !== slug))
	}

	return (
		<RecentSearchContext.Provider value={{ recentSearch, state, addCurrentSearch, addToSearch, removeFromSearch }}>
			{children}
		</RecentSearchContext.Provider>
	)
}
