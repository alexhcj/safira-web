import { useIsBelow } from '@hooks/useIsBelow'

import { BREAKPOINTS } from '@shared/data/breakpoints'

const OFFSET_BY_BREAKPOINT = {
	mobileM: -140,
	mobileL: -130,
	tablet: -100,
}

export const useResponsiveOffset = () => {
	const isMobileM = useIsBelow(BREAKPOINTS.mobileM)
	const isMobileL = useIsBelow(BREAKPOINTS.mobileL)
	const isTablet = useIsBelow(BREAKPOINTS.tablet)

	if (isMobileM) return OFFSET_BY_BREAKPOINT.mobileM
	if (isMobileL) return OFFSET_BY_BREAKPOINT.mobileL
	if (isTablet) return OFFSET_BY_BREAKPOINT.tablet

	return -100
}
