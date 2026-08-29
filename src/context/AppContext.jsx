import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

import { useCategories } from '@hooks/services/useCategories'

const AppContext = createContext(null)

// Vite HMR - use function declaration instead of arrow function
export function useAppContext() {
	const context = useContext(AppContext)

	if (context === null) {
		throw new Error('useAppContext must be used within an AppProvider')
	}

	return context
}

export const AppProvider = ({ children }) => {
	const { findTree, isLoading } = useCategories()
	const [categories, setCategories] = useState(null)

	// Guards against a duplicate fetch from React StrictMode's double-invoke
	// in dev, and from any re-render before the effect's cleanup runs.
	const hasFetchedRef = useRef(false)

	const refreshCategories = useCallback(async () => {
		const res = await findTree()

		if (res.success) setCategories(res.tree)

		return res
	}, [findTree])

	useEffect(() => {
		if (hasFetchedRef.current) return
		hasFetchedRef.current = true
		refreshCategories()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <AppContext.Provider value={{ categories, isLoading, refreshCategories }}>{children}</AppContext.Provider>
}
