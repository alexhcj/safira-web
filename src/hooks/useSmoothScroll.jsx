export function useSmoothScroll() {
	return (sectionId) => {
		const element = document.getElementById(sectionId)
		if (element) {
			const navbarHeight = 80 // 50px navbar + 30px extra spacing
			const elementPosition = element.offsetTop - navbarHeight

			window.scrollTo({
				top: elementPosition,
				behavior: 'smooth',
			})
		}
	}
}
