import { useState } from 'react'

/**
 * Manages open + pending state for a list of accordion items at one tier.
 * Only one item can be open or pending at a time.
 *
 * onNavigate(id) — called when double-tap confirm fires
 */
export function useAccordion(onNavigate) {
	const [openId, setOpenId] = useState(null)
	const [pendingId, setPendingId] = useState(null)

	const handleRowTap = (id) => {
		if (openId !== id) {
			// tap on different item — reset previous, open new, mark pending
			setOpenId(id)
			setPendingId(id)
			return
		}
		// tap on already-open item row (not the − icon)
		if (pendingId === id) {
			// second tap = confirm navigate
			onNavigate(id)
			setPendingId(null)
		} else {
			// was open but pending cleared — re-arm pending
			setPendingId(id)
		}
	}

	const handleCollapse = (id) => {
		// only fires from − icon tap — collapse without navigating
		if (openId === id) setOpenId(null)
		if (pendingId === id) setPendingId(null)
	}

	const reset = () => {
		setOpenId(null)
		setPendingId(null)
	}

	return { openId, pendingId, handleRowTap, handleCollapse, reset }
}
