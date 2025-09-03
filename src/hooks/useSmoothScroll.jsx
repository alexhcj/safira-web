import { animateScroll as scroll } from 'react-scroll'

const types = {
	section: 80,
	subnav: 75,
}

export function useSmoothScroll() {
	return (id, type) => {
		const element = document.getElementById(id)

		if (element) {
			const navbarHeight = types[type] // 50px navbar + 30px extra spacing
			const elementPosition = element.offsetTop - navbarHeight

			scroll.scrollTo(elementPosition, {
				duration: 500,
				delay: 0,
			})
		}
	}
}
