import { useState } from 'react'

export function useIsBelow(breakpoint) {
	const [isBelow] = useState(() => window.innerWidth < breakpoint)
	return isBelow
}
