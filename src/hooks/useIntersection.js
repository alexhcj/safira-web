import { useEffect, useState } from 'react'

export const useIntersection = (target, options = {}) => {
	const [isIntersecting, setIsIntersecting] = useState(false)

	useEffect(() => {
		let element = null

		// ref
		if (target?.current) element = target.current
		// selector
		else if (typeof target === 'string') element = document.querySelector(target)
		// direct DOM node
		else if (target instanceof Element) element = target

		if (!element) return

		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting)
		}, options)

		observer.observe(element)

		return () => observer.disconnect()
	}, [target, options])

	return isIntersecting
}
