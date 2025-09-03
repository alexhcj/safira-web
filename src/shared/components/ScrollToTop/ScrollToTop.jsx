import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'

export const ScrollToTop = ({ children }) => {
	const { pathname, search } = useLocation()

	useEffect(() => {
		scroll.scrollToTop({
			duration: 500,
		})
	}, [pathname, search])

	return <>{children}</>
}
