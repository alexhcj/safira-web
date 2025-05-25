import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

export const ScrollToTop = ({ children }) => {
	const { pathname, search } = useLocation()

	useEffect(() => {
		// Delayed scroll to handle late-loading content
		const timeoutId = setTimeout(() => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		}, 0)

		// Additional fallback for very slow loading content
		const fallbackTimeoutId = setTimeout(() => {
			window.scrollTo(0, 0)
		}, 500)

		return () => {
			clearTimeout(timeoutId)
			clearTimeout(fallbackTimeoutId)
		}
	}, [pathname, search])

	return <>{children}</>
}
