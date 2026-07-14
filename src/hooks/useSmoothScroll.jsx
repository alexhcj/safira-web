import { animateScroll as scroll } from 'react-scroll'

const EXTRA_SPACING = {
	section: 24,
	subnav: 16,
}

function getNavbarHeight() {
	const navbar = document.getElementById('navbar')
	return navbar ? navbar.getBoundingClientRect().height : 0
}

function getDocumentTop(element) {
	return element.getBoundingClientRect().top + window.scrollY
}

export function useSmoothScroll() {
	return (id, type) => {
		const element = document.getElementById(id)

		if (element) {
			const gap = getNavbarHeight() + (EXTRA_SPACING[type] ?? 0)
			const elementPosition = getDocumentTop(element) - gap

			scroll.scrollTo(elementPosition, {
				duration: 500,
				delay: 0,
			})
		}
	}
}
