import { useState } from 'react'

import { BREAKPOINTS } from '@shared/data/breakpoints'

export function useViewport() {
	const [count] = useState(() => {
		if (window.innerWidth < BREAKPOINTS.tabletS) return 1
		if (window.innerWidth < BREAKPOINTS.tablet) return 2
		if (window.innerWidth < BREAKPOINTS.tabletL) return 3
		return 4
	})
	return count
}
