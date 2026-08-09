import { useEffect, useState } from 'react'

/**
 * Tracks whether the user has scrolled past a referenced element.
 *
 * Useful for:
 * - sticky headers
 * - floating sidebars
 * - "back to top" buttons
 * - hiding UI before/after specific sections
 *
 * Unlike IntersectionObserver, this hook answers:
 * "Has the viewport passed this element?"
 * instead of:
 * "Is this element currently visible?"
 *
 * @param ref - React ref pointing to the tracked DOM element.
 *
 * @param offset - Optional pixel offset from the top of the viewport.
 * The element is considered "passed" when:
 * `element.getBoundingClientRect().top <= offset`
 *
 * Positive values trigger earlier.
 *
 * Examples:
 * - `0` → passed when element reaches viewport top
 * - `80` → passed 80px before reaching top
 * - `-50` → passed only after moving 50px above viewport
 *
 * @returns boolean
 * - `true` → viewport has passed the element
 * - `false` → element has not yet been passed
 */
export const usePassedElement = (ref, offset = 0) => {
	const [hasPassed, setHasPassed] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (!ref.current) return

			const rect = ref.current.getBoundingClientRect()

			setHasPassed(rect.top <= offset)
		}

		handleScroll()

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [ref, offset])

	return hasPassed
}
