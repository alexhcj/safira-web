import { useEffect, useState } from 'react'

export function useScrollSpy(ids, innerIds = []) {
	const [activeId, setActiveId] = useState(null)
	const [activeInnerId, setActiveInnerId] = useState(null)

	useEffect(() => {
		const handleScroll = () => {
			const scrollPos = window.scrollY + 100

			let current = null
			let currentInner = null

			// check main sections
			for (const id of ids) {
				const el = document.getElementById(id)
				if (el && el.offsetTop <= scrollPos) {
					current = id
				}
			}

			// check inner sections (h3 titles)
			for (const id of innerIds) {
				const el = document.getElementById(id)
				if (el && el.offsetTop <= scrollPos) {
					currentInner = id
				}
			}

			setActiveId(current)
			setActiveInnerId(currentInner)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll()

		return () => window.removeEventListener('scroll', handleScroll)
	}, [ids, innerIds])

	return { activeId, activeInnerId }
}
