import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

export const ScrollToTop = ({ children }) => {
	const { pathname, search } = useLocation()

	useEffect(() => {
		const abortController = new AbortController()

		const scrollToTop = () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		}

		scrollToTop()

		return () => {
			abortController.abort()
		}
	}, [pathname, search])

	return <>{children}</>
}
