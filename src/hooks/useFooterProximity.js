import { useEffect, useState } from 'react'

export const useFooterProximity = (selector = 'footer') => {
	const [isNear, setIsNear] = useState(false)

	useEffect(() => {
		const el = document.querySelector(selector)
		if (!el) return
		const observer = new IntersectionObserver(([entry]) => setIsNear(entry.isIntersecting), { threshold: 0 })
		observer.observe(el)
		return () => observer.disconnect()
	}, [selector])

	return isNear
}
