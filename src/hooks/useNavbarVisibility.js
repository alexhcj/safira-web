import { useState, useEffect, useRef } from 'react'

export function useNavbarVisibility({ threshold = 10, topOffset = 150, enabled = true } = {}) {
	const [visible, setVisible] = useState(true)
	const [sticky, setSticky] = useState(false)
	const lastScrollY = useRef(0)
	const ticking = useRef(false)

	useEffect(() => {
		if (!enabled) {
			// reset to default "safe" state when disabled on a given page
			setVisible(true)
			setSticky(false)
			return
		}

		lastScrollY.current = window.scrollY

		const updateScrollState = () => {
			const currentScrollY = window.scrollY
			const diff = currentScrollY - lastScrollY.current

			setSticky(currentScrollY >= topOffset)

			if (currentScrollY <= topOffset) {
				setVisible(true)
			} else if (Math.abs(diff) > threshold) {
				setVisible(diff < 0)
				lastScrollY.current = currentScrollY
			}

			ticking.current = false
		}

		const onScroll = () => {
			if (!ticking.current) {
				window.requestAnimationFrame(updateScrollState)
				ticking.current = true
			}
		}

		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [threshold, topOffset, enabled])

	return { visible, sticky }
}
